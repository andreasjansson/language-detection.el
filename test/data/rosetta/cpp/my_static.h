/* Copyright (C) 2000 MySQL AB

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; version 2 of the License.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA */

/*
  Static variables for mysys library. All definied here for easy making of
  a shared library
*/

#pragma once

#include <signal.h>

#define MAX_SIGNALS	10		/* Max signals under a dont-allow */
#define MIN_KEYBLOCK	(min(IO_SIZE,1024))
#define MAX_KEYBLOCK	8192		/* Max keyblocklength == 8*IO_SIZE */
#define MAX_BLOCK_TYPES MAX_KEYBLOCK/MIN_KEYBLOCK

namespace drizzled
{
namespace internal
{

/*
  Structure that stores information of a allocated memory block
  The data is at &struct_adr+sizeof(ALIGN_SIZE(sizeof(struct irem)))
  The lspecialvalue is at the previous 4 bytes from this, which may not
  necessarily be in the struct if the struct size isn't aligned at a 8 byte
  boundary.
*/

class irem
{
public:
  irem *next;		/* Linked list of structures	   */
  irem *prev;		/* Other link			   */
  char *filename;		/* File in which memory was new'ed */
  uint32_t linenum;		/* Line number in above file	   */
  uint32_t datasize;		/* Size requested		   */
  uint32_t SpecialValue;		/* Underrun marker value	   */

  irem():
    next(NULL),
	prev(NULL),
	filename(0),
	linenum(0),
	datasize(0),
	SpecialValue(0)
  {}
};


extern char curr_dir[FN_REFLEN], home_dir_buff[FN_REFLEN];

extern volatile int _my_signals;

extern unsigned char	*sf_min_adress,*sf_max_adress;
extern uint	sf_malloc_count;
extern class irem *sf_malloc_root;

extern uint64_t query_performance_frequency, query_performance_offset;

extern sigset_t my_signals;		/* signals blocked by mf_brkhant */

} /* namespace internal */
} /* namespace drizzled */

