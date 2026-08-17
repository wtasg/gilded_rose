# Go

## hello world

```go
import "fmt"

func main() {
    fmt.Println("hello, world")
}
```

```plantuml
@startuml

top to bottom direction
skinparam linetype ortho

rectangle "Basics" as Basics

rectangle "Comments" as Comments
rectangle "Numbers" as Numbers
rectangle "Arithmetic Operators" as Arithmetic
rectangle "Booleans" as Booleans

rectangle "Strings Package" as StringsPackage
rectangle "Strings" as Strings

rectangle "Conditionals If" as If
rectangle "Comparison" as Comparison
rectangle "String Formatting" as StringFormatting
rectangle "Packages" as Packages

rectangle "Slices" as Slices
rectangle "Variadic Functions" as Variadic
rectangle "Conditionals Switch" as Switch
rectangle "Structs" as Structs

rectangle "Randomness" as Randomness
rectangle "For Loops" as ForLoops

rectangle "Functions" as Functions
rectangle "Floating-Point Numbers" as FloatingPoint

rectangle "Time" as Time
rectangle "Maps" as Maps

rectangle "Range Iteration" as RangeIteration
rectangle "Type Definitions" as TypeDefinitions
rectangle "Pointers" as Pointers

rectangle "Methods" as Methods
rectangle "Runes" as Runes

rectangle "Regular Expressions" as RegularExpressions
rectangle "Interfaces" as Interfaces
rectangle "Zero Values" as ZeroValues

rectangle "Stringers" as Stringers
rectangle "Type Conversion" as TypeConversion
rectangle "Type Assertion" as TypeAssertion
rectangle "Errors" as Errors
rectangle "First Class Functions" as FirstClassFunctions

Basics --> Comments
Basics --> Numbers
Basics --> Arithmetic
Basics --> Booleans

Comments --> If

Numbers --> StringsPackage
Numbers --> Comparison
Numbers --> If

Arithmetic --> Strings
Arithmetic --> Comparison
Arithmetic --> If

Booleans --> Packages

StringsPackage --> Strings
StringsPackage --> If

Strings --> StringFormatting
Strings --> Packages

If --> Slices
If --> Variadic

Comparison --> Switch
Comparison --> Structs

Slices --> Randomness
Variadic --> ForLoops
Switch --> ForLoops

ForLoops --> Functions
ForLoops --> FloatingPoint

Functions --> Time
Functions --> Maps

Time --> Maps

Maps --> RangeIteration
Maps --> Pointers

RangeIteration --> TypeDefinitions

TypeDefinitions --> Pointers
TypeDefinitions --> Methods
TypeDefinitions --> Runes

Methods --> Runes
Methods --> RegularExpressions
Methods --> ZeroValues

Runes --> ZeroValues

RegularExpressions --> Interfaces
RegularExpressions --> Stringers

Interfaces --> TypeConversion
Interfaces --> TypeAssertion
Interfaces --> ZeroValues

ZeroValues --> Errors

TypeAssertion --> Errors
TypeAssertion --> FirstClassFunctions

@enduml
```

```mermaid
flowchart TD
    Basics["Basics"]

    Comments["Comments"]
    Numbers["Numbers"]
    Arithmetic["Arithmetic Operators"]
    Booleans["Booleans"]

    StringsPackage["Strings Package"]
    Strings["Strings"]

    If["Conditionals If"]
    Comparison["Comparison"]
    StringFormatting["String Formatting"]
    Packages["Packages"]

    Slices["Slices"]
    Variadic["Variadic Functions"]
    Switch["Conditionals Switch"]
    Structs["Structs"]

    Randomness["Randomness"]
    ForLoops["For Loops"]

    Functions["Functions"]
    FloatingPoint["Floating-Point Numbers"]

    Time["Time"]
    Maps["Maps"]

    RangeIteration["Range Iteration"]
    TypeDefinitions["Type Definitions"]
    Pointers["Pointers"]

    Methods["Methods"]
    Runes["Runes"]

    RegularExpressions["Regular Expressions"]
    Interfaces["Interfaces"]
    ZeroValues["Zero Values"]

    Stringers["Stringers"]
    TypeConversion["Type Conversion"]
    TypeAssertion["Type Assertion"]
    Errors["Errors"]
    FirstClassFunctions["First Class Functions"]

    Basics --> Comments
    Basics --> Numbers
    Basics --> Arithmetic
    Basics --> Booleans

    Comments --> If

    Numbers --> StringsPackage
    Numbers --> Comparison
    Numbers --> If

    Arithmetic --> Strings
    Arithmetic --> Comparison
    Arithmetic --> If

    Booleans --> Packages

    StringsPackage --> Strings
    StringsPackage --> If

    Strings --> StringFormatting
    Strings --> Packages

    If --> Slices
    If --> Variadic

    Comparison --> Switch
    Comparison --> Structs

    Slices --> Randomness
    Variadic --> ForLoops
    Switch --> ForLoops

    ForLoops --> Functions
    ForLoops --> FloatingPoint

    Functions --> Time
    Functions --> Maps

    Time --> Maps

    Maps --> RangeIteration
    Maps --> Pointers

    RangeIteration --> TypeDefinitions

    TypeDefinitions --> Pointers
    TypeDefinitions --> Methods
    TypeDefinitions --> Runes

    Methods --> Runes
    Methods --> RegularExpressions
    Methods --> ZeroValues

    Runes --> ZeroValues

    RegularExpressions --> Interfaces
    RegularExpressions --> Stringers

    Interfaces --> TypeConversion
    Interfaces --> TypeAssertion
    Interfaces --> ZeroValues

    ZeroValues --> Errors

    TypeAssertion --> Errors
    TypeAssertion --> FirstClassFunctions
```

The diagrams above are AI generated and the data is taken from exercism.org

## basics

Statically typed, compiled programming language.

### packages

Apps are composed of packages; a package is bunch of files in one directory. All files in a directory/package belong to one package and there can be only one package in a directory. Subdirectories are internal packages for composition.

Private members' names are `camelCase` and public members are `PascalCase`. 

### Variables

+ Must have type info at compile time.
+ Types can be explicit or implicit.
+ Variable's type cannot change.
+ constans are created via `const` keyword.

### functions

+ Arity: 0+
+ Parameters have types and cannot be implicit.
+ function return type is listed before `{`.

## numbers

How to divide a number by two and get a float?

```go
n := 5
h := float64(n)/2 // h == 2.5
```

How to divide a number by two and get integer quotient?

```go
n := 5
q := n/2 // q == 2
// also
q := int(n)/2
```

## strings

