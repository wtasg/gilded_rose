package main

import "fmt"

// Print1ToN prints numbers from 1 to N using recursion
func Print1ToN(n int) {
	// Base case: if n <= 0, stop recursion
	if n <= 0 {
		return
	}

	// First recurse to n-1
	Print1ToN(n - 1)

	// Then print n (this ensures ascending order)
	fmt.Print(n, " ")
}

// Print1ToNAlternative prints numbers from 1 to N using recursion (alternative approach)
func Print1ToNAlternative(n int, current int) {
	// Base case: if current > n, stop recursion
	if current > n {
		return
	}

	// Print current number
	fmt.Print(current, " ")

	// Recurse with next number
	Print1ToNAlternative(n, current+1)
}

// Example usage
func ExamplePrint1ToN() {
	fmt.Print("Printing 1 to 5: ")
	Print1ToN(5)
	fmt.Println()

	fmt.Print("Printing 1 to 5 (alternative): ")
	Print1ToNAlternative(5, 1)
	fmt.Println()
}
