package main

// SelectionSort implements the selection sort algorithm
func SelectionSort(arr []int) []int {
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
