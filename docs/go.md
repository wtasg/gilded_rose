# Go

## #string

### #compare

- Compare strings:
  - Case Sensitive: `a == b`
  - Case Insensitive: `strings.EqualFold(a, b)`
  - `r >= 'a' && r <= 'z'` where r is a `rune`.
- Compare runes
  - Use `string(r)` to convert a rune to string

## #map

`make(map[T]S)` will create a map `T -> S`.

Examples: `make(map[int]int)`, `make(map[string]int)`

### range over map

```go
for key, value := range m {
    //...
}
```
