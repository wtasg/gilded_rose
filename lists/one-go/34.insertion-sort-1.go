package main

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

func test1() {
	arr := []int{2, 4, 6, 8, 3}
	expected := []int{2, 3, 4, 6, 8}
	if res := InsertionSort1(arr); !equal(res, expected) {
		panic("test1 failed")
	} else {
		println("test1 passed")
	}
}

func test2() {
	arr := []int{1, 4, 3, 5, 6, 2}
	expected := []int{1, 2, 3, 4, 5, 6}
	if res := InsertionSort1(arr); !equal(res, expected) {
		panic("test2 failed")
	} else {
		println("test2 passed")
	}
}

func equal(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func main() {
	test1()
	test2()
}
