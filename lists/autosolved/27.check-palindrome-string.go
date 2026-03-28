package main

import "strings"

// CheckPalindromeStringTwoPointer checks if a string is a palindrome (case-insensitive) using two-pointer approach
func CheckPalindromeStringTwoPointer(s string) bool {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		if !strings.EqualFold(string(runes[i]), string(runes[j])) {
			return false
		}
	}
	return true
}
