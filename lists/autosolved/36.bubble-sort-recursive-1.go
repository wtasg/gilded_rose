package main

// BubbleSortR implements recursive bubble sort algorithm
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
