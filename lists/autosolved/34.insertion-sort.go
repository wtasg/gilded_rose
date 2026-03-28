package main

// InsertionSort1 implements the insertion sort algorithm
func InsertionSort1(arr []int) []int {
	out := make([]int, len(arr))
	copy(out, arr)

	for i, v := range out {
		j := i - 1
		for j >= 0 && out[j] > v {
			out[j+1] = out[j]
			j--
		}
		out[j+1] = v
	}

	return out
}
