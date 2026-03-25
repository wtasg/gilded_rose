package main

import "fmt"

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

func test1() {
	arr := []int{5, 1, 4, 2, 8, -1}
	BubbleSortR(arr, len(arr))
	fmt.Println("Sorted array:", arr)
}

func main() {
	test1()
}
