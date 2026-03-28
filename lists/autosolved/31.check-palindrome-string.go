package main

import "strings"

// CheckPalindromeString checks if a string is a palindrome (case-insensitive)
func CheckPalindromeString(s string) bool {
	return strings.EqualFold(s, reverseString(s))
}

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}
