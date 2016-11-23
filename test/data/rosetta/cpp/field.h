/* -*- mode: c++; c-basic-offset: 2; indent-tabs-mode: nil; -*-
 *  vim:expandtab:shiftwidth=2:tabstop=2:smarttab:
 *
 *  Copyright (C) 2008 Sun Microsystems, Inc.
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; version 2 of the License.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
  Because of the function new_field() all field classes that have static
  variables must declare the size_of() member function.
*/



#pragma once

#include <drizzled/sql_error.h>
#include <drizzled/type/decimal.h>
#include <drizzled/key_map.h>
#include <drizzled/sql_list.h>
#include <drizzled/structs.h>
#include <drizzled/charset_info.h>
#include <drizzled/item_result.h>
#include <drizzled/charset_info.h>

#include <string>
#include <vector>

#include <drizzled/visibility.h>

namespace drizzled
{

#define DATETIME_DEC                     6
#define DOUBLE_TO_STRING_CONVERSION_BUFFER_SIZE FLOATING_POINT_BUFFER

#ifdef DEBUG
#define ASSERT_COLUMN_MARKED_FOR_READ assert(!getTable() || (getTable()->read_set == NULL || isReadSet()))
#define ASSERT_COLUMN_MARKED_FOR_WRITE assert(!getTable() || (getTable()->write_set == NULL || isWriteSet()))
#else
#define ASSERT_COLUMN_MARKED_FOR_READ assert(getTable())
#define ASSERT_COLUMN_MARKED_FOR_WRITE assert(getTable())
#endif

typedef struct st_typelib TYPELIB;

const uint32_t max_field_size= (uint32_t) 4294967295U;

class SendField;
class CreateField;
class TableShare;
class Field;
struct CacheField;

int field_conv(Field *to,Field *from);

/**
 * Class representing a Field in a Table
 *
 * @details
 *
 * The value stored in the Field object is stored in the
 * unsigned char pointer member variable called ptr.  The
 * val_xxx() methods retrieve this raw byte value and
 * convert the byte into the appropriate output (int, decimal, etc).
 *
 * The store_xxx() methods take various input and convert
 * the input into the raw bytes stored in the ptr member variable.
 */
class DRIZZLED_API Field
{
  /* Prevent use of these */
  Field(const Field&);
  void operator=(Field &);

public:
  unsigned char *ptr; /**< Position to field in record. Stores raw field value */
  unsigned char *null_ptr; /**< Byte where null_bit is */

  /**
   * Pointer to the Table object containing this Field
   *
   * @note You can use table->in_use as replacement for current_session member
   * only inside of val_*() and store() members (e.g. you can't use it in cons)
   */
private:
  Table *table;

public:
  Table *getTable()
  {
    assert(table);
    return table;
  }

  Table *getTable() const
  {
    assert(table);
    return table;
  }

  void setTable(Table *table_arg)
  {
    table= table_arg;
  }

  Table *orig_table; /**< Pointer to the original Table. @TODO What is "the original table"? */
  const char *field_name; /**< Name of the field */
  LEX_STRING comment; /**< A comment about the field */

  /** The field is part of the following keys */
  key_map	key_start;
  key_map part_of_key;
  key_map part_of_key_not_clustered;
  key_map part_of_sortkey;

  /*
    We use three additional unireg types for TIMESTAMP for hysterical
    raisins and limitations in the MySQL FRM file format.

    A good TODO is to clean this up as we can support just about
    anything in the table proto message now.
  */
  enum utype
  {
    NONE,
    NEXT_NUMBER,
    TIMESTAMP_OLD_FIELD,
    TIMESTAMP_DN_FIELD,
    TIMESTAMP_UN_FIELD,
    TIMESTAMP_DNUN_FIELD
  };

  utype	unireg_check;
  uint32_t field_length; /**< Length of this field in bytes */
  uint32_t flags;

  bool isUnsigned() const
  {
    return flags & UNSIGNED_FLAG;
  }

private:
  uint16_t field_index; /**< Index of this Field in Table::fields array */

public:

  uint16_t position() const
  {
    return field_index;
  }

  void setPosition(uint32_t arg)
  {
    field_index= arg;
  }

  unsigned char null_bit; /**< Bit used to test null bit */
  /**
     If true, this field was created in create_tmp_field_from_item from a NULL
     value. This means that the type of the field is just a guess, and the type
     may be freely coerced to another type.

     @see create_tmp_field_from_item
     @see Item_type_holder::get_real_type
   */
  bool is_created_from_null_item;

