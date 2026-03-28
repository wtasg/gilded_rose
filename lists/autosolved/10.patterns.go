package main

import "fmt"

// Patterns demonstrates various pattern printing techniques
func Patterns() {
	fmt.Println("=== Pattern Printing Examples ===")

	fmt.Println("\n1. Right Triangle Pattern (*):")
	printRightTriangle(5)

	fmt.Println("\n2. Left Triangle Pattern (*):")
	printLeftTriangle(5)

	fmt.Println("\n3. Pyramid Pattern (*):")
	printPyramid(5)

	fmt.Println("\n4. Number Triangle Pattern:")
	printNumberTriangle(5)

	fmt.Println("\n5. Inverted Number Triangle Pattern:")
	printInvertedNumberTriangle(5)

	fmt.Println("\n6. Floyd's Triangle:")
	printFloydsTriangle(5)

	fmt.Println("\n7. Diamond Pattern (*):")
	printDiamond(5)
}

// printRightTriangle prints a right triangle pattern
func printRightTriangle(n int) {
	for i := 1; i <= n; i++ {
		for j := 0; j < i; j++ {
			fmt.Print("* ")
		}
		fmt.Println()
	}
}

// printLeftTriangle prints a left-aligned triangle pattern
func printLeftTriangle(n int) {
	for i := 1; i <= n; i++ {
		// Print spaces
		for j := 0; j < n-i; j++ {
			fmt.Print("  ")
		}
		// Print stars
		for j := 0; j < i; j++ {
			fmt.Print("* ")
		}
		fmt.Println()
	}
}

// printPyramid prints a pyramid pattern
func printPyramid(n int) {
	for i := 1; i <= n; i++ {
		// Print spaces
		for j := 0; j < n-i; j++ {
			fmt.Print(" ")
		}
		// Print stars
		for j := 0; j < 2*i-1; j++ {
			fmt.Print("*")
		}
		fmt.Println()
	}
}

// printNumberTriangle prints a triangle with numbers
func printNumberTriangle(n int) {
	for i := 1; i <= n; i++ {
		for j := 1; j <= i; j++ {
			fmt.Print(j, " ")
		}
		fmt.Println()
	}
}

// printInvertedNumberTriangle prints an inverted triangle with numbers
func printInvertedNumberTriangle(n int) {
	for i := n; i >= 1; i-- {
		for j := 1; j <= i; j++ {
			fmt.Print(j, " ")
		}
		fmt.Println()
	}
}

// printFloydsTriangle prints Floyd's triangle
func printFloydsTriangle(n int) {
	num := 1
	for i := 1; i <= n; i++ {
		for j := 1; j <= i; j++ {
			fmt.Print(num, " ")
			num++
		}
		fmt.Println()
	}
}

// printDiamond prints a diamond pattern
func printDiamond(n int) {
	// Upper part
	for i := 1; i <= n; i++ {
		// Print spaces
		for j := 0; j < n-i; j++ {
			fmt.Print(" ")
		}
		// Print stars
		for j := 0; j < 2*i-1; j++ {
			fmt.Print("*")
		}
		fmt.Println()
	}

	// Lower part
	for i := n - 1; i >= 1; i-- {
		// Print spaces
		for j := 0; j < n-i; j++ {
			fmt.Print(" ")
		}
		// Print stars
		for j := 0; j < 2*i-1; j++ {
			fmt.Print("*")
		}
		fmt.Println()
	}
}
