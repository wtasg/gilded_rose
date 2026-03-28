package main

import "fmt"

// ArraysStrings demonstrates working with arrays and strings in Go
func ArraysStrings() {
	// Arrays
	var numbers [5]int      // array of 5 integers initialized to 0
	nums := [3]int{1, 2, 3} // short declaration with initialization

	fmt.Println("Array:", numbers)
	fmt.Println("Initialized array:", nums)

	// Accessing elements
	fmt.Println("First element:", nums[0])
	fmt.Println("Last element:", nums[len(nums)-1])

	// Modifying elements
	nums[0] = 10
	fmt.Println("After modification:", nums)

	// Array length
	fmt.Println("Length of nums:", len(nums))

	// Multi-dimensional arrays
	var matrix [2][3]int = [2][3]int{
		{1, 2, 3},
		{4, 5, 6},
	}
	fmt.Println("2D array:", matrix)

	// Strings
	var greeting string = "Hello, 世界!"
	char := greeting[0] // bytes, not runes
	fmt.Printf("First byte: %c (as byte)\n", char)

	// Proper way to iterate over Unicode characters
	for i, r := range greeting {
		fmt.Printf("Character %d: %c (Unicode %U)\n", i, r, r)
	}

	// String length in bytes vs runes
	fmt.Printf("String length in bytes: %d\n", len(greeting))
	fmt.Printf("String length in runes: %d\n", len([]rune(greeting)))

	// String concatenation
	first := "Hello"
	second := "World"
	result := first + " " + second
	fmt.Println("Concatenated:", result)

	// String slicing
	sub := greeting[0:5] // Hello
	fmt.Println("Substring:", sub)
}
