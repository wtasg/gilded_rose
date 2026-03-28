package main

import "fmt"

// CountDigits counts the number of digits in a given integer
func CountDigits(n int) int {
	// Handle negative numbers by taking absolute value
	if n < 0 {
		n = -n
	}

	// Special case for 0
	if n == 0 {
		return 1
	}

	count := 0
	for n > 0 {
		count++
		n /= 10
	}
	return count
}

// CountDigitsAlternative converts to string and counts length
func CountDigitsAlternative(n int) int {
	if n == 0 {
		return 1
	}
	if n < 0 {
		n = -n
	}
	return len(fmt.Sprintf("%d", n))
}

// Example usage
func ExampleCountDigits() {
	numbers := []int{0, 5, 12, 123, 1234, -123, -12345}
	for _, num := range numbers {
		fmt.Printf("Number: %d, Digits: %d\n", num, CountDigits(num))
	}
}
