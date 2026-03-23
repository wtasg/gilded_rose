package main

import "math"

func maxFrequencyElements(nums []int) int {
	freq := make(map[int]int)
	for _, v := range nums {
		freq[v] += 1
	}
	freqfreq := make(map[int]int)
	for _, v := range freq {
		freqfreq[v] += 1
	}
	// fmt.Println(freq)
	// fmt.Println(freqfreq)

	maxVal := math.MinInt
	maxKey := math.MinInt

	for key, val := range freqfreq {
		if key > maxKey {
			maxVal, maxKey = val, key
		}
	}
	return maxVal * maxKey
}
