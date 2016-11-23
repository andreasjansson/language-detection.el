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

#pragma once

#include <drizzled/item/int.h>

namespace drizzled
{

class Item_uint :public Item_int
{
public:
  Item_uint(const char *str_arg, uint32_t length);
  Item_uint(uint64_t i) :Item_int((uint64_t) i, 10) {}
  Item_uint(const char *str_arg, int64_t i, uint32_t length);
  double val_real()
    { assert(fixed == 1); return uint64_t2double((uint64_t)value); }
  String *val_str(String*);
  Item *clone_item() { return new Item_uint(name, value, max_length); }
  int save_in_field(Field *field, bool no_conversions);
  virtual void print(String *str);
  Item_num *neg ();
  uint32_t decimal_precision() const { return max_length; }
};

} /* namespace drizzled */

