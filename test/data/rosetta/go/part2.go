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
	getTotalRibbon(lines)

}

/**
 * parses a string with 3 numbers seperated by x into an 
 * array of int and sorts them
 * ex "5x3x4" -> []int{3,4,5}
 */
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

func getTotalRibbon(lines []string) {

	ftRibbon := 0

	for _, line := range lines {
		ftRibbon += getNeededRibbon(parseLine(line))
	}

	fmt.Printf("The elves need %d feet of ribbon\n", ftRibbon)

}

/**
 * Assumes the lenghts are sorted
 */
func getNeededRibbon(lengths []int) int {
	return (2 * lengths[0]) + (2 * lengths[1]) + (lengths[0] * lengths[1] * lengths[2])
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