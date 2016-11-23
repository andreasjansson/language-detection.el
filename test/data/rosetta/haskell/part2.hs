import Data.List
import Math.NumberTheory.Factor
import Math.Combinat

-- similar to part 1, but we can't play the "product of sums"
-- trick here, because here filtering is necessary.
sumDivisorsGTn50Times11 n =
	(11 *) $ sum $ filter (>= n `div` 50) $ map product $ listTensor $ map ((scanl1 (*)) . (1 :)) $ group $ pfactors n

-- 34000000 was my puzzle input
printSolution fn =
	print $ head $ filter ((>= 34000000) . snd) $ map (\n -> (n, fn n)) [1..]

main = printSolution sumDivisorsGTn50Times11