  static void *operator new(size_t size);
  static void *operator new(size_t size, memory::Root *mem_root);
  static void operator delete(void *, size_t)
  { }
  static void operator delete(void *, memory::Root *)
  { }

  Field(unsigned char *ptr_arg,
        uint32_t length_arg,
        unsigned char *null_ptr_arg,
        unsigned char null_bit_arg,
        utype unireg_check_arg,
        const char *field_name_arg);
  virtual ~Field() {}

  bool hasDefault() const
  {
    return not (flags & NO_DEFAULT_VALUE_FLAG);
  }

  /* Store functions returns 1 on overflow and -1 on fatal error */
  virtual int store(const char *to,
                    uint32_t length,
                    const CHARSET_INFO * const cs)=0;
  virtual int store(double nr)=0;
  virtual int store(int64_t nr, bool unsigned_val)=0;
  virtual int store_decimal(const type::Decimal *d)=0;
  int store_and_check(enum_check_fields check_level,
                      const char *to,
                      uint32_t length,
                      const CHARSET_INFO * const cs);
  /**
    This is called when storing a date in a string.

    @note
      Needs to be changed if/when we want to support different time formats.
  */
  virtual int store_time(type::Time &ltime, type::timestamp_t t_type);
  virtual double val_real() const=0;
  virtual int64_t val_int() const =0;
  virtual type::Decimal *val_decimal(type::Decimal *) const;
  String *val_str_internal(String *str) const
  {
    return val_str(str, str);
  }

  /*
     val_str(buf1, buf2) gets two buffers and should use them as follows:
     if it needs a temp buffer to convert result to string - use buf1
       example Field_tiny::val_str()
     if the value exists as a string already - use buf2
       example Field_varstring::val_str() (???)
     consequently, buf2 may be created as 'String buf;' - no memory
     will be allocated for it. buf1 will be allocated to hold a
     value if it's too small. Using allocated buffer for buf2 may result in
     an unnecessary free (and later, may be an alloc).
     This trickery is used to decrease a number of malloc calls.
  */
  virtual String *val_str(String*, String *) const =0;

  /*
   str_needs_quotes() returns true if the value returned by val_str() needs
   to be quoted when used in constructing an SQL query.
  */
  virtual bool str_needs_quotes() { return false; }
  virtual Item_result result_type () const=0;
  virtual Item_result cmp_type () const { return result_type(); }
  virtual Item_result cast_to_int_type () const { return result_type(); }

  /**
     Check whether a field type can be partially indexed by a key.

     This is a static method, rather than a virtual function, because we need
     to check the type of a non-Field in alter_table().

     @param type  field type

     @retval
       true  Type can have a prefixed key
     @retval
       false Type can not have a prefixed key
  */
  static bool type_can_have_key_part(enum_field_types);
  /**
    Return type of which can carry value of both given types in UNION result.

    @param a  type for merging
    @param b  type for merging

    @retval
      type of field
  */
  static enum_field_types field_type_merge(enum_field_types, enum_field_types);

  /**
     Detect Item_result by given field type of UNION merge result.

     @param field_type  given field type

     @return
       Item_result (type of internal MySQL expression result)
  */
  static Item_result result_merge_type(enum_field_types);

  virtual bool eq(Field *field);
  /**
   * Returns true if the fields are equally defined
   *
   * @retval
   *  true  This Field is equally defined to supplied Field
   * @retval
   *  false This Field is NOT equally defined to supplied Field
   */
  virtual bool eq_def(Field *field);

  virtual bool is_timestamp() const
  {
    return false;
  }

  /**
   * Returns size (in bytes) used to store field data in memory
   * (i.e. it returns the maximum size of the field in a row of the table,
   * which is located in RAM).
   */
  virtual uint32_t pack_length() const;

  /**
   * Returns size (in bytes) used to store field data on
   * storage (i.e. it returns the maximal size of the field in a row of the
   * table, which is located on disk).
   */
  virtual uint32_t pack_length_in_rec() const;

  /**
   * Return the "real size" of the data in memory.
   * For varstrings, this does _not_ include the length bytes.
   */
  virtual uint32_t data_length();
  /**
   * Returns the number of bytes actually used to store the data
   * of the field. So for a varstring it includes both lenght byte(s) and
   * string data, and anything after data_length() bytes are unused.
   */
  virtual uint32_t used_length();
  virtual uint32_t sort_length() const;

