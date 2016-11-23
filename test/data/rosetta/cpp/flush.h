/* -*- mode: c++; c-basic-offset: 2; indent-tabs-mode: nil; -*-
 *  vim:expandtab:shiftwidth=2:tabstop=2:smarttab:
 *
 *  Copyright (C) 2009 Sun Microsystems, Inc.
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

#include <drizzled/statement.h>

namespace drizzled
{
class Session;

namespace statement
{

class Flush : public Statement
{
public:
  Flush(Session *in_session) :
    Statement(in_session),
    flush_log(false),
    flush_tables(false),
    flush_tables_with_read_lock(false),
    flush_status(false),
    flush_global_status(false)
  {
    set_command(SQLCOM_FLUSH);
    lex().type= 0;
  }

  bool execute();

private:
  bool flush_log;
  bool flush_tables;
  bool flush_tables_with_read_lock;
  bool flush_status;
  bool flush_global_status;

public:
  void setFlushLog(bool f) { flush_log= f; }
  void setFlushTables(bool f) { flush_tables= f; }
  void setFlushTablesWithReadLock(bool f) {
    flush_tables= flush_tables_with_read_lock= f;
  }
  void setFlushStatus(bool f) { flush_status= f; }
  void setFlushGlobalStatus(bool f) { flush_global_status= f; }

private:

  /**
   * Reload/resets privileges and the different caches.
   *
   * @note Depending on 'options', it may be very bad to write the
   * query to the binlog (e.g. FLUSH SLAVE); this is a
   * pointer where reloadCache() will put 0 if
   * it thinks we really should not write to the binlog.
   * Otherwise it will put 1.
   * 
   * @return Error status code
   * @retval 0 Ok
   * @retval !=0  Error; session->killed is set or session->is_error() is true
   */
  bool reloadCache();
};

} /* namespace statement */

} /* namespace drizzled */

