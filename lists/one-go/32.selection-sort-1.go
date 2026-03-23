package main

import "fmt"

func selectionSort(arr []int) []int {
	newArr := make([]int, len(arr))
	copy(newArr, arr)

	for i := 0; i < len(newArr)-1; i++ {
		min := i
		for j := i + 1; j < len(newArr); j++ {
			if newArr[min] > newArr[j] {
				min = j
			}
		}
		newArr[i], newArr[min] = newArr[min], newArr[i]
	}
	return newArr
}

func main() {
	testSelectionSort()
}

func testSelectionSort() {
	arr := []int{64, 25, 12, 22, 11}
	sortedArr := selectionSort(arr)
	fmt.Printf("Original array: %v,  Sorted array: %v\n", arr, sortedArr)
}
