package main

import "fmt"

// PrintNTo1 prints numbers from N to 1 using recursion
func PrintNTo1(n int) {
	// Base case: if n <= 0, stop recursion
	if n <= 0 {
		return
	}

	// Print n first
	fmt.Print(n, " ")

	// Then recurse to n-1 (this ensures descending order)
	PrintNTo1(n - 1)
}

// PrintNTo1Alternative prints numbers from N to 1 using recursion (alternative approach)
func PrintNTo1Alternative(n int) {
	// Base case: if n <= 0, stop recursion
	if n <= 0 {
		return
	}

	// First recurse to n-1
	PrintNTo1Alternative(n - 1)

	// Then print n (this would print in ascending order)
	fmt.Print(n, " ")
}

// Example usage
func ExamplePrintNTo1() {
	fmt.Print("Printing 5 to 1: ")
	PrintNTo1(5)
	fmt.Println()

	fmt.Print("Printing 5 to 1 (alternative - incorrect order): ")
	PrintNTo1Alternative(5)
	fmt.Println()
}
