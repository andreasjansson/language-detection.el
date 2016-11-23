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
 * Barry Leslie
 *
 * 2008-12-30
 *
 * H&G2JCtL
 *
 * BLOB alias index.
 *
 */


#pragma once
#ifndef __ALIAS_MS_H__
#define __ALIAS_MS_H__
#include <stddef.h>

#include "defs_ms.h"
#include "cslib/CSStorage.h"

#define MS_ALIAS_FILE_MAGIC			0x5954228A
#define MS_ALIAS_FILE_VERSION		1
#define BLOB_ALIAS_LENGTH			1024
#define INVALID_ALIAS_HASH			((uint32_t)-1)

#ifdef HAVE_ALIAS_SUPPORT
class MSOpenTable;
class MSDatabase;
class CSHTTPOutputStream;
class MSMetaDataTable;

#define ACTIVE_ALIAS_INDEX "ms_blob_alias.idx"

#define NUM_RECORDS_PER_BUCKET	254		// 254 = bucket size of 4 K
#define BUCKET_LIST_SIZE		1024		

typedef struct MSAliasHead {
	CSDiskValue4			ah_magic_4;							/* Table magic number. */
	CSDiskValue2			ah_version_2;						/* The header version. */
	CSDiskValue2			ah_head_size_2;						/* The size of the header. */
	CSDiskValue8			ah_file_size_8;						/* The size of the file. */	
	
	CSDiskValue8			ah_free_list_8;						/* The offset of the first bucket in the free list. */
	
	CSDiskValue2			ah_num_buckets_2;					/* The number of bucket chains in the index. (BUCKET_LIST_SIZE when created)*/	
	CSDiskValue4			ah_bucket_size_4;					/* The size of each bucket. (NUM_RECORDS_PER_BUCKET when created)*/

} MSAliasHeadRec, *MSAliasHeadPtr;

/*
 * When a record is freed  ba_repo_id_4 is set to zero 
*/
typedef struct MSDiskAliasRec {
	CSDiskValue4			ar_repo_id_4;						/* File ID. Not zero when allocated. */
	CSDiskValue8			ar_offset_8;						/* Offset into the file of the BLOB. */
	CSDiskValue4			ar_hash_4;							/* The hash value of the alias string. (Is assumed to be at the end of the structure.*/
} MSDiskAliasRec, *MSDiskAliasPtr;

typedef struct MSADiskBucketHead {
	CSDiskValue8			ab_prev_bucket_8;					/* The file offset of the previouse bucket in the chain. */
	CSDiskValue8			ab_next_bucket_8;					/* The file offset of the next bucket in the chain. */
	CSDiskValue4			ab_num_recs_4;						/* The number of used record in the bucket. */
	CSDiskValue4			ab_eor_rec_4;						/* (End Of Records) The position of the first free record after all the records in the bucket. */
} MSADiskBucketHeadRec, *MSADiskBucketHeadPtr;

typedef struct MSADiskBucket {
	MSADiskBucketHeadRec	ab_heaher;
	MSDiskAliasRec			ab_records[NUM_RECORDS_PER_BUCKET];	/* The start of the records in the bucket. */
} MSADiskBucketRec, *MSADiskBucketPtr;

/*
 * MSABucketInfo stores bucket information in RAM.
 */
class MSABucketInfo: public CSOrderKey  {
public:

	MSABucketInfo(uint64_t offset, uint32_t num, uint32_t end_of_records): 
		bi_bucket_offset(offset),
		bi_records_offset(offset + offsetof(MSADiskBucketRec, ab_records)),
		bi_num_recs(num),
		bi_end_of_records(end_of_records),
		bi_NextLink(NULL),
		bi_PrevLink(NULL)
		{}
		
	uint64_t			bi_bucket_offset;	/* The file offset of the bucket. */

	uint64_t			bi_records_offset;	/* The file offset of the first record in the bucket. */
	
	// Required method for item in a CSLinkedList.
	virtual MSABucketInfo *getNextLink() { return bi_NextLink; }
	virtual MSABucketInfo *getPrevLink() { return bi_PrevLink; }
	virtual void setNextLink(CSObject *link) { bi_NextLink = (MSABucketInfo*)link; }
	virtual void setPrevLink(CSObject *link) { bi_PrevLink = (MSABucketInfo*)link; }

	virtual CSObject *getKey() { return this;}
	virtual int compareKey(CSOrderKey *x) {
		MSABucketInfo	*key = (MSABucketInfo *) x;
		
		if (bi_bucket_offset != key->bi_bucket_offset)
			return 0;
		
		return (bi_bucket_offset < key->bi_bucket_offset)? -1: 1;
	}
	
