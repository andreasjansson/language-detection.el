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
 * 2007-05-21
 *
 * CORE SYSTEM:
 * Simple utility functions.
 *
 */

#pragma once
#ifndef __CSUTIL_H__
#define __CSUTIL_H__

#include "CSDefs.h"

const char	*cs_version();

void		cs_strcpy(size_t size, char *d, const char *s, size_t len);
void		cs_strcpy(size_t size, char *d, const char *s);
void		cs_strcpy_dottt(size_t size, char *d, const char *s, size_t len);
void		cs_strcpy_left(size_t size, char *d, const char *s, char ch);
void		cs_strcpy_right(size_t size, char *d, const char *s, char ch);
void		cs_strcat(size_t size, char *d, const char *s);
void		cs_strcat_left(size_t size, char *d, const char *s, char ch);
void		cs_strcat_right(size_t size, char *d, const char *s, char ch);
void		cs_strcat(size_t size, char *d, char ch);
void		cs_strcat(char **to, const char *to_cat);
void		cs_strcat(size_t size, char *to, int i);
void		cs_strcat(size_t size, char *to, uint32_t i);
void		cs_strcat(size_t size, char *to, uint64_t i);
void		cs_strcat_hex(size_t size, char *to, uint64_t i);
void		cs_format_context(size_t size, char *buffer, const char *func, const char *file, int line);
int			cs_path_depth(const char *path);
bool		cs_fixed_pattern(const char *path);
bool		cs_match_patern(const char *pattern, const char *str, bool ignore_case);
char		*cs_last_name_of_path(const char *path, int count);
char		*cs_last_name_of_path(const char *path);
char		*cs_last_directory_of_path(const char *path);
const char	*cs_find_extension(const char *file_name);
void		cs_remove_extension(char *file_name);
bool		cs_is_extension(const char *file_name, const char *ext);
bool		cs_remove_dir_char(char *dir_name);
void		cs_remove_last_name_of_path(char *path);
bool		cs_add_dir_char(size_t max, char *path);
bool		cs_is_absolute(const char *path);
void		cs_add_name_to_path(size_t max, char *path, const char *name);
const char	*cs_next_name_of_path(const char *path);
void		cs_adjust_path(size_t max, char *path, const char *rel_path);
char		*cs_strdup(const char *in_str);
char		*cs_strdup(int value);
char		*cs_strdup(const char *in_str, size_t len);
bool		cs_starts_with(const char *cstr, const char *w_cstr);
bool		cs_ends_with(const char *cstr, const char *w_cstr);
void		cs_make_absolute_path(size_t max, char *path, const char *rel_path, const char *cwd);
void		cs_replace_string(size_t size, char *into, const char *find_str, const char *str);
void		cs_replace_string(size_t size, char *into, const char ch, const char *str);
int64_t		cs_str_to_int8(const char *ptr, bool *overflow);
int64_t		cs_byte_size_to_int8(const char *ptr, bool *invalid = NULL);
uint64_t	cs_str_to_word8(const char *ptr, bool *overflow = NULL);
size_t		cs_hex_to_bin(size_t size, void *bin, const char *hex);
size_t		cs_hex_to_bin(size_t size, void *bin, size_t len, const char *hex);
// NOTE: cs_bin_to_hex() Always null terminates the result.
void		cs_bin_to_hex(size_t size, char *hex, size_t len, const void *bin);
void		cs_strToUpper(char *ptr);
void		cs_strToLower(char *ptr);

const char *cs_version();
bool		cs_str_to_value(const char *ptr, uint32_t *value, uint8_t base);
#endif
