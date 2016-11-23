from itertools import combinations
from collections import Counter
containers = [50, 44, 11, 49, 42, 46, 18, 32, 26, 40, 21, 7, 18, 43, 10, 47, 36, 24, 22, 40]
counter =  Counter(len(c) for i in xrange(len(containers))
                   for c in combinations(containers, i) if sum(c) == 150)
print sorted(counter.items(), key=lambda x: x[0])[0][1]