	static MSABucketInfo *newMSABucketInfo(uint64_t offset, uint32_t num = 0, uint32_t last = 0);

	uint32_t			getSize() { return bi_num_recs;}
	uint32_t			getEndOfRecords() { return bi_end_of_records;}
	void			recAdded(CSFile *iFile, uint32_t idx);
	void			recRemoved(CSFile *iFile, uint32_t idx, MSDiskAliasRec bucket[]);
	
private:
	// (bi_end_of_records -1) is the index of the last valid record in the bucket.
	// free records can actually appear any where in the bucket unless it has
	// just been compressed.
	uint32_t			bi_num_recs;		/* The number of records in the bucket. */
	uint32_t			bi_end_of_records;	/* The index of the start of the free records in the bucket. */

	MSABucketInfo	*bi_NextLink;
	MSABucketInfo	*bi_PrevLink;
};

class MSABucketLinkedList: public CSLinkedList {
public:

	/* Value is returned referenced. */
	MSABucketInfo *removeBack() { return (MSABucketInfo*) CSLinkedList::removeBack();}

	/* Value is returned NOT referenced. */
	MSABucketInfo *getBack(){ return (MSABucketInfo*) CSLinkedList::getBack();}

	/* Value is returned NOT referenced. */
	MSABucketInfo *getFront(){ return (MSABucketInfo*) CSLinkedList::getFront();}

	/* Value is returned referenced. */
	MSABucketInfo *removeFront(){ return (MSABucketInfo*) CSLinkedList::removeFront();}
};

typedef struct MSAliasRec {
	uint32_t			repo_id;	
	uint64_t			repo_offset;
	uint32_t			alias_hash;
} MSAliasRec, *MSAliasPtr;

class MSAliasFile : public CSPooled, public CSRefObject {
public:
	class MSAliasFileShare *ba_share;
	bool			ba_isFileInUse;
	MSAliasFile		*ba_nextFile;									/* Next file available in the pool */

	MSAliasFile(MSAliasFileShare *share);
	virtual ~MSAliasFile();

	// Required method for CSPool item.
	virtual void returnToPool();

	
	// Required method for item in a CSLinkedList.
	virtual CSObject *getNextLink() { return ba_NextLink; }
	virtual CSObject *getPrevLink() { return ba_PrevLink; }
	virtual void setNextLink(CSObject *link) { ba_NextLink = link; }
	virtual void setPrevLink(CSObject *link) { ba_PrevLink = link; }

	// Index file operations.
	MSDiskAliasPtr	findRec(uint32_t hash);
	MSDiskAliasPtr	nextRec();
	void			addRec(MSDiskAliasPtr rec); 
	void			deleteCurrentRec();
	void			updateCurrentRec(MSDiskAliasPtr rec);
	bool			findRec(MSDiskAliasPtr rec);
	
	/* When a load is inprogress locks are not required and writes are batched. */
	void			startLoad();
	void			finishLoad();


private:
	bool			nextBucket(bool with_space);
		
	bool	scanBucket() 
			{
				while (iCurrentRec) {
					iCurrentRec--;
					if ( CS_EQ_DISK_4(iDiskHash_4, iBucket[iCurrentRec].ar_hash_4)
						&& !CS_IS_NULL_DISK_4(iBucket[iCurrentRec].ar_repo_id_4))
						return true;
				}
				return false;
			}
			
	CSFile				*iFile;			// The index file.
	
	bool				iLoading;
	MSADiskBucketRec	*iBucketCache; // The bucket cache is used during index loading in single thread mode.
	MSDiskAliasRec		iBucket[NUM_RECORDS_PER_BUCKET];// The current bucket loaded from disk.
	MSABucketLinkedList	*iBucketChain;	// The bucket list for the current hash value.
	MSABucketInfo		*iStartBucket;	// The file offset of the bucket the search started at.
	MSABucketInfo		*iCurrentBucket;// The currnet bucket, NULL if no bucket is loaded.
	
	CSDiskValue4		iDiskHash_4;	// The current hash value we are looking for in disk byte order.
	uint32_t				iCurrentRec;	// The current record position in the current bucket.
	
	CSObject			*ba_NextLink;
	CSObject			*ba_PrevLink;

};

//===========================================
class MSAliasFileShare: public CSObject  {
public:
	MSAliasFileShare(CSPath *path):
		msa_filePath(path),
		msa_fileSize(0),
		msa_pool(NULL),
		msa_closing(false)
		{
			bool isdir = false;
			if (path->exists(&isdir))
				msa_fileSize = path->getSize();
		}
		
