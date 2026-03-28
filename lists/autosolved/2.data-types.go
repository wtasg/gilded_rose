package main

import (
	"fmt"
	"math"
	"unsafe"
)

// DataTypes demonstrates various data types in Go
func DataTypes() {
	// Boolean
	var boolVal bool = true
	fmt.Printf("Boolean: %t (size: %d bytes)\n", boolVal, unsafe.Sizeof(boolVal))

	// Integer types
	var int8Val int8 = 127
	var int16Val int16 = 32767
	var int32Val int32 = 2147483647
	var int64Val int64 = 9223372036854775807
	var uintVal uint = 42
	var uint8Val uint8 = 255
	var uint16Val uint16 = 65535
	var uint32Val uint32 = 4294967295
	var uint64Val uint64 = 18446744073709551615

	fmt.Printf("int8: %d (size: %d bytes)\n", int8Val, unsafe.Sizeof(int8Val))
	fmt.Printf("int16: %d (size: %d bytes)\n", int16Val, unsafe.Sizeof(int16Val))
	fmt.Printf("int32: %d (size: %d bytes)\n", int32Val, unsafe.Sizeof(int32Val))
	fmt.Printf("int64: %d (size: %d bytes)\n", int64Val, unsafe.Sizeof(int64Val))
	fmt.Printf("uint: %d (size: %d bytes)\n", uintVal, unsafe.Sizeof(uintVal))
	fmt.Printf("uint8: %d (size: %d bytes)\n", uint8Val, unsafe.Sizeof(uint8Val))
	fmt.Printf("uint16: %d (size: %d bytes)\n", uint16Val, unsafe.Sizeof(uint16Val))
	fmt.Printf("uint32: %d (size: %d bytes)\n", uint32Val, unsafe.Sizeof(uint32Val))
	fmt.Printf("uint64: %d (size: %d bytes)\n", uint64Val, unsafe.Sizeof(uint64Val))

	// Floating point types
	var float32Val float32 = 3.141592653589793
	var float64Val float64 = 3.14159265358979323846
	fmt.Printf("float32: %.6f (size: %d bytes)\n", float32Val, unsafe.Sizeof(float32Val))
	fmt.Printf("float64: %.15f (size: %d bytes)\n", float64Val, unsafe.Sizeof(float64Val))

	// Complex types
	var complex64Val complex64 = complex(3, 4)
	var complex128Val complex128 = complex(3, 4)
	fmt.Printf("complex64: %v (size: %d bytes)\n", complex64Val, unsafe.Sizeof(complex64Val))
	fmt.Printf("complex128: %v (size: %d bytes)\n", complex128Val, unsafe.Sizeof(complex128Val))

	// String
	var strVal string = "Hello, 世界!"
	fmt.Printf("String: %s (size: %d bytes)\n", strVal, unsafe.Sizeof(strVal))
	fmt.Printf("String length: %d runes\n", len([]rune(strVal)))

	// Rune (alias for int32)
	var runeVal rune = '世'
	fmt.Printf("Rune: %c (size: %d bytes)\n", runeVal, unsafe.Sizeof(runeVal))

	// Byte (alias for uint8)
	var byteVal byte = 'A'
	fmt.Printf("Byte: %c (size: %d bytes)\n", byteVal, unsafe.Sizeof(byteVal))

	// Default values
	var defaultInt int
	var defaultFloat float64
	var defaultString string
	var defaultBool bool
	fmt.Printf("Default values - int: %d, float64: %f, string: \"%s\", bool: %t\n",
		defaultInt, defaultFloat, defaultString, defaultBool)

	// Type conversion example
	var intVar int = 42
	var floatVar float64 = float64(intVar)
	fmt.Printf("Type conversion: %d (int) -> %f (float64)\n", intVar, floatVar)

	// Mathematical constants
	fmt.Printf("Pi: %.10f\n", math.Pi)
	fmt.Printf("E: %.10f\n", math.E)
}
