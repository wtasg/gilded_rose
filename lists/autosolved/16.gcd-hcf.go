package main

import "fmt"

// GCDHCF calculates the Greatest Common Divisor (GCD) or Highest Common Factor (HCF)
// of two numbers using the Euclidean algorithm
func GCDHCF(a, b int) int {
	// Ensure a is greater than or equal to b
	if a < b {
		a, b = b, a
	}

	// Euclidean algorithm
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

// GCDHCFMultiple calculates the GCD of multiple numbers
func GCDHCFMultiple(numbers []int) int {
	if len(numbers) == 0 {
		return 0
	}

	result := numbers[0]
	for i := 1; i < len(numbers); i++ {
		result = GCDHCF(result, numbers[i])
		if result == 1 {
			return 1 // Early exit as GCD can't be less than 1
		}
	}
	return result
}

// LCM calculates the Least Common Multiple of two numbers
func LCM(a, b int) int {
	if a == 0 || b == 0 {
		return 0
	}
	return (a / GCDHCF(a, b)) * b
}

// LCMMultiple calculates the LCM of multiple numbers
func LCMMultiple(numbers []int) int {
	if len(numbers) == 0 {
		return 0
	}

	result := numbers[0]
	for i := 1; i < len(numbers); i++ {
		result = LCM(result, numbers[i])
	}
	return result
}

// Example usage
func ExampleGCDHCF() {
	fmt.Println("GCD of 48 and 18:", GCDHCF(48, 18)) // Expected: 6
	fmt.Println("GCD of 7 and 13:", GCDHCF(7, 13))   // Expected: 1
	fmt.Println("GCD of 0 and 5:", GCDHCF(0, 5))     // Expected: 5

	numbers := []int{24, 36, 48}
	fmt.Println("GCD of", numbers, ":", GCDHCFMultiple(numbers)) // Expected: 12

	fmt.Println("LCM of 12 and 15:", LCM(12, 15))             // Expected: 60
	fmt.Println("LCM of", numbers, ":", LCMMultiple(numbers)) // Expected: 144
}
