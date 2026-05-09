package main

import "fmt"

// PrintNameNtimes prints a name N times using recursion
func PrintNameNtimes(name string, n int) {
	// Base case: if n <= 0, stop recursion
	if n <= 0 {
		return
	}

	// Print the name
	fmt.Println(name)

	// Recursive call with n-1
	PrintNameNtimes(name, n-1)
}

// PrintNameNtimesAlternative prints a name N times using recursion (alternative approach)
func PrintNameNtimesAlternative(name string, n int) {
	// Base case
	if n == 0 {
		return
	}

	// Recursive call first
	PrintNameNtimesAlternative(name, n-1)

	// Then print (this would print in reverse order)
	fmt.Println(name)
}

// Example usage
func ExamplePrintNameNtimes() {
	fmt.Println("Printing 'Alice' 5 times:")
	PrintNameNtimes("Alice", 5)

	fmt.Println("\nPrinting 'Alice' 5 times (alternative - reversed order):")
	PrintNameNtimesAlternative("Alice", 5)
}
