package main

import "fmt"

// SwitchStatement demonstrates various switch constructs in Go
func SwitchStatement() {
	// Example 1: Basic switch
	day := 3
	switch day {
	case 1:
		fmt.Println("Monday")
	case 2:
		fmt.Println("Tuesday")
	case 3:
		fmt.Println("Wednesday")
	case 4:
		fmt.Println("Thursday")
	case 5:
		fmt.Println("Friday")
	case 6:
		fmt.Println("Saturday")
	case 7:
		fmt.Println("Sunday")
	default:
		fmt.Println("Invalid day")
	}

	// Example 2: Switch with multiple values in case
	letter := 'b'
	switch letter {
	case 'a', 'e', 'i', 'o', 'u':
		fmt.Printf("%c is a vowel\n", letter)
	default:
		fmt.Printf("%c is a consonant\n", letter)
	}

	// Example 3: Switch without expression (like if-else)
	num := 15
	switch {
	case num < 0:
		fmt.Println("Negative")
	case num == 0:
		fmt.Println("Zero")
	case num > 0 && num < 10:
		fmt.Println("Positive single digit")
	case num >= 10 && num < 100:
		fmt.Println("Positive double digit")
	default:
		fmt.Println("Other positive number")
	}

	// Example 4: Type switch
	var x interface{} = 42
	switch t := x.(type) {
	case int:
		fmt.Printf("x is an int: %v\n", t)
	case string:
		fmt.Printf("x is a string: %v\n", t)
	case bool:
		fmt.Printf("x is a bool: %v\n", t)
	default:
		fmt.Printf("x is of unknown type: %T\n", t)
	}
}
