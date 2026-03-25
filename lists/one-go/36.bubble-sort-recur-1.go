package main

import "fmt"

func BubbleSortR(arr []int, n int) []int {
	if len(arr) == n {
		return arr
	}
	for i := 1; i < len(arr); i++ {
		if arr[i-1] > arr[i] {
			arr[i], arr[i-1] = arr[i-1], arr[i]
		}
	}
	return BubbleSortR(arr, n+1)
}

func main() {
	arr := []int{5, 1, 4, 2, 8}
	sortedArr := BubbleSortR(arr, 0)
	fmt.Println("Sorted array:", sortedArr)
}
