#!/bin/sh

COUNTER=0
VALUE="-1"
echo "Enter a series of lines of numbers separated by spaces."

read LIST
IFS=" "
for VALUE in $LIST ; do
	eval ARRAY_$COUNTER=$VALUE
	eval export ARRAY_$COUNTER
	COUNTER=$(expr $COUNTER '+' 1) # More on this in Paint by Numbers
done

# print the exported variables.
COUNTERB=0;

echo "Printing values."
while [ $COUNTERB -lt $COUNTER ] ; do
	echo "ARRAY[$COUNTERB] = $(eval echo '$'ARRAY_$COUNTERB)"
	COUNTERB=$(expr $COUNTERB '+' 1) # More on this in Paint by Numbers
done
