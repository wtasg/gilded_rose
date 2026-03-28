package main

// BubbleSortR implements recursive bubble sort algorithm (alternative implementation)
func BubbleSortR(arr []int, n int) {
	if n == 1 {
		return
	}
	for i := 1; i < n; i++ {
		if arr[i-1] > arr[i] {
			arr[i], arr[i-1] = arr[i-1], arr[i]
		}
	}
	BubbleSortR(arr, n-1)
}
