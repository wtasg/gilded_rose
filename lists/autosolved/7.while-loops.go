package main

import "fmt"

// WhileLoops demonstrates while loop constructs in Go
func WhileLoops() {
	fmt.Println("=== While loop equivalent in Go ===")
	// In Go, there's no explicit while keyword.
	// Instead, we use for with a condition only, which acts as a while loop.

	// Example 1: Basic while loop
	count := 0
	for count < 5 { // This works as a while loop
		fmt.Printf("count = %d\n", count)
		count++
	}

	fmt.Println("\n=== While loop with break ===")
	// Example 2: While loop with break condition
	num := 0
	for {
		if num >= 3 {
			break // Exit the loop
		}
		fmt.Printf("num = %d\n", num)
		num++
	}

	fmt.Println("\n=== While loop with continue ===")
	// Example 3: While loop with continue
	val := 0
	for val < 10 {
		val++
		if val%2 == 0 {
			continue // Skip even numbers
		}
		fmt.Printf("Odd val = %d\n", val)
	}

	fmt.Println("\n=== Infinite loop (use with caution) ===")
	// Example 4: Infinite loop (would run forever without break)
	// Uncommenting this would cause an infinite loop:
	// for {
	//     fmt.Println("This would run forever")
	// }

	// Instead, here's a controlled infinite loop with break:
	i := 0
	for {
		fmt.Printf("i = %d\n", i)
		i++
		if i >= 4 {
			break
		}
	}
}
