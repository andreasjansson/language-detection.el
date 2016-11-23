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

#include <drizzled/common.h>
#include <drizzled/item_result.h>

namespace drizzled
{

class Item;
class Field;
class Hybrid_type;
class String;

namespace type {
class Decimal;
}

/* Hybryd_type_traits interface + default implementation for REAL_RESULT */

class Hybrid_type_traits
{
public:

  virtual Item_result type() const;

  virtual void
  fix_length_and_dec(Item *item, Item *arg) const;

  /* Hybrid_type operations. */
  virtual void set_zero(Hybrid_type *val) const;
  virtual void add(Hybrid_type *val, Field *f) const;
  virtual void div(Hybrid_type *val, uint64_t u) const;

  virtual int64_t val_int(Hybrid_type *val,
                          bool unsigned_flag) const;
  virtual double val_real(Hybrid_type *val) const;
  virtual type::Decimal *val_decimal(Hybrid_type *val, type::Decimal *buf) const;
  virtual String *val_str(Hybrid_type *val, String *buf,
                          uint8_t decimals) const;

  static const Hybrid_type_traits *instance();
  Hybrid_type_traits();
  virtual ~Hybrid_type_traits();

};

} /* namespace drizzled */

