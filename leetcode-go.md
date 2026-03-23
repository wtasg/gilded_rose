# Leetcode solutions

## 100s

### 125

```golang
func isPalindrome(s string) bool {
 runes := []rune(s)
 for i, j := 0, len(runes)-1; i < j; {
  if !ascii(runes[i]) {
   i += 1
   continue
  }
  if !ascii(runes[j]) {
   j -= 1
   continue
  }
  if !strings.EqualFold(string(runes[i]), string(runes[j])) {
   return false
  }
  i, j = i+1, j-1
 }
 return true
}

func ascii(r rune) bool {
 return (r >= 'a' && r <= 'z') ||
  (r >= 'A' && r <= 'Z') ||
  (r >= '0' && r <= '9')
}

// recursive
func isPalindrome(s string) bool {
 runes := []rune(s)
 return recur(runes, 0, len(runes)-1)
}

func recur(s []rune, i int, j int) bool {
 if i >= j {
  return true
 }
 if !ascii(s[i]) {
  return recur(s, i+1, j)
 }
 if !ascii(s[j]) {
  return recur(s, i, j-1)
 }
 return strings.EqualFold(string(s[i]), string(s[j])) && recur(s, i+1, j-1)
}
```

### 169

```golang
func majorityElement(nums []int) int {
 count, ele := 1, nums[0]
 for i := 1; i < len(nums); i++ {
  if ele == nums[i] {
   count++
  } else {
   count--
  }
  if count == 0 {
   ele = nums[i]
   count = 1
  }
 }
 return ele
}
```

## 1700s

### 1732

```golang
func largestAltitude(gain []int) int {
 alt := 0
 maxAlt := alt
 for _, v := range gain {
  alt += v
  if alt > maxAlt {
   maxAlt = alt
  }
 }
 return maxAlt
}
```

## 3000s

### 3005

Frequency of Frequency is faster and better since we do not search in the single frequency elements etc...

```go
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

```
