/* - mode: c; c-basic-offset: 2; indent-tabs-mode: nil; -*-
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

namespace drizzle_plugin
{

enum drizzle_option
{
  DRIZZLE_OPT_CONNECT_TIMEOUT, DRIZZLE_OPT_COMPRESS, DRIZZLE_OPT_NAMED_PIPE,
  DRIZZLE_INIT_COMMAND, DRIZZLE_READ_DEFAULT_FILE, DRIZZLE_READ_DEFAULT_GROUP,
  DRIZZLE_OPT_PROTOCOL, DRIZZLE_SHARED_MEMORY_BASE_NAME, DRIZZLE_OPT_READ_TIMEOUT,
  DRIZZLE_OPT_WRITE_TIMEOUT, DRIZZLE_OPT_USE_RESULT,
  DRIZZLE_OPT_USE_REMOTE_CONNECTION,
  DRIZZLE_OPT_GUESS_CONNECTION, DRIZZLE_SET_CLIENT_IP, DRIZZLE_SECURE_AUTH,
  DRIZZLE_REPORT_DATA_TRUNCATION, DRIZZLE_OPT_RECONNECT,
  DRIZZLE_OPT_SSL_VERIFY_SERVER_CERT
};

struct st_drizzleclient_options {
  unsigned int connect_timeout, read_timeout, write_timeout;
  unsigned int port;
  unsigned long client_flag;
  char *host,*user,*password,*db;
  char *my_cnf_file,*my_cnf_group;
  char *ssl_key;        /* PEM key file */
  char *ssl_cert;        /* PEM cert file */
  char *ssl_ca;          /* PEM CA file */
  char *ssl_capath;        /* PEM directory of CA-s? */
  char *ssl_cipher;        /* cipher to use */
  char *shared_memory_base_name;
  unsigned long max_allowed_packet;
  bool use_ssl;        /* if to use SSL or not */
  bool compress,named_pipe;
  bool unused1;
  bool unused2;
  bool unused3;
  bool unused4;
  enum drizzle_option methods_to_use;
  char *client_ip;
  /* Refuse client connecting to server if it uses old (pre-4.1.1) protocol */
  bool secure_auth;
  /* 0 - never report, 1 - always report (default) */
  bool report_data_truncation;

  /* function pointers for local infile support */
  int (*local_infile_init)(void **, const char *, void *);
  int (*local_infile_read)(void *, char *, unsigned int);
  void (*local_infile_end)(void *);
  int (*local_infile_error)(void *, char *, unsigned int);
  void *local_infile_userdata;
  void *extension;
};


#define CLIENT_LONG_PASSWORD    1       /* new more secure passwords */
#define CLIENT_FOUND_ROWS       2       /* Found instead of affected rows */
#define CLIENT_LONG_FLAG        4       /* Get all column flags */
#define CLIENT_CONNECT_WITH_DB  8       /* One can specify db on connect */
#define CLIENT_NO_SCHEMA        16      /* Don't allow database.table.column */
#define CLIENT_COMPRESS         32      /* Can use compression protocol */
#define CLIENT_ODBC             64      /* Odbc client */
#define CLIENT_IGNORE_SPACE     256     /* Ignore spaces before '(' */
#define CLIENT_PROTOCOL_MYSQL41 512     /* New 4.1 protocol */
#define CLIENT_INTERACTIVE      1024
#define CLIENT_SSL              2048    /* Switch to SSL after handshake */
#define CLIENT_IGNORE_SIGPIPE   4096    /* IGNORE sigpipes */
#define CLIENT_TRANSACTIONS     8192    /* Support transactions */
#define CLIENT_RESERVED         16384   /* Old flag for 4.1 protocol  */
#define CLIENT_SECURE_CONNECTION 32768  /* New 4.1 authentication */
#define CLIENT_MULTI_STATEMENTS (1UL << 16) /* Enable/disable multi-stmt support */
#define CLIENT_MULTI_RESULTS    (1UL << 17) /* Enable/disable multi-results */
#define CLIENT_CAPABILITIES_PLUGIN_AUTH (1 << 19)

#define CLIENT_ADMIN            (1UL << 25) /* Admin client connection */

#define CLIENT_SSL_VERIFY_SERVER_CERT (1UL << 30)
#define CLIENT_REMEMBER_OPTIONS (1UL << 31)

/* Gather all possible capabilites (flags) supported by the server */
#define CLIENT_ALL_FLAGS  (CLIENT_LONG_PASSWORD | \
                           CLIENT_FOUND_ROWS | \
                           CLIENT_LONG_FLAG | \
                           CLIENT_CONNECT_WITH_DB | \
                           CLIENT_NO_SCHEMA | \
                           CLIENT_COMPRESS | \
                           CLIENT_ODBC | \
                           CLIENT_IGNORE_SPACE | \
                           CLIENT_INTERACTIVE | \
                           CLIENT_SSL | \
                           CLIENT_IGNORE_SIGPIPE | \
                           CLIENT_TRANSACTIONS | \
                           CLIENT_RESERVED | \
                           CLIENT_SECURE_CONNECTION | \
                           CLIENT_MULTI_STATEMENTS | \
                           CLIENT_MULTI_RESULTS | \
                           CLIENT_CAPABILITIES_PLUGIN_AUTH | \
                           CLIENT_ADMIN | \
                           CLIENT_SSL_VERIFY_SERVER_CERT | \
                           CLIENT_REMEMBER_OPTIONS)

/*
  Switch off the flags that are optional and depending on build flags
  If any of the optional flags is supported by the build it will be switched
  on before sending to the client during the connection handshake.
*/
#define CLIENT_BASIC_FLAGS (((CLIENT_ALL_FLAGS & ~CLIENT_SSL) \
                                               & ~CLIENT_COMPRESS) \
                                               & ~CLIENT_SSL_VERIFY_SERVER_CERT)

} /* namespace drizzle_plugin */

