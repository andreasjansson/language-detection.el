/*
  Copyright (C) 2010 Stewart Smith

  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU General Public License
  as published by the Free Software Foundation; either version 2
  of the License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

#pragma once

#include <drizzled/cursor.h>

class TableProtoTesterCursor: public drizzled::Cursor
{
public:
  TableProtoTesterCursor(drizzled::plugin::StorageEngine &engine, drizzled::Table &table_arg);
  ~TableProtoTesterCursor()
  {}

  /*
    The name of the index type that will be used for display
    don't implement this method unless you really have indexes
  */
  const char *index_type(uint32_t key_number);
  uint32_t index_flags(uint32_t inx) const;
  int open(const char *name, int mode, uint32_t test_if_locked);
  int close(void);
  int doInsertRecord(unsigned char * buf);
  int doStartTableScan(bool scan);
  int rnd_next(unsigned char *buf);
  int rnd_pos(unsigned char * buf, unsigned char *pos);

  int index_read_map(unsigned char * buf, const unsigned char * key, drizzled::key_part_map keypart_map,
                     drizzled::ha_rkey_function find_flag);
  int index_read_idx_map(unsigned char * buf, uint32_t idx, const unsigned char * key,
                         drizzled::key_part_map keypart_map,
                         drizzled::ha_rkey_function find_flag);
  int index_read_last_map(unsigned char * buf, const unsigned char * key, drizzled::key_part_map keypart_map);
  int index_next(unsigned char * buf);
  int index_prev(unsigned char * buf);
  int index_first(unsigned char * buf);
  int index_last(unsigned char * buf);
  void position(const unsigned char *record);
  int info(uint32_t flag);

  void get_auto_increment(uint64_t, uint64_t,
                          uint64_t,
                          uint64_t *,
                          uint64_t *)
  {}
};

