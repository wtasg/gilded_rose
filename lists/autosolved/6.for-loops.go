package main

import "fmt"

// ForLoops demonstrates various for loop constructs in Go
func ForLoops() {
	fmt.Println("=== Basic for loop ===")
	// Basic for loop (like for i = 0; i < 5; i++ in other languages)
	for i := 0; i < 5; i++ {
		fmt.Printf("i = %d\n", i)
	}

	fmt.Println("\n=== For loop with condition only ===")
	// While loop equivalent (condition only)
	j := 0
	for j < 3 {
		fmt.Printf("j = %d\n", j)
		j++
	}

	fmt.Println("\n=== Infinite loop (use with break) ===")
	// Infinite loop
	k := 0
	for {
		fmt.Printf("k = %d\n", k)
		k++
		if k >= 3 {
			break // Exit the loop
		}
	}

	fmt.Println("\n=== For loop with range (arrays/slices) ===")
	// Range loop over slice
	numbers := []int{10, 20, 30, 40, 50}
	for index, value := range numbers {
		fmt.Printf("numbers[%d] = %d\n", index, value)
	}

	fmt.Println("\n=== For loop with range (strings) ===")
	// Range loop over string (handles Unicode correctly)
	text := "Hello 世界"
	for index, runeValue := range text {
		fmt.Printf("text[%d] = %c (Unicode %U)\n", index, runeValue, runeValue)
	}

	fmt.Println("\n=== For loop with range (maps) ===")
	// Range loop over map
	scores := map[string]int{"Alice": 95, "Bob": 87, "Charlie": 92}
	for name, score := range scores {
		fmt.Printf("%s: %d\n", name, score)
	}

	fmt.Println("\n=== Break and Continue ===")
	// Break and continue statements
	for i := 0; i < 10; i++ {
		if i == 5 {
			continue // Skip the rest of this iteration
		}
		if i == 8 {
			break // Exit the loop completely
		}
		fmt.Printf("i = %d\n", i)
	}

	fmt.Println("\n=== Nested loops ===")
	// Nested loops
	for i := 1; i <= 3; i++ {
		for j := 1; j <= 3; j++ {
			fmt.Printf("%d*%d = %d\t", i, j, i*j)
		}
		fmt.Println() // New line after each row
	}
}