  /**
     Get the maximum size of the data in packed format.

     @return Maximum data length of the field when packed using the
     Field::pack() function.
   */
  virtual uint32_t max_data_length() const;
  virtual int reset(void);
  virtual void reset_fields();
  virtual void set_default();
  virtual bool binary() const;
  virtual bool zero_pack() const;
  virtual enum ha_base_keytype key_type() const;
  virtual uint32_t key_length() const;
  virtual enum_field_types type() const =0;
  virtual enum_field_types real_type() const;
  virtual int cmp_max(const unsigned char *a, const unsigned char *b, uint32_t max_len);
  virtual int cmp(const unsigned char *,const unsigned char *)=0;
  int cmp_internal(const unsigned char *str) { return cmp(ptr,str); }
  virtual int cmp_binary(const unsigned char *a,const unsigned char *b,
                         uint32_t max_length=UINT32_MAX);
  virtual int cmp_offset(uint32_t row_offset);
  virtual int cmp_binary_offset(uint32_t row_offset);
  virtual int key_cmp(const unsigned char *a,const unsigned char *b);
  virtual int key_cmp(const unsigned char *str, uint32_t length);
  virtual uint32_t decimals() const;

  /*
    Caller beware: sql_type can change str.Ptr, so check
    ptr() to see if it changed if you are using your own buffer
    in str and restore it with set() if needed
  */
  virtual void sql_type(String &str) const =0;

  // For new field
  virtual uint32_t size_of() const =0;

  bool is_null(ptrdiff_t row_offset= 0) const;
  bool is_real_null(ptrdiff_t row_offset= 0) const;
  bool is_null_in_record(const unsigned char *record) const;
  bool is_null_in_record_with_offset(ptrdiff_t offset) const;
  void set_null(ptrdiff_t row_offset= 0);
  void set_notnull(ptrdiff_t row_offset= 0);
  bool maybe_null(void) const;
  bool real_maybe_null(void) const;

  virtual void make_field(SendField *);
  virtual void sort_string(unsigned char *buff,uint32_t length)=0;
  virtual bool optimize_range(uint32_t idx, uint32_t part);
  /**
   * Returns true for fields which, when compared with constant
   * items, can be casted to int64_t. In this case we will at 'fix_fields'
   * stage cast the constant items to int64_ts and at the execution stage
   * use field->val_int() for comparison.  Used to optimize clauses like
   * 'a_column BETWEEN date_const AND date_const'.
   */
  virtual bool can_be_compared_as_int64_t() const
  {
    return false;
  }
  virtual void free() {}
  virtual Field *new_field(memory::Root *root,
                           Table *new_table,
                           bool keep_type);
  virtual Field *new_key_field(memory::Root *root, Table *new_table,
                               unsigned char *new_ptr,
                               unsigned char *new_null_ptr,
                               uint32_t new_null_bit);
  /** This is used to generate a field in Table from TableShare */
  Field *clone(memory::Root *mem_root, Table *new_table);
  void move_field(unsigned char *ptr_arg,unsigned char *null_ptr_arg,unsigned char null_bit_arg)
  {
    ptr= ptr_arg;
    null_ptr= null_ptr_arg;
    null_bit= null_bit_arg;
  }
  void move_field(unsigned char *ptr_arg) { ptr=ptr_arg; }
  virtual void move_field_offset(ptrdiff_t ptr_diff)
  {
    ptr= ADD_TO_PTR(ptr,ptr_diff, unsigned char*);
    if (null_ptr)
      null_ptr= ADD_TO_PTR(null_ptr,ptr_diff,unsigned char*);
  }
  virtual void get_image(unsigned char *buff, uint32_t length, const CHARSET_INFO * const)
  {
    memcpy(buff,ptr,length);
  }
  virtual void get_image(std::basic_string<unsigned char> &buff, uint32_t length, const CHARSET_INFO * const)
  {
    buff.append(ptr,length);
  }
  virtual void set_image(const unsigned char *buff,uint32_t length, const CHARSET_INFO * const)
  {
    memcpy(ptr,buff,length);
  }

