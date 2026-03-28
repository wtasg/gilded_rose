package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// UserInputOutput demonstrates basic user input and output operations
func UserInputOutput() {
	// Create a new reader to read from stdin
	reader := bufio.NewReader(os.Stdin)

	// Prompt the user
	fmt.Print("Enter some text: ")

	// Read input until newline
	input, _ := reader.ReadString('\n')

	// Remove the newline character
	input = strings.TrimSpace(input)

	// Print the input back to the user
	fmt.Println("You entered:", input)

	// Example of formatted output
	fmt.Printf("Length of input: %d characters\n", len(input))
}
