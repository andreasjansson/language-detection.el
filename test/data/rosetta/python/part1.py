import re
# Make sure we have at least 3 vowels somwhere
g1 = re.compile('(.*[aeiou].*){3,}') 
# Make sure there are double eltters somewhere
g2 = re.compile("([a-z])\\1") # Has double letter
# Can't have any of these.
b = re.compile("ab|cd|pq|xy")
with open('input.txt') as f:
    # Count up the number of lines that match all of our criteria.
    print len([ l for l in f 
              if (not b.search(l)) and g1.search(l) and g2.search(l) ])
