package main

import "fmt"

// IfElseStatements demonstrates various if-else constructs in Go
func IfElseStatements() {
	// Example 1: Simple if-else
	age := 20
	if age >= 18 {
		fmt.Println("You are an adult.")
	} else {
		fmt.Println("You are a minor.")
	}

	// Example 2: Else if
	score := 85
	if score >= 90 {
		fmt.Println("Grade: A")
	} else if score >= 80 {
		fmt.Println("Grade: B")
	} else if score >= 70 {
		fmt.Println("Grade: C")
	} else {
		fmt.Println("Grade: F")
	}

	// Example 3: Nested if
	number := 10
	if number > 0 {
		if number%2 == 0 {
			fmt.Println("Positive even number")
		} else {
			fmt.Println("Positive odd number")
		}
	} else if number < 0 {
		fmt.Println("Negative number")
	} else {
		fmt.Println("Zero")
	}

	// Example 4: Short statement in if
	if length := len("hello"); length > 5 {
		fmt.Println("String length is greater than 5")
	} else {
		fmt.Printf("String length is %d\n", length)
	}
}
