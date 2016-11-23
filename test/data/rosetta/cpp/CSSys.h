/* Copyright (C) 2010 PrimeBase Technologies GmbH, Germany
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
 * Author: Barry Leslie
 *
 * 2010-02-05
 *
 * CORE SYSTEM:
 * Basic system specific file I/O classes.
 * The classes in this header are defined in CSSys_unix.cc and  CSSys_win.cc
 *
 */

#pragma once
#ifndef __CSSYSFILE_H__
#define __CSSYSFILE_H__

#ifdef OS_WINDOWS
#define INVALID_DIR_HANDLE (INVALID_HANDLE_VALUE)
#define INVALID_FILE_HANDLE (INVALID_HANDLE_VALUE)
#else
#include <dirent.h>
#define INVALID_DIR_HANDLE (NULL)
#define INVALID_FILE_HANDLE (-1)
#endif

#include "CSString.h"
#include "CSException.h"
#include "CSTime.h"

class CSSysDir {
public:
	CSSysDir(): 
		sd_path(NULL),
		sd_filter(NULL),
		sd_dir(INVALID_DIR_HANDLE){}
	
	~CSSysDir();
	
	void open();
	void close();
	bool next();

	bool entryIsFile();
	const char *entryName();
	void getEntryPath(char *path, size_t size);
	
	CSString *sd_path;
	
private:
	CSStringBuffer *sd_filter;
#ifdef OS_WINDOWS
	WIN32_FIND_DATAA sd_entry;
	HANDLE sd_dir;
#else
	struct dirent sd_entry;
	DIR *sd_dir;
#endif
};


class CSSysFile {
public:

	static bool isDirNotFound(CSException *e);
	static bool isFileNotFound(CSException *e);
	static bool isDirExists(CSException *e);

CSSysFile(): sf_path(NULL), sf_fh(INVALID_FILE_HANDLE){}

	~CSSysFile(){ sf_close();}
	
	bool fs_isOpen() { return ( sf_fh != INVALID_FILE_HANDLE);}
	
	void sf_open(const char *path, bool readonly, bool create);
	void sf_close();
	
	size_t sf_pread(void *data, size_t size, off64_t offset);
	void sf_pwrite(const void *data, size_t size, off64_t offset);
	
	off64_t sf_getEOF();
	void sf_setEOF(off64_t offset);
	
	void sf_sync();
	
	void sf_lock(bool shared);
	void sf_unlock();
	
private:
	CSString *sf_path;
#ifdef OS_WINDOWS
	HANDLE	sf_fh;
#else
	int		sf_fh;
#endif
	
};

class CSSys {
	public:
	static bool sys_exists(const char *path);
	static void sys_makeDir(const char *path);
	static void sys_removeDir(const char *path);
	static void sys_removeFile(const char *path);
	static void sys_rename(const char *old_path, const char *new_path);
	static void sys_stat(const char *path, bool *is_dir, off64_t *size, CSTime *mod_time);
	static bool sys_isLink(const char *path);
	static void sys_getcwd(char *path, size_t size);
	static void sys_setcwd(const char *path);
	static uint32_t sys_getpid();
	static bool sys_isAlive(uint32_t pid);
};

#endif
