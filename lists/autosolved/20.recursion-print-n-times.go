package main

import "fmt"

// PrintSomethingNtimes prints a message N times using recursion
func PrintSomethingNtimes(message string, n int) {
	// Base case: if n <= 0, stop recursion
	if n <= 0 {
		return
	}

	// Print the message
	fmt.Println(message)

	// Recursive call with n-1
	PrintSomethingNtimes(message, n-1)
}

// PrintSomethingNtimesAlternative prints a message N times using recursion (alternative approach)
func PrintSomethingNtimesAlternative(message string, n int) {
	// Base case
	if n == 0 {
		return
	}

	// Recursive call first
	PrintSomethingNtimesAlternative(message, n-1)

	// Then print (this would print in reverse order)
	fmt.Println(message)
}

// Example usage
func ExamplePrintSomethingNtimes() {
	fmt.Println("Printing 'Hello' 5 times:")
	PrintSomethingNtimes("Hello", 5)

	fmt.Println("\nPrinting 'Hello' 5 times (alternative - reversed order):")
	PrintSomethingNtimesAlternative("Hello", 5)
}
