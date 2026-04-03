# Named Algorithms

## Voting

| Algorithm | Type | Memory | Purpose |
| --- | --- | --- | --- |
| Boyer-Moore | Deterministic | O(1) | Finds element appearing >50% |
| Misra-Gries | Deterministic | O(k) | Finds elements appearing >1/k |
| Count-Min Sketch | Probabilistic | O(w⋅d) | Estimates frequency of any item |

### Boyer Moore Majority Vote Algorithm

> [!Question] Why does Boyer-Moore work?
>
> Because the majority element will survive the cancellation (-1). For Example, 51 - 49 will always result in the clear majority element being selected, whichever way the votes are cast.

- [wiki](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm)
- leetcode 169
- #stream #online #single-pass

```golang
package main

import "fmt"

// BoyerMooreStream processes a stream of integers and returns a candidate for the majority.
// Memory Complexity: O(1)
// Time Complexity: O(n)
func BoyerMooreStream(stream <-chan int) int {
 var candidate int
 count := 0

 for val := range stream {
  if count == 0 {
   candidate = val
   count = 1
  } else if val == candidate {
   count++
  } else {
   count--
  }
 }

 return candidate
}

func main() {
 // Simulate a data stream
 stream := make(chan int)

 go func() {
  data := []int{2, 2, 1, 1, 1, 2, 2}
  for _, d := range data {
   stream <- d
  }
  close(stream)
 }()

 result := BoyerMooreStream(stream)
 fmt.Printf("The majority candidate is: %d\n", result)
}
```

### Misra-Gries

- [wiki](https://en.wikipedia.org/wiki/Misra%E2%80%93Gries_summary)
- [cormode: misra-gries summaries pdf](https://people.csail.mit.edu/rrw/6.045-2017/encalgs-mg.pdf)
- `n/k` majority i.e. elements that occur more than 1/k times in a list.
- A natural next step from Boyer-Moore
- #summary #sketch #deterministic
- Good for finding elements that got more than 9% (say) votes.
- Not good for finding top ten major elements even if their frequencies are 0.1%; Use `top-k` for that.

```golang
package main

import "fmt"

// MisraGries finds candidates that appear more than 1/k of the time.
// It uses O(k) space.
func MisraGries(stream <-chan int, k int) map[int]int {
 // We store at most k-1 candidates
 candidates := make(map[int]int)

 for val := range stream {
  // Case A: Element already exists
  if _, exists := candidates[val]; exists {
   candidates[val]++
  } else if len(candidates) < k-1 {
   // Case B: Space available for new candidate
   candidates[val] = 1
  } else {
   // Case C: Map is full, decrement everyone
   for item := range candidates {
    candidates[item]--
    if candidates[item] == 0 {
     delete(candidates, item)
    }
   }
  }
 }

 return candidates
}

func main() {
 // Let's find elements appearing > 1/4 of the time (k=4)
 // Candidates map will hold at most 3 items.
 dataStream := make(chan int)
 go func() {
  data := []int{1, 2, 1, 2, 3, 4, 1, 2, 1, 2, 5, 6}
  for _, v := range data {
   dataStream <- v
  }
  close(dataStream)
 }()

 k := 4
 results := MisraGries(dataStream, k)

 fmt.Printf("Potential Heavy Hitters (> 1/%d): %v\n", k, results)
}
```
