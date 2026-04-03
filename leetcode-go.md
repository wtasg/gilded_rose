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

```ts
function isPalindrome(s: string): boolean {
  const clean = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let i = 0, j = clean.length - 1;
  while (i < j) {
    if (clean[i] !== clean[j]) return false;
    i++; j--;
  }
  return true;
}

function isPalindromeRecursive(s: string): boolean {
  const arr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('');
  function recur(i: number, j: number): boolean {
    if (i >= j) return true;
    if (arr[i] !== arr[j]) return false;
    return recur(i + 1, j - 1);
  }
  return recur(0, arr.length - 1);
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

```ts
function majorityElement(nums: number[]): number {
  let count = 1;
  let ele = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (ele === nums[i]) count++;
    else count--;
    if (count === 0) {
      ele = nums[i];
      count = 1;
    }
  }
  return ele;
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

```ts
function largestAltitude(gain: number[]): number {
  let alt = 0;
  let maxAlt = 0;
  for (const v of gain) {
    alt += v;
    if (alt > maxAlt) maxAlt = alt;
  }
  return maxAlt;
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

```ts
function maxFrequencyElements(nums: number[]): number {
  const freq = new Map<number, number>();
  for (const v of nums) freq.set(v, (freq.get(v) ?? 0) + 1);
  const freqfreq = new Map<number, number>();
  for (const v of freq.values()) freqfreq.set(v, (freqfreq.get(v) ?? 0) + 1);

  let maxVal = -Infinity;
  let maxKey = -Infinity;
  for (const [key, val] of freqfreq.entries()) {
    if (key > maxKey) {
      maxKey = key;
      maxVal = val;
    }
  }
  return maxVal * maxKey;
}
```
