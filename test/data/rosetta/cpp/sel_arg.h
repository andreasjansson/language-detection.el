/* -*- mode: c++; c-basic-offset: 2; indent-tabs-mode: nil; -*-
 *  vim:expandtab:shiftwidth=2:tabstop=2:smarttab:
 *
 *  Copyright (C) 2008-2009 Sun Microsystems, Inc.
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

namespace drizzled {
namespace optimizer {

class RangeParameter;

/*
  A construction block of the SEL_ARG-graph.

  The following description only covers graphs of SEL_ARG objects with
  sel_arg->type==KEY_RANGE:

  One SEL_ARG object represents an "elementary interval" in form

      min_value <=?  table.keypartX  <=? max_value

  The interval is a non-empty interval of any kind: with[out] minimum/maximum
  bound, [half]open/closed, single-point interval, etc.

  1. SEL_ARG GRAPH STRUCTURE

  SEL_ARG objects are linked together in a graph. The meaning of the graph
  is better demostrated by an example:

     tree->keys[i]
      |
      |             $              $
      |    part=1   $     part=2   $    part=3
      |             $              $
      |  +-------+  $   +-------+  $   +--------+
      |  | kp1<1 |--$-->| kp2=5 |--$-->| kp3=10 |
      |  +-------+  $   +-------+  $   +--------+
      |      |      $              $       |
      |      |      $              $   +--------+
      |      |      $              $   | kp3=12 |
      |      |      $              $   +--------+
      |  +-------+  $              $
      \->| kp1=2 |--$--------------$-+
         +-------+  $              $ |   +--------+
             |      $              $  ==>| kp3=11 |
         +-------+  $              $ |   +--------+
         | kp1=3 |--$--------------$-+       |
         +-------+  $              $     +--------+
             |      $              $     | kp3=14 |
            ...     $              $     +--------+

  The entire graph is partitioned into "interval lists".

  An interval list is a sequence of ordered disjoint intervals over the same
  key part. SEL_ARG are linked via "next" and "prev" pointers. Additionally,
  all intervals in the list form an RB-tree, linked via left/right/parent
  pointers. The RB-tree root SEL_ARG object will be further called "root of the
  interval list".

    In the example pic, there are 4 interval lists:
    "kp<1 OR kp1=2 OR kp1=3", "kp2=5", "kp3=10 OR kp3=12", "kp3=11 OR kp3=13".
    The vertical lines represent SEL_ARG::next/prev pointers.

  In an interval list, each member X may have SEL_ARG::next_key_part pointer
  pointing to the root of another interval list Y. The pointed interval list
  must cover a key part with greater number (i.e. Y->part > X->part).

    In the example pic, the next_key_part pointers are represented by
    horisontal lines.

  2. SEL_ARG GRAPH SEMANTICS

  It represents a condition in a special form (we don't have a name for it ATM)
  The SEL_ARG::next/prev is "OR", and next_key_part is "AND".

  For example, the picture represents the condition in form:
   (kp1 < 1 AND kp2=5 AND (kp3=10 OR kp3=12)) OR
   (kp1=2 AND (kp3=11 OR kp3=14)) OR
   (kp1=3 AND (kp3=11 OR kp3=14))


  3. SEL_ARG GRAPH USE

  Use get_mm_tree() to construct SEL_ARG graph from WHERE condition.
  Then walk the SEL_ARG graph and get a list of dijsoint ordered key
  intervals (i.e. intervals in form

   (constA1, .., const1_K) < (keypart1,.., keypartK) < (constB1, .., constB_K)

  Those intervals can be used to access the index. The uses are in:
   - check_quick_select() - Walk the SEL_ARG graph and find an estimate of
                            how many table records are contained within all
                            intervals.
   - get_quick_select()   - Walk the SEL_ARG, materialize the key intervals,
                            and create QuickRangeSelect object that will
                            read records within these intervals.

  4. SPACE COMPLEXITY NOTES

    SEL_ARG graph is a representation of an ordered disjoint sequence of
    intervals over the ordered set of index tuple values.

    For multi-part keys, one can construct a WHERE expression such that its
    list of intervals will be of combinatorial size. Here is an example:

      (keypart1 IN (1,2, ..., n1)) AND
      (keypart2 IN (1,2, ..., n2)) AND
      (keypart3 IN (1,2, ..., n3))

    For this WHERE clause the list of intervals will have n1*n2*n3 intervals
    of form

      (keypart1, keypart2, keypart3) = (k1, k2, k3), where 1 <= k{i} <= n{i}

    SEL_ARG graph structure aims to reduce the amount of required space by
    "sharing" the elementary intervals when possible (the pic at the
    beginning of this comment has examples of such sharing). The sharing may
    prevent combinatorial blowup:

      There are WHERE clauses that have combinatorial-size interval lists but
      will be represented by a compact SEL_ARG graph.
      Example:
        (keypartN IN (1,2, ..., n1)) AND
        ...
        (keypart2 IN (1,2, ..., n2)) AND
        (keypart1 IN (1,2, ..., n3))

    but not in all cases:

    - There are WHERE clauses that do have a compact SEL_ARG-graph
      representation but get_mm_tree() and its callees will construct a
      graph of combinatorial size.
      Example:
        (keypart1 IN (1,2, ..., n1)) AND
        (keypart2 IN (1,2, ..., n2)) AND
        ...
        (keypartN IN (1,2, ..., n3))

    - There are WHERE clauses for which the minimal possible SEL_ARG graph
      representation will have combinatorial size.
      Example:
        By induction: Let's take any interval on some keypart in the middle:

           kp15=c0

        Then let's AND it with this interval 'structure' from preceding and
        following keyparts:

          (kp14=c1 AND kp16=c3) OR keypart14=c2) (*)

        We will obtain this SEL_ARG graph:

             kp14     $      kp15      $      kp16
                      $                $
         +---------+  $   +---------+  $   +---------+
         | kp14=c1 |--$-->| kp15=c0 |--$-->| kp16=c3 |
         +---------+  $   +---------+  $   +---------+
              |       $                $
         +---------+  $   +---------+  $
         | kp14=c2 |--$-->| kp15=c0 |  $
         +---------+  $   +---------+  $
                      $                $

       Note that we had to duplicate "kp15=c0" and there was no way to avoid
       that.
       The induction step: AND the obtained expression with another "wrapping"
       expression like (*).
       When the process ends because of the limit on max. number of keyparts
       we'll have:

         WHERE clause length  is O(3*#max_keyparts)
         SEL_ARG graph size   is O(2^(#max_keyparts/2))

       (it is also possible to construct a case where instead of 2 in 2^n we
        have a bigger constant, e.g. 4, and get a graph with 4^(31/2)= 2^31
        nodes)

    We avoid consuming too much memory by setting a limit on the number of
    SEL_ARG object we can construct during one range analysis invocation.
*/

