package main

import (
	"fmt"
	"strings"
)

func palindrome2(s string) bool {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		if !strings.EqualFold(string(runes[i]), string(runes[j])) {
			return false
		}
	}
	return true
}

func main() {
	fmt.Println(palindrome2("MadaM"))
	fmt.Println(palindrome2("Madam"))
}