	~MSAliasFileShare()
	{
		msa_poolFiles.clear();
		if (msa_filePath)
			msa_filePath->release();
			
		for (uint32_t i =0; i < BUCKET_LIST_SIZE; i++)
			msa_buckets[i].clear();
			
		msa_empty_buckets.clear();
	}
	
	void close() { msa_poolFiles.clear();}
	
	MSABucketLinkedList *getBucketChain(uint32_t hash) { return msa_buckets + (hash % BUCKET_LIST_SIZE); }
	MSAliasFile		*getPoolFile();
	
	CSLinkedList	msa_poolFiles;		/* A list of all files in this pool */
	uint64_t			msa_fileSize;
	CSPath			*msa_filePath;
	CSLock			msa_writeLock;	
	MSAliasFile		*msa_pool;			/* A list of files currently not in use. */
	
	CSLock			msa_poolLock;	
	bool			msa_closing;
	MSABucketLinkedList	msa_empty_buckets;		/* A list of unused buckets. */
	
	MSABucketLinkedList	msa_buckets[BUCKET_LIST_SIZE];	/* An array of bucket chains. */
};

//===========================================
class MSSysMeta : public CSRefObject, public CSPooled {
public:
	class MSAlias	*md_myMSAlias;
	bool			md_isFileInUse;
	MSSysMeta		*md_nextFile;									/* Next file available in the pool */

	MSSysMeta(MSAlias *msa);
	virtual ~MSSysMeta();

	virtual void returnToPool();

	virtual CSObject *getNextLink() { return md_NextLink; }
	virtual CSObject *getPrevLink() { return md_PrevLink; }
	virtual void setNextLink(CSObject *link) { md_NextLink = link; }
	virtual void setPrevLink(CSObject *link) { md_PrevLink = link; }

	bool matchAlias(uint32_t repo_id, uint64_t repo_offset, const char *alias);

private:
	MSMetaDataTable	*mtab;
	CSObject		*md_NextLink;
	CSObject		*md_PrevLink;

};

//===========================================
class MSAlias  : public CSSharedRefObject  {
public:

	MSAlias(MSDatabase *db_noref);
	~MSAlias();

	void ma_open(const char *file_name = ACTIVE_ALIAS_INDEX);
	void ma_close();
	void ma_delete() {iDelete = true;}

	uint32_t addAlias(uint32_t repo_id, uint64_t repo_offset, const char *alias);
private:
	void addAlias(MSAliasFile *af, MSAliasRec *rec);
public:
	void deleteAlias(MSDiskAliasPtr diskRec);
	void deleteAlias(uint32_t repo_id, uint64_t repo_offset, uint32_t alias_hash);
	void resetAlias(uint32_t old_repo_id, uint64_t old_repo_offset, uint32_t alias_hash, uint32_t new_repo_id, uint64_t new_repo_offset);

	bool findBlobByAlias(const char *alias, bool *referenced, uint32_t *repo_id = NULL, uint64_t *repo_offset = NULL);
	bool blobAliasExists(uint32_t repo_id, uint64_t repo_offset, uint32_t alias_hash);
private:
	bool findBlobByAlias(MSAliasFile *af, const char *alias, bool *referenced, uint32_t *repo_id = NULL, uint64_t *repo_offset = NULL);
public:
	static uint32_t	hashAlias(const char *ptr);
	
	void MSAliasBuild();
	
	friend class MSAliasFile;
	friend class MSSysMeta;

private:
	MSDatabase		*iDatabase_br; // This is a back reference so this reference is not counted. 
	CSPath			*iFilePath;
	
	bool			iClosing;
	bool			iDelete;			// true when the alias index file should be deleted.
	
	MSAliasFileShare *iFileShare;	// File information shared between all files in the pool.
	
	CSLock			iSysTablePoolLock;
	MSSysMeta		*iSysTablePool;									/* A list of files currently not in use. */
	CSLinkedList	iPoolSysTables;									/* A list of all files in this pool */
	
	MSAliasFile *getAliasFile() { return iFileShare->getPoolFile();}
	void		buildAliasIndex();
	void		MSAliasCompress(CSFile *fa, CSSortedList *freeList, MSABucketLinkedList *bucketChain);
	void		MSAliasLoad();
	bool		hasBlobAlias(uint32_t repo_id, uint64_t repo_offset, const char *alias, bool *referenced);
};


#endif //HAVE_ALIAS_SUPPORT

#endif // __ALIAS_MS_H__