class SEL_ARG :public memory::SqlAlloc
{
public:
  uint8_t min_flag,max_flag,maybe_flag;
  uint8_t part;					// Which key part
  uint8_t maybe_null;
  /*
    Number of children of this element in the RB-tree, plus 1 for this
    element itself.
  */
  uint16_t elements;
  /*
    Valid only for elements which are RB-tree roots: Number of times this
    RB-tree is referred to (it is referred by SEL_ARG::next_key_part or by
    SEL_TREE::keys[i] or by a temporary SEL_ARG* variable)
  */
  ulong use_count;

  Field *field;
  unsigned char *min_value,*max_value;			// Pointer to range

  /*
    eq_tree() requires that left == right == 0 if the type is MAYBE_KEY.
   */
  SEL_ARG *left,*right;   /* R-B tree children */
  SEL_ARG *next,*prev;    /* Links for bi-directional interval list */
  SEL_ARG *parent;        /* R-B tree parent */
  SEL_ARG *next_key_part;
  enum leaf_color { BLACK,RED } color;
  enum Type { IMPOSSIBLE, MAYBE, MAYBE_KEY, KEY_RANGE } type;

  enum 
  { 
    MAX_SEL_ARGS = 16000 
  };

  SEL_ARG() {}

  SEL_ARG(SEL_ARG &);