  /**
   * Copy a field part into an output buffer.
   *
   * @details
   *
   * This function makes a copy of field part of size equal to or
   * less than "length" parameter value.
   * For fields of string types (VARCHAR, TEXT) the rest of buffer
   * is padded by zero byte.
   *
   * @param output buffer
   * @param output buffer size
   *
   * @note
   *
   * For variable length character fields (i.e. UTF-8) the "length"
   * parameter means a number of output buffer bytes as if all field
   * characters have maximal possible size (mbmaxlen). In the other words,
   * "length" parameter is a number of characters multiplied by
   * field_charset->mbmaxlen.
   *
   * @retval
   *   Number of copied bytes (excluding padded zero bytes -- see above).
   */
  virtual uint32_t get_key_image(unsigned char *buff, uint32_t length)
  {
    get_image(buff, length, &my_charset_bin);
    return length;
  }
  virtual uint32_t get_key_image(std::basic_string<unsigned char> &buff, uint32_t length)
  {
    get_image(buff, length, &my_charset_bin);
    return length;
  }
  virtual void set_key_image(const unsigned char *buff,uint32_t length)
  {
    set_image(buff,length, &my_charset_bin);
  }
  int64_t val_int_offset(uint32_t row_offset)
  {
    ptr+=row_offset;
    int64_t tmp=val_int();
    ptr-=row_offset;
    return tmp;
  }

  int64_t val_int_internal(const unsigned char *new_ptr)
  {
    unsigned char *old_ptr= ptr;
    ptr= const_cast<unsigned char*>(new_ptr);
    int64_t return_value= val_int();
    ptr= old_ptr;
    return return_value;
  }

  String *val_str_internal(String *str, const unsigned char *new_ptr)
  {
    unsigned char *old_ptr= ptr;
    ptr= const_cast<unsigned char*>(new_ptr);
    val_str_internal(str);
    ptr= old_ptr;
    return str;
  }

  /**
    Pack the field into a format suitable for storage and transfer.

    To implement packing functionality, only the virtual function
    should be overridden. The other functions are just convenience
    functions and hence should not be overridden.

    The value of <code>low_byte_first</code> is dependent on how the
    packed data is going to be used: for local use, e.g., temporary
    store on disk or in memory, use the native format since that is
    faster. For data that is going to be transfered to other machines
    (e.g., when writing data to the binary log), data should always be
    stored in little-endian format.

    @note The default method for packing fields just copy the raw bytes
    of the record into the destination, but never more than
    <code>max_length</code> characters.

    @param to
    Pointer to memory area where representation of field should be put.

    @param from
    Pointer to memory area where record representation of field is
    stored.

    @param max_length
    Maximum length of the field, as given in the column definition. For
    example, for <code>CHAR(1000)</code>, the <code>max_length</code>
    is 1000. This information is sometimes needed to decide how to pack
    the data.

    @param low_byte_first
    @c true if integers should be stored little-endian, @c false if
    native format should be used. Note that for little-endian machines,
    the value of this flag is a moot point since the native format is
    little-endian.
  */
  virtual unsigned char *pack(unsigned char *to,
                              const unsigned char *from,
                              uint32_t max_length,
                              bool low_byte_first);

  unsigned char *pack(unsigned char *to, const unsigned char *from);

  /**
    Unpack a field from row data.

    This method is used to unpack a field from a master whose size of
    the field is less than that of the slave.

    The <code>param_data</code> parameter is a two-byte integer (stored
    in the least significant 16 bits of the unsigned integer) usually
    consisting of two parts: the real type in the most significant byte
    and a original pack length in the least significant byte.

    The exact layout of the <code>param_data</code> field is given by
    the <code>Table_map_log_event::save_field_metadata()</code>.

    This is the default method for unpacking a field. It just copies
    the memory block in byte order (of original pack length bytes or
    length of field, whichever is smaller).

    @param   to         Destination of the data
    @param   from       Source of the data
    @param   param_data Real type and original pack length of the field
                        data

    @param low_byte_first
    If this flag is @c true, all composite entities (e.g., lengths)
    should be unpacked in little-endian format; otherwise, the entities
    are unpacked in native order.

    @return  New pointer into memory based on from + length of the data
  */
  virtual const unsigned char *unpack(unsigned char* to,
                                      const unsigned char *from,
                                      uint32_t param_data,
                                      bool low_byte_first);
  /**
     @overload Field::unpack(unsigned char*, const unsigned char*,
                             uint32_t, bool)
  */
  const unsigned char *unpack(unsigned char* to,
                              const unsigned char *from);

