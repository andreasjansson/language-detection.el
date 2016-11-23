#!/bin/sh

# Tell the binary tree library to not run its tests.
DISABLE_TESTS=true
. binary_tree.sh

# Create a new binary tree and obtain its name.
newTree
TESTTREE="$(getLastNodeName)"

# Insert three nodes into the tree
# with keys 1, 3, and 7.
insertKeyNumeric "$TESTTREE" 3
insertKeyNumeric "$TESTTREE" 7
insertKeyNumeric "$TESTTREE" 1

# Add an attribute to the last node inserted (1)
ONENODE="$(getLastNodeName)"
setTreeField "$ONENODE" "MyFieldName" "42"

# Takes a node and prints the key value and
# the value of MyFieldName
echokeyandmyfieldname()
{
    echo "$(treeKey "$1") -> $(treeField "$1" "MyFieldName")"
}

# Iterate the tree in key order and call
# echokeyandmyfieldname on each node
iterateTree "$TESTTREE" "echokeyandmyfieldname"

