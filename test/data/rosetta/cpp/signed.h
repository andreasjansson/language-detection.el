/* - mode: c++ c-basic-offset: 2; indent-tabs-mode: nil; -*-
 *  vim:expandtab:shiftwidth=2:tabstop=2:smarttab:
 *
 *  Copyright (C) 2010 Brian Aker
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

#pragma once

#include <drizzled/function/math/int.h>

namespace drizzled {
namespace function {
namespace cast {

class Signed : public Item_int_func
{
public:
  Signed(Item *a) :
    Item_int_func(a)
  {}

  const char *func_name() const { return "cast_as_signed"; }

  int64_t val_int();

  void fix_length_and_dec()
  {
    fix_char_length(args[0]->max_char_length());
    unsigned_flag= false;
  }

  void print(String *str);

  uint32_t decimal_precision() const
  {
    return args[0]->decimal_precision();
  }
};

} // namespace cast
} // namespace function
} // namespace drizzled

