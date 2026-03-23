package main

import (
	"fmt"
	"strings"
)

/*
**
fmt.Println(palindrome1("MadaM"))
*/
func palindrome1(s string) bool {
	// return s == reverseString(s) // case sensitive matching
	return strings.EqualFold(s, reverseString(s)) /// case-insensitive matching

}

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func main() {
	fmt.Println(palindrome1("MadaM"))
	fmt.Println(palindrome1("Madam"))
}
