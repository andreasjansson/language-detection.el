/* -*- mode: c++; c-basic-offset: 2; indent-tabs-mode: nil; -*-
 *  vim:expandtab:shiftwidth=2:tabstop=2:smarttab:
 *
 *  Copyright (C) 2011 Andrew Hutchings
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

#ifndef CLIENT_SERVER_DETECT_H
#define CLIENT_SERVER_DETECT_H

#include <boost/regex.hpp>

class ServerDetect
{
  public:
    enum server_type {
      SERVER_MYSQL_FOUND,
      SERVER_DRIZZLE_FOUND,
      SERVER_UNKNOWN_FOUND
    };

    server_type getServerType() { return type; }
    std::string& getServerVersion() { return version; }

    ServerDetect(drizzle_con_st *connection) :
      type(SERVER_UNKNOWN_FOUND),
      version("")
    {
      boost::match_flag_type flags = boost::match_default;

      boost::regex mysql_regex("(5\\.[0-9]+\\.[0-9]+)");
      boost::regex drizzle_regex("(20[0-9]{2}\\.(0[1-9]|1[012])\\.[0-9]+)");

      version= drizzle_con_server_version(connection);

      if (regex_search(version, mysql_regex, flags))
        type= SERVER_MYSQL_FOUND;
      else if (regex_search(version, drizzle_regex, flags))
        type= SERVER_DRIZZLE_FOUND;
      else
        type= SERVER_UNKNOWN_FOUND;
    }

  private:
    server_type type;
    std::string version;
};

#endif /* CLIENT_SERVER_DETECT_H */
