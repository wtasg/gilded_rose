package main

import "fmt"

// TimeComplexity demonstrates concepts of time complexity analysis
func TimeComplexity() {
	fmt.Println("=== Time Complexity Examples ===")

	// O(1) - Constant time
	fmt.Println("\nO(1) - Constant Time:")
	fmt.Println("Accessing array element by index:")
	arr := [5]int{1, 2, 3, 4, 5}
	_ = arr[2] // Always takes the same time regardless of array size

	// O(n) - Linear time
	fmt.Println("\nO(n) - Linear Time:")
	fmt.Println("Finding maximum element in array:")
	max := findMax(arr[:]) // Need to check each element once
	fmt.Printf("Maximum in %v is %d\n", arr, max)

	// O(n^2) - Quadratic time
	fmt.Println("\nO(n^2) - Quadratic Time:")
	fmt.Println("Checking for duplicates using nested loops:")
	hasDup := hasDuplicates(arr[:])
	fmt.Printf("Array %v has duplicates: %v\n", arr, hasDup)

	// O(log n) - Logarithmic time
	fmt.Println("\nO(log n) - Logarithmic Time:")
	fmt.Println("Binary search in sorted array:")
	sorted := []int{1, 3, 5, 7, 9, 11, 13, 15}
	index := binarySearch(sorted, 7)
	fmt.Printf("Index of 7 in %v is %d\n", sorted, index)

	// O(n log n) - Linearithmic time
	fmt.Println("\nO(n log n) - Linearithmic Time:")
	fmt.Println("Merge sort (example):")
	unsorted := []int{64, 34, 25, 12, 22, 11, 90}
	sortedArr := mergeSort(unsorted)
	fmt.Printf("Sorted %v -> %v\n", unsorted, sortedArr)
}

// findMax finds the maximum element in a slice - O(n)
func findMax(arr []int) int {
	if len(arr) == 0 {
		return 0
	}
	max := arr[0]
	for _, v := range arr {
		if v > max {
			max = v
		}
	}
	return max
}

// hasDuplicates checks if slice has duplicates using nested loops - O(n^2)
func hasDuplicates(arr []int) bool {
	for i := 0; i < len(arr); i++ {
		for j := i + 1; j < len(arr); j++ {
			if arr[i] == arr[j] {
				return true
			}
		}
	}
	return false
}

// binarySearch performs binary search on sorted slice - O(log n)
func binarySearch(arr []int, target int) int {
	left, right := 0, len(arr)-1
	for left <= right {
		mid := left + (right-left)/2
		if arr[mid] == target {
			return mid
		} else if arr[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return -1 // Not found
}

// mergeSort implements merge sort algorithm - O(n log n)
func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	left := mergeSort(arr[:mid])
	right := mergeSort(arr[mid:])

	return merge(left, right)
}

func merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	// Append remaining elements
	result = append(result, left[i:]...)
	result = append(result, right[j:]...)

	return result
}