  virtual unsigned char *pack_key(unsigned char* to,
                                  const unsigned char *from,
                                  uint32_t max_length,
                                  bool low_byte_first)
  {
    return pack(to, from, max_length, low_byte_first);
  }
  virtual const unsigned char *unpack_key(unsigned char* to,
                                          const unsigned char *from,
                                          uint32_t max_length,
                                          bool low_byte_first)
  {
    return unpack(to, from, max_length, low_byte_first);
  }
  virtual uint32_t max_packed_col_length(uint32_t max_length)
  {
    return max_length;
  }

  uint32_t offset(const unsigned char *record)
  {
    return (uint32_t) (ptr - record);
  }
  void copy_from_tmp(int offset);
  uint32_t fill_cache_field(CacheField *copy);
  virtual bool get_date(type::Time &ltime,uint32_t fuzzydate) const;
  virtual bool get_time(type::Time &ltime) const;
  virtual const CHARSET_INFO *charset(void) const { return &my_charset_bin; }
  virtual const CHARSET_INFO *sort_charset(void) const { return charset(); }
  virtual bool has_charset(void) const { return false; }
  virtual void set_charset(const CHARSET_INFO * const)
  {}
  virtual enum Derivation derivation(void) const
  {
    return DERIVATION_IMPLICIT;
  }
  virtual void set_derivation(enum Derivation)
  {}
  /**
    Produce warning or note about data saved into field.

    @param level            - level of message (Note/Warning/Error)
    @param code             - error code of message to be produced
    @param cuted_increment  - whenever we should increase cut fields count or not

    @note
      This function won't produce warning and increase cut fields counter
      if count_cuted_fields == CHECK_FIELD_IGNORE for current thread.

      if count_cuted_fields == CHECK_FIELD_IGNORE then we ignore notes.
      This allows us to avoid notes in optimisation, like convert_constant_item().

    @retval
      1 if count_cuted_fields == CHECK_FIELD_IGNORE and error level is not NOTE
    @retval
      0 otherwise
  */
  bool set_warning(DRIZZLE_ERROR::enum_warning_level,
                   drizzled::error_t code,
                   int cuted_increment);
  /**
    Produce warning or note about datetime string data saved into field.

    @param level            level of message (Note/Warning/Error)
    @param code             error code of message to be produced
    @param str              string value which we tried to save
    @param str_length       length of string which we tried to save
    @param ts_type          type of datetime value (datetime/date/time)
    @param cuted_increment  whenever we should increase cut fields count or not

    @note
      This function will always produce some warning but won't increase cut
      fields counter if count_cuted_fields ==FIELD_CHECK_IGNORE for current
      thread.
  */
  void set_datetime_warning(DRIZZLE_ERROR::enum_warning_level,
                            drizzled::error_t code,
                            const char *str,
                            uint32_t str_len,
                            type::timestamp_t ts_type,
                            int cuted_increment);
  /**
    Produce warning or note about integer datetime value saved into field.

    @param level            level of message (Note/Warning/Error)
    @param code             error code of message to be produced
    @param nr               numeric value which we tried to save
    @param ts_type          type of datetime value (datetime/date/time)
    @param cuted_increment  whenever we should increase cut fields count or not

    @note
      This function will always produce some warning but won't increase cut
      fields counter if count_cuted_fields == FIELD_CHECK_IGNORE for current
      thread.
  */
  void set_datetime_warning(DRIZZLE_ERROR::enum_warning_level,
                            drizzled::error_t code,
                            int64_t nr,
                            type::timestamp_t ts_type,
                            int cuted_increment);
  /**
    Produce warning or note about double datetime data saved into field.

    @param level            level of message (Note/Warning/Error)
    @param code             error code of message to be produced
    @param nr               double value which we tried to save
    @param ts_type          type of datetime value (datetime/date/time)

    @note
      This function will always produce some warning but won't increase cut
      fields counter if count_cuted_fields == FIELD_CHECK_IGNORE for current
      thread.
  */
  void set_datetime_warning(DRIZZLE_ERROR::enum_warning_level,
                            const drizzled::error_t code,
                            double nr,
                            type::timestamp_t ts_type);
  bool check_overflow(int op_result)
  {
    return (op_result == E_DEC_OVERFLOW);
  }
  /**
    Process decimal library return codes and issue warnings for overflow and
    truncation.

    @param op_result  decimal library return code (E_DEC_* see include/decimal.h)

    @retval
      E_DEC_OVERFLOW   there was overflow
      E_DEC_TRUNCATED  there was truncation
    @retval
      0  no error or there was some other error except overflow or truncation
  */
  int warn_if_overflow(int op_result);
  void init(Table *table_arg);

