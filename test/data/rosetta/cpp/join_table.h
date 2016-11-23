/* - mode: c; c-basic-offset: 2; indent-tabs-mode: nil; -*-
 *  vim:expandtab:shiftwidth=2:tabstop=2:smarttab:
 *
 *  Copyright (C) 2008-2009 Sun Microsystems, Inc.
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
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

/**
 * @file
 *
 * Defines the JoinTable class which is the primary class
 * used in the nested loops join implementation.
 */

#pragma once

#include <drizzled/enum_nested_loop_state.h>
#include <drizzled/table_reference.h>
#include <drizzled/optimizer/range.h>
#include <drizzled/join_cache.h>
#include <drizzled/optimizer/key_use.h>

#include <drizzled/records.h>

#include <bitset>

namespace drizzled
{

class Table;

namespace optimizer
{
  class Position;
}
/* Values for JoinTable::packed_info */
#define TAB_INFO_HAVE_VALUE 1
#define TAB_INFO_USING_INDEX 2
#define TAB_INFO_USING_WHERE 4
#define TAB_INFO_FULL_SCAN_ON_NULL 8

/** Description of an access method */
enum access_method
{ 
  AM_UNKNOWN,
  AM_SYSTEM,
  AM_CONST,
  AM_EQ_REF,
  AM_REF,
  AM_MAYBE_REF,
	AM_ALL,
  AM_RANGE,
  AM_NEXT,
  AM_REF_OR_NULL,
  AM_UNIQUE_SUBQUERY,
  AM_INDEX_SUBQUERY,
  AM_INDEX_MERGE
};


class JoinTable 
{
public:
  JoinTable() :
    table(NULL),
    keyuse(NULL),
    select(NULL),
    select_cond(NULL),
    quick(NULL),
    pre_idx_push_select_cond(NULL),
    on_expr_ref(NULL),
    cond_equal(NULL),
    first_inner(NULL),
    found(false),
    not_null_compl(false),
    last_inner(NULL),
    first_upper(NULL),
    first_unmatched(NULL),
    packed_info(0),
    read_first_record(NULL),
    next_select(NULL),
    worst_seeks(0.0),
    const_keys(0),
    checked_keys(0),
    needed_reg(0),
    keys(0),
    records(0),
    found_records(0),
    read_time(0),
    dependent(0),
    key_dependent(0),
    use_quick(0),
    index(0),
    status(0),
    used_fields(0),
    used_fieldlength(0),
    used_blobs(0),
    type(AM_UNKNOWN),
    cached_eq_ref_table(0),
    eq_ref_table(0),
    not_used_in_distinct(0),
    sorted(0),
    limit(0),
    join(NULL),
    insideout_match_tab(NULL),
    insideout_buf(NULL),
    found_match(false),
    rowid_keep_flags(0),
    embedding_map(0)
  {}
  Table *table;
  optimizer::KeyUse *keyuse; /**< pointer to first used key */
  optimizer::SqlSelect *select;
  COND *select_cond;
  optimizer::QuickSelectInterface *quick;
  /**
    The value of select_cond before we've attempted to do Index Condition
    Pushdown. We may need to restore everything back if we first choose one
    index but then reconsider (see test_if_skip_sort_order() for such
    scenarios).
    NULL means no index condition pushdown was performed.
  */
  Item *pre_idx_push_select_cond;
  Item **on_expr_ref;   /**< pointer to the associated on expression   */
  COND_EQUAL *cond_equal;    /**< multiple equalities for the on expression */
  JoinTable *first_inner;   /**< first inner table for including outerjoin */
  bool found;         /**< true after all matches or null complement */
  bool not_null_compl;/**< true before null complement is added      */
  JoinTable *last_inner;    /**< last table table for embedding outer join */
  JoinTable *first_upper;  /**< first inner table for embedding outer join */
  JoinTable *first_unmatched; /**< used for optimization purposes only     */

  /* Special content for EXPLAIN 'Extra' column or NULL if none */
  const char *info;
  /*
    Bitmap of TAB_INFO_* bits that encodes special line for EXPLAIN 'Extra'
    column, or 0 if there is no info.
  */
  uint32_t packed_info;

  Read_record_func read_first_record;
  Next_select_func next_select;
  ReadRecord	read_record;
  /*
    Currently the following two fields are used only for a [NOT] IN subquery
    if it is executed by an alternative full table scan when the left operand of
    the subquery predicate is evaluated to NULL.
  */
  Read_record_func save_read_first_record; /**< to save read_first_record */
  int (*save_read_record) (ReadRecord *); /**< to save read_record.read_record */
  double worst_seeks;
  key_map	const_keys; /**< Keys with constant part */
  key_map	checked_keys; /**< Keys checked in find_best */
  key_map	needed_reg;
  key_map keys; /**< all keys with can be used */

  /** Either #rows in the table or 1 for const table.  */
  ha_rows	records;
  /**
    Number of records that will be scanned (yes scanned, not returned) by the
    best 'independent' access method, i.e. table scan or QUICK_*_SELECT)
  */
  ha_rows found_records;
  /**
    Cost of accessing the table using "ALL" or range/index_merge access
    method (but not 'index' for some reason), i.e. this matches method which
    E(#records) is in found_records.
  */
  ha_rows read_time;

  table_map	dependent;
  table_map key_dependent;
  uint32_t use_quick;
  uint32_t index;
  uint32_t status; /**< Save status for cache */
  uint32_t used_fields; /**< Number of used fields in join set */
  uint32_t used_fieldlength; /**< Not sure... */
  uint32_t used_blobs; /**< Number of BLOB fields in join set */
  enum access_method type; /**< Access method. */
  bool cached_eq_ref_table;
  bool eq_ref_table;
  bool not_used_in_distinct;
  /** True if index-based access method must return records in order */
  bool sorted;
  /**
    If it's not 0 the number stored this field indicates that the index
    scan has been chosen to access the table data and we expect to scan
    this number of rows for the table.
  */
  ha_rows limit;
  table_reference_st	ref;
  JoinCache cache;
  Join *join;

  /**
     ptr  - this join tab should do an InsideOut scan. Points
            to the tab for which we'll need to check tab->found_match.

     NULL - Not an insideout scan.
  */
  JoinTable *insideout_match_tab;
  unsigned char *insideout_buf; /**< Buffer to save index tuple to be able to skip dups */

  /** Used by InsideOut scan. Just set to true when have found a row. */
  bool found_match;

  enum 
  {
    /* If set, the rowid of this table must be put into the temptable. */
    KEEP_ROWID=1,
    /*
      If set, one should call h->position() to obtain the rowid,
      otherwise, the rowid is assumed to already be in h->ref
      (this is because join caching and filesort() save the rowid and then
      put it back into h->ref)
    */
    CALL_POSITION=2
  };
  /** A set of flags from the above enum */
  int rowid_keep_flags;

  /** Bitmap of nested joins this table is part of */
  std::bitset<64> embedding_map;

  void cleanup();

  inline bool is_using_loose_index_scan()
  {
    return (select && select->quick &&
            (select->quick->get_type() ==
             optimizer::QuickSelectInterface::QS_TYPE_GROUP_MIN_MAX));
  }

  void readCachedRecord();
  int joinReadConstTable(optimizer::Position *pos);
  int joinReadSystem();
};

} /* namespace drizzled */

