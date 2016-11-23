package main

import (
	"fmt"
	"os"
	"bufio"
	"strconv"
	"strings"
	"sort"
)

func main() {

	lines := getInput("input.txt")
	getTotalWrappingPaper(lines)

}

func parseLine(line string) []int {

	var lengths []int

	for _, part := range strings.Split(line, "x") {
		
		length, err := strconv.Atoi(part)

		if err != nil {
			panic(err)
		}

		lengths = append(lengths, length)
	}

	sort.Ints(lengths)

	return lengths

}

/**
 * Assumes the lenghts are sorted
 */
func getNeededPaper(lengths []int) int {
	
	neededPaper := 0

	// Calculates surface area of the present
	// by doing 2 x (lw + lh + wh)
	for i := 0; i < len(lengths); i++ {
		neededPaper += 2 * lengths[i] * lengths[(i+1)%len(lengths)]
	}

	// Adds the needed slack, the area of
	// the smallest side. This is true if
	// the lengths come pre-sorted
	neededPaper += lengths[0] * lengths[1]

	return neededPaper
}

func getTotalWrappingPaper(lines []string) {
	sqftPaper := 0

	for _, line := range lines {
		sqftPaper += getNeededPaper(parseLine(line))
	}

	fmt.Printf("The elves need %d sq feet of wrapping paper\n", sqftPaper)
}

func getInput(filepath string) []string {

	file, err := os.Open(filepath)

	if err != nil {
		panic(err)
	}

	defer file.Close()
	var lines []string

	scanner := bufio.NewScanner(file)

	// Read all lines of the file
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines
	
}