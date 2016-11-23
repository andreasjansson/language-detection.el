/* Copyright (C) 2008 PrimeBase Technologies GmbH, Germany
 *
 * PrimeBase Media Stream for MySQL
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 * Original author: Paul McCullagh (H&G2JCtL)
 * Continued development: Barry Leslie
 *
 * 2007-05-30
 *
 * CORE SYSTEM:
 * Compilation flags. Should be included at the top of all
 * source files.
 *
 */

#pragma once
#ifndef __CSCONFIG_H__
#define __CSCONFIG_H__

#if defined(MYSQL_SERVER) ||  defined(DRIZZLED)
// Because mysql_priv.h can redefine system data types it is not safe to include it
// in some souce code files and not others because of what it may do to structures defined
// in other headers. So the only safe thing I can think of is to include it in all source code
// files.
#ifdef DRIZZLED
#include <config.h>
#include <drizzled/common.h>
#else
#include "my_global.h"
#include "mysql_priv.h"
#endif

#else  // defined(MYSQL_SERVER) ||  defined(DRIZZLED)

#if defined(WIN32) ||  defined(WIN64) 
#include "win_config.h"
#else
#include <config.h>
#endif

#endif // defined(MYSQL_SERVER) ||  defined(DRIZZLED)


/*
 * This enables everything that GNU can do. The macro is actually
 * recommended for new programs.
 */
#ifndef _GNU_SOURCE
#define _GNU_SOURCE
#endif

/*
 * Make sure we use the thread safe version of the library.
 */
#ifndef _THREAD_SAFE // Seems to be defined by some Drizzle header
#define _THREAD_SAFE
#endif

/*
 * This causes things to be defined like stuff in inttypes.h
 * which is used in printf()
 */
#ifndef __STDC_FORMAT_MACROS
#define __STDC_FORMAT_MACROS
#endif

/*
 * What operating system are we on?
 */
#ifdef __APPLE__
#define OS_MACINTOSH
#endif

#if defined(MSDOS) || defined(__WIN__) || defined(_WIN64) || defined(WIN32)
#define OS_WINDOWS
#endif

#ifdef __FreeBSD__
#define OS_FREEBSD
#endif

#ifdef __NetBSD__
#define OS_NETBSD
#endif

#ifdef __sun
#define OS_SOLARIS
#endif

#if defined(_DEBUG) || defined(DBUG_ON)
#if !defined(NODEBUG) && !defined(DBUG_OFF) && !defined(DEBUG)
#define DEBUG
#endif
#endif

#endif
