#!/bin/sh

function1()
{
    LOOP=0
    STR=""
    while [ $LOOP -lt 1000 ] ; do
	echo "This is a test." | sed 's/a/burnt/g' | sed 's/e/oa/g' > /dev/null

	LOOP=$((LOOP + 1))
    done
}
function2()
{
    LOOP=0
    STR=""
    while [ $LOOP -lt 1000 ] ; do
	echo "This is a test." | sed -e 's/a/burnt/g' -e 's/e/oa/g' > /dev/null

	LOOP=$((LOOP + 1))
    done
}
function3()
{
    LOOP=0
    STR=""
    while [ $LOOP -lt 1000 ] ; do
	STR="$STR""This is a test.
"

	LOOP=$((LOOP + 1))
    done
    echo "$STR" | sed 's/a/burnt/g' | sed 's/e/oa/g' > /dev/null
}
function4()
{
    LOOP=0
    STR=""
    while [ $LOOP -lt 1000 ] ; do
	STR="$STR""This is a test.
"

	LOOP=$((LOOP + 1))
    done
    echo "$STR" | sed -e 's/a/burnt/g' -e 's/e/oa/g' > /dev/null
}

time function1
time function2
time function3
time function4

