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

#include <boost/shared_ptr.hpp>

#include <drizzled/enum.h>
#include <drizzled/lex_string.h>

namespace drizzled {

namespace plugin
{
  class StorageEngine;
}

class Session;
class sys_var;
class Item;
class Item_func_set_user_var;
class Time_zone;
typedef struct my_locale_st MY_LOCALE;
typedef struct charset_info_st CHARSET_INFO;

/* Classes to support the SET command */


/****************************************************************************
  Variables that are changable runtime are declared using the
  following classes
****************************************************************************/

/****************************************************************************
  Classes for parsing of the SET command
****************************************************************************/

class set_var_base
{
public:
  set_var_base() {}
  virtual ~set_var_base() {}
  virtual int check(Session *session)=0;	/* To check privileges etc. */
  virtual int update(Session *session)=0;	/* To set the value */
  /* light check for PS */
};

/* MySQL internal variables */
class set_var :
  public set_var_base
{
  uint64_t uint64_t_value;
  std::string str_value;
public:
  sys_var *var;
  Item *value;
  sql_var_t type;
  LEX_STRING base;			/* for structs */

  set_var(sql_var_t type_arg, sys_var *var_arg,
          const LEX_STRING *base_name_arg, Item *value_arg);
  int check(Session *session);
  int update(Session *session);
  void setValue(const std::string &new_value);
  void setValue(uint64_t new_value);
  void updateValue();

  uint64_t getInteger()
  {
    return uint64_t_value;
  }

};

/* User variables like @my_own_variable */

class set_var_user: public set_var_base
{
  Item_func_set_user_var *user_var_item;
public:
  explicit set_var_user(Item_func_set_user_var *item) :
    user_var_item(item)
  {}
  int check(Session *session);
  int update(Session *session);
};

typedef boost::shared_ptr<set_var_base> SetVarPtr;
typedef std::vector<SetVarPtr> SetVarVector;
int sql_set_variables(Session *session, const SetVarVector &var_list);

} /* namespace drizzled */

