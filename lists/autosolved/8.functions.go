package main

import "fmt"

// Functions demonstrates function concepts in Go including pass by value and pass by reference
func Functions() {
	fmt.Println("=== Pass by Value ===")
	// In Go, all function parameters are passed by value.
	// This means that the function receives a copy of the argument.

	num := 10
	fmt.Printf("Before function call: num = %d\n", num)
	modifyValue(num)                                   // Passes a copy of num
	fmt.Printf("After function call: num = %d\n", num) // num remains unchanged

	fmt.Println("\n=== Pass by Reference (using pointers) ===")
	// To modify the original variable, we need to pass a pointer (reference)
	numPtr := &num // Get the address of num
	fmt.Printf("Before function call: num = %d\n", num)
	modifyReference(numPtr)                            // Passes the pointer (reference)
	fmt.Printf("After function call: num = %d\n", num) // num is now modified

	fmt.Println("\n=== Functions with Multiple Return Values ===")
	// Go functions can return multiple values
	quotient, remainder := divide(17, 5)
	fmt.Printf("17 divided by 5: quotient = %d, remainder = %d\n", quotient, remainder)

	fmt.Println("\n=== Functions with Named Return Values ===")
	// Named return values
	result1, result2 := swap("hello", "world")
	fmt.Printf("Swapped: %s, %s\n", result1, result2)

	fmt.Println("\n=== Variadic Functions ===")
	// Variadic functions can accept zero or more arguments of a specific type
	sum := sumNumbers(1, 2, 3, 4, 5)
	fmt.Printf("Sum of 1,2,3,4,5 = %d\n", sum)

	// Can also pass a slice using ...
	numbers := []int{10, 20, 30}
	sum2 := sumNumbers(numbers...)
	fmt.Printf("Sum of 10,20,30 = %d\n", sum2)

	fmt.Println("\n=== Anonymous Functions (Closures) ===")
	// Anonymous function assigned to a variable
	square := func(x int) int {
		return x * x
	}
	fmt.Printf("Square of 5 = %d\n", square(5))

	// Closure: function that references variables from outside its scope
	counter := makeCounter()
	fmt.Printf("Counter: %d\n", counter()) // 1
	fmt.Printf("Counter: %d\n", counter()) // 2
	fmt.Printf("Counter: %d\n", counter()) // 3
}

// modifyValue receives a copy of the parameter (pass by value)
func modifyValue(x int) {
	x = 20
	fmt.Printf("Inside function: x = %d\n", x)
}

// modifyReference receives a pointer to the parameter (pass by reference)
func modifyReference(x *int) {
	*x = 20 // Dereference the pointer to modify the original value
	fmt.Printf("Inside function: *x = %d\n", *x)
}

// divide returns two values: quotient and remainder
func divide(a, b int) (int, int) {
	return a / b, a % b
}

// swap returns two strings with named return values
func swap(a, b string) (swapped1, swapped2 string) {
	swapped1 = b
	swapped2 = a
	return // Returns the named values
}

// sumNumbers is a variadic function that accepts zero or more integers
func sumNumbers(nums ...int) int {
	sum := 0
	for _, num := range nums {
		sum += num
	}
	return sum
}

// makeCounter returns a closure that increments and returns a counter
func makeCounter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}
