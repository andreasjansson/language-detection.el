#!/bin/sh

# Print the four characters prior to "est" if the string matches, else 0.

STRING="This is a test"
expr "$STRING" : '.*\(....\)est'

# Note the single quotes around the basic regular expression to avoid
# the shell unquoting the parentheses.

