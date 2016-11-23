/* *** This file was borrowed from jam 2.5. The copyright statement from
 * *** jam.c appears below.
 */
/*
 * /+\
 * +\	Copyright 1993-2002 Christopher Seiwald and Perforce Software, Inc.
 * \+/
 *
 * This file is part of jam.
 *
 * License is hereby granted to use this software and distribute it
 * freely, as long as this copyright notice is retained and modifications 
 * are clearly marked.
 *
 * ALL WARRANTIES ARE HEREBY DISCLAIMED.
 */

/*
 * Copyright 1993-2002 Christopher Seiwald and Perforce Software, Inc.
 *
 * This file is part of Jam - see jam.c for Copyright information.
 */

/*
 * filesys.h - OS specific file routines 
 *
 * 11/04/02 (seiwald) - const-ing for string literals
 */

typedef void (*scanback)( void *closure, const char *file, int found, time_t t );

void file_dirscan( const char *dir, scanback func, void *closure );
void file_archscan( const char *arch, scanback func, void *closure );

int file_time( const char *filename, time_t *time );
