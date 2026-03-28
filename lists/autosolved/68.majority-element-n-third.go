package main

func majorityElement(nums []int) []int {
	return misraGries(nums, 3)
}

func misraGries(nums []int, k int) []int {
	if k <= 0 {
		return []int{}
	}
	candidates := make(map[int]int, k-1)
	for _, num := range nums {
		if _, ok := candidates[num]; ok {
			candidates[num] += 1
		} else if len(candidates) < k-1 {
			candidates[num] = 1
		} else {
			for i := range candidates {
				candidates[i] -= 1
			}

			for key, val := range candidates {
				if val == 0 {
					delete(candidates, key)
				}
			}
		}
	}

	counts := make(map[int]int)
	for _, v := range nums {
		if _, ok := candidates[v]; ok {
			counts[v] += 1
		}
	}

	results := []int{}
	threshold := len(nums) / k
	for key, val := range counts {
		if val > threshold {
			results = append(results, key)
		}
	}
	return results
}
