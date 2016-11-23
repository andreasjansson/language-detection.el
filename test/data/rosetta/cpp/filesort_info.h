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

#include <drizzled/sql_sort.h>
#pragma once


namespace drizzled
{

/* Information on state of filesort */
class filesort_info
{
public:
  internal::st_io_cache *io_cache;           /* If sorted through filesort */
  unsigned char     **sort_keys;        /* Buffer for sorting keys */
  unsigned char     *buffpek;           /* Buffer for buffpek structures */
  uint32_t      buffpek_len;        /* Max number of buffpeks in the buffer */
  unsigned char     *addon_buf;         /* Pointer to a buffer if sorted with fields */
  size_t    addon_length;       /* Length of the buffer */
  sort_addon_field *addon_field;     /* Pointer to the fields info */
  void    (*unpack)(sort_addon_field *, unsigned char *); /* To unpack back */
  unsigned char     *record_pointers;    /* If sorted in memory */
  ha_rows   found_records;      /* How many records in sort */

  filesort_info() :
    io_cache(0),
    sort_keys(0),
    buffpek(0),
    buffpek_len(0),
    addon_buf(0),
    addon_length(0),
    addon_field(0),
    unpack(0),
    record_pointers(0),
    found_records()
  { }

  filesort_info(const filesort_info& arg) :
    io_cache(arg.io_cache),
    sort_keys(arg.sort_keys),
    buffpek(arg.buffpek),
    buffpek_len(arg.buffpek_len),
    addon_buf(arg.addon_buf),
    addon_length(arg.addon_length),
    addon_field(arg.addon_field),
    unpack(arg.unpack),
    record_pointers(arg.record_pointers),
    found_records(arg.found_records)
  {
  }

  ~filesort_info()
  {
  }

};

} /* namespace drizzled */