  /* maximum possible display length */
  virtual uint32_t max_display_length()= 0;

  virtual uint32_t is_equal(CreateField *new_field);
  /**
    Conversion from decimal to int64_t with checking overflow and
    setting correct value (min/max) in case of overflow.

    @param val             value which have to be converted
    @param unsigned_flag   type of integer in which we convert val
    @param err             variable to pass error code

    @return
      value converted from val
  */
  int64_t convert_decimal2int64_t(const type::Decimal *val,
                                  bool unsigned_flag,
                                  int *err);
  /* The max. number of characters */
  uint32_t char_length() const
  {
    return field_length / charset()->mbmaxlen;
  }

  enum column_format_type column_format() const
  {
    return (enum column_format_type)
      ((flags >> COLUMN_FORMAT_FLAGS) & COLUMN_FORMAT_MASK);
  }

  /* Hash value */
  virtual void hash(uint32_t *nr, uint32_t *nr2) const;
  friend bool reopen_table(Session *,Table *,bool);

  friend class CopyField;
  friend class Item_avg_field;
  friend class Item_std_field;
  friend class Item_sum_num;
  friend class Item_sum_sum;
  friend class Item_sum_str;
  friend class Item_sum_count;
  friend class Item_sum_avg;
  friend class Item_sum_std;
  friend class Item_sum_min;
  friend class Item_sum_max;
  friend class Item_func_group_concat;

  bool isReadSet() const;
  bool isWriteSet();
  void setReadSet(bool arg= true);
  void setWriteSet(bool arg= true);

protected:

  void pack_num(uint64_t arg, unsigned char *destination= NULL);
  void pack_num(uint32_t arg, unsigned char *destination= NULL);
  uint64_t unpack_num(uint64_t &destination, const unsigned char *arg= NULL) const;
  uint32_t unpack_num(uint32_t &destination, const unsigned char *arg= NULL) const;
};

namespace field {

inline bool isDateTime(const enum_field_types &arg)
{
  switch (arg)
  {
  case DRIZZLE_TYPE_DATE:
  case DRIZZLE_TYPE_DATETIME:
  case DRIZZLE_TYPE_MICROTIME:
  case DRIZZLE_TYPE_TIME:
  case DRIZZLE_TYPE_TIMESTAMP:
    return true;

  case DRIZZLE_TYPE_BLOB:
  case DRIZZLE_TYPE_BOOLEAN:
  case DRIZZLE_TYPE_DECIMAL:
  case DRIZZLE_TYPE_DOUBLE:
  case DRIZZLE_TYPE_ENUM:
  case DRIZZLE_TYPE_LONG:
  case DRIZZLE_TYPE_LONGLONG:
  case DRIZZLE_TYPE_NULL:
  case DRIZZLE_TYPE_UUID:
  case DRIZZLE_TYPE_VARCHAR:
    return false;
  }

  assert(0);
  abort();
}

} // namespace field

std::ostream& operator<<(std::ostream& output, const Field &field);

} /* namespace drizzled */

/** @TODO Why is this in the middle of the file???*/
#include <drizzled/create_field.h>

namespace drizzled
{

/**
 * A class for sending field information to a client.
 *
 * @details
 *
 * Send_field is basically a stripped-down POD class for
 * representing basic information about a field...
 */
class SendField
{
public:
  const char *db_name;
  const char *table_name;
  const char *org_table_name;
  const char *col_name;
  const char *org_col_name;
  uint32_t length;
  uint32_t charsetnr;
  uint32_t flags;
  uint32_t decimals;
  enum_field_types type;
  SendField() {}
};

uint32_t pack_length_to_packflag(uint32_t type);
uint32_t calc_pack_length(enum_field_types type,uint32_t length);
int set_field_to_null(Field *field);
int set_field_to_null_with_conversions(Field *field, bool no_conversions);

/**
 * Tests if the given string contains important data:
 * not spaces for character string, or any data for binary string.
 *
 * @param pointer to the character set to use
 * @param String to test
 * @param String end
 *
 * @retval
 *  false - If string does not have important data
 * @retval
 *  true  - If string has some important data
 */
bool test_if_important_data(const CHARSET_INFO * const cs,
                            const char *str,
                            const char *strend);

} /* namespace drizzled */