  SEL_ARG(Field *,const unsigned char *, const unsigned char *);

  SEL_ARG(Field *field, 
          uint8_t part, 
          unsigned char *min_value, 
          unsigned char *max_value,
	        uint8_t min_flag, 
          uint8_t max_flag, 
          uint8_t maybe_flag);

  SEL_ARG(enum Type type_arg)
    :
      min_flag(0),
      elements(1),
      use_count(1),
      left(0),
      right(0),
      next_key_part(0),
      color(BLACK), 
      type(type_arg)
  {}

  int size() const
  {
    return elements;
  }

  inline bool is_same(SEL_ARG *arg)
  {
    if (type != arg->type || part != arg->part)
      return 0;
    if (type != KEY_RANGE)
      return 1;
    return (cmp_min_to_min(arg) == 0 && cmp_max_to_max(arg) == 0);
  }

  inline void merge_flags(SEL_ARG *arg) 
  { 
    maybe_flag|= arg->maybe_flag; 
  }

  inline void maybe_smaller() 
  { 
    maybe_flag= 1; 
  }

  /* Return true iff it's a single-point null interval */
  inline bool is_null_interval() 
  { 
    return (maybe_null && max_value[0] == 1);
  }

  inline int cmp_min_to_min(SEL_ARG *arg)
  {
    return sel_cmp(field,min_value, arg->min_value, min_flag, arg->min_flag);
  }

  inline int cmp_min_to_max(SEL_ARG *arg)
  {
    return sel_cmp(field,min_value, arg->max_value, min_flag, arg->max_flag);
  }

  inline int cmp_max_to_max(SEL_ARG *arg)
  {
    return sel_cmp(field,max_value, arg->max_value, max_flag, arg->max_flag);
  }

  inline int cmp_max_to_min(SEL_ARG *arg)
  {
    return sel_cmp(field,max_value, arg->min_value, max_flag, arg->min_flag);
  }

  SEL_ARG *clone_and(SEL_ARG *arg);

  SEL_ARG *clone_first(SEL_ARG *arg);

  SEL_ARG *clone_last(SEL_ARG *arg);

  SEL_ARG *clone(RangeParameter *param, SEL_ARG *new_parent, SEL_ARG **next);

  bool copy_min(SEL_ARG *arg);

  bool copy_max(SEL_ARG *arg);

  void copy_min_to_min(SEL_ARG *arg);

  void copy_min_to_max(SEL_ARG *arg);

  void copy_max_to_min(SEL_ARG *arg);

  /* returns a number of keypart values (0 or 1) appended to the key buffer */
  int store_min(uint32_t length, unsigned char **min_key, uint32_t min_key_flag);

  /* returns a number of keypart values (0 or 1) appended to the key buffer */
  int store_max(uint32_t length, unsigned char **max_key, uint32_t max_key_flag);

  /* returns a number of keypart values appended to the key buffer */
  int store_min_key(KEY_PART *key, unsigned char **range_key, uint32_t *range_key_flag);

  /* returns a number of keypart values appended to the key buffer */
  int store_max_key(KEY_PART *key, unsigned char **range_key, uint32_t *range_key_flag);

  SEL_ARG *insert(SEL_ARG *key);
  SEL_ARG *tree_delete(SEL_ARG *key);
  SEL_ARG *find_range(SEL_ARG *key);
  SEL_ARG *rb_insert(SEL_ARG *leaf);

  friend SEL_ARG *rb_delete_fixup(SEL_ARG *root,SEL_ARG *key, SEL_ARG *par);

  SEL_ARG *first();

  SEL_ARG *last();

  void make_root();

  inline bool simple_key()
  {
    return (! next_key_part && elements == 1);
  }

  void increment_use_count(long count)
  {
    if (next_key_part)
    {
      next_key_part->use_count+= count;
      count*= (next_key_part->use_count - count);
      for (SEL_ARG *pos= next_key_part->first(); pos; pos= pos->next)
        if (pos->next_key_part)
          pos->increment_use_count(count);
    }
  }

  void free_tree()
  {
    for (SEL_ARG *pos= first(); pos; pos= pos->next)
      if (pos->next_key_part)
      {
        pos->next_key_part->use_count--;
        pos->next_key_part->free_tree();
      }
  }

  inline SEL_ARG **parent_ptr()
  {
    return parent->left == this ? &parent->left : &parent->right;
  }


  /*
    Check if this SEL_ARG object represents a single-point interval

    SYNOPSIS
      is_singlepoint()

    DESCRIPTION
      Check if this SEL_ARG object (not tree) represents a single-point
      interval, i.e. if it represents a "keypart = const" or
      "keypart IS NULL".

    RETURN
      true   This SEL_ARG object represents a singlepoint interval
      false  Otherwise
  */

  bool is_singlepoint()
  {
    /*
      Check for NEAR_MIN ("strictly less") and NO_MIN_RANGE (-inf < field)
      flags, and the same for right edge.
    */
    if (min_flag || max_flag)
      return false;
    unsigned char *min_val= min_value;
    unsigned char *max_val= max_value;

    if (maybe_null)
    {
      /* First byte is a NULL value indicator */
      if (*min_val != *max_val)
        return false;

      if (*min_val)
        return true; /* This "x IS NULL" */
      min_val++;
      max_val++;
    }
    return ! field->key_cmp(min_val, max_val);
  }

  SEL_ARG *clone_tree(RangeParameter *param);

private:

  /*
     Check if a compare is ok, when one takes ranges in account
     Returns -2 or 2 if the ranges where 'joined' like  < 2 and >= 2
   */
  int sel_cmp(Field *in_field, 
              unsigned char *a, 
              unsigned char *b, 
              uint8_t a_flag,
              uint8_t b_flag)
  {
    int cmp= 0;
    /* First check if there was a compare to a min or max element */
    if (a_flag & (NO_MIN_RANGE | NO_MAX_RANGE))
    {
      if ((a_flag & (NO_MIN_RANGE | NO_MAX_RANGE)) ==
          (b_flag & (NO_MIN_RANGE | NO_MAX_RANGE)))
        return 0;
      return (a_flag & NO_MIN_RANGE) ? -1 : 1;
    }
    if (b_flag & (NO_MIN_RANGE | NO_MAX_RANGE))
      return (b_flag & NO_MIN_RANGE) ? 1 : -1;

    if (in_field->real_maybe_null())			// If null is part of key
    {
      if (*a != *b)
      {
        return *a ? -1 : 1;
      }
      if (*a)
        goto end;					// NULL where equal
      a++; b++;					// Skip NULL marker
    }
    cmp= in_field->key_cmp(a , b);
    if (cmp) return cmp < 0 ? -1 : 1;		// The values differed

    // Check if the compared equal arguments was defined with open/closed range
end:
    if (a_flag & (NEAR_MIN | NEAR_MAX))
    {
      if ((a_flag & (NEAR_MIN | NEAR_MAX)) == (b_flag & (NEAR_MIN | NEAR_MAX)))
        return 0;
      if (! (b_flag & (NEAR_MIN | NEAR_MAX)))
        return (a_flag & NEAR_MIN) ? 2 : -2;
      return (a_flag & NEAR_MIN) ? 1 : -1;
    }
    if (b_flag & (NEAR_MIN | NEAR_MAX))
      return (b_flag & NEAR_MIN) ? -2 : 2;
    return 0;					// The elements where equal
  }

  
};

SEL_ARG *rb_delete_fixup(SEL_ARG *root,
                         SEL_ARG *key,
                         SEL_ARG *par);

extern SEL_ARG null_element;

} /* namespace optimizer */

} /* namespace drizzled */

