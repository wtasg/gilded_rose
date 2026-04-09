# Quiz: Advanced TypeScript

## 2026.04.07 Questions

1. Conditional type inference\
   Given the type
   `type Return<T> = T extends (...args: any[]) => infer R ? R : never;`, how
   would you modify it to infer the promise unwrapped return type recursively
   (i.e., `Promise<Promise<string>>` → `string`)?

2. Variance and function parameters\
   Why does the following code produce a type error, and how would you fix it
   while keeping the function signatures identical?

   ```ts
   type Animal = { name: string };
   type Dog = Animal & { bark(): void };

   let animalHandler: (a: Animal) => void = (d: Dog) => d.bark();
   ```

3. Template literal types & string manipulation\
   Write a type `DeepPath<T>` that produces all possible dot-notation paths into
   a nested object (including arrays indexed by number), e.g., for
   `{ a: { b: string }, c: number[] }` it should allow `"a.b"` and `"c.0"`.

4. Distributive conditional types\
   Explain why `type IsArray<T> = T extends any[] ? true : false` behaves
   differently for `IsArray<string | number[]>` vs `IsArray<number[] | string>`.
   How would you prevent distribution?

5. `never` in conditional types\
   What does the following evaluate to, and why?

   ```ts
   type Foo<T> = T extends { a: infer U } ? U : never;
   type Bar = Foo<{ a: { b: 1 } } | { a: { c: 2 } }>;
   ```

6. Readonly mapped types with `-readonly`\
   Write a type `MutableDeep<T>` that recursively removes `readonly` modifiers
   from all properties and subproperties, but only if the property is not a
   function (functions should remain unchanged).

7. `this` parameter type narrowing\
   How can you implement a method in a class that uses a `this` parameter to
   restrict a callback's receiver type, ensuring the callback cannot
   accidentally reference the wrong `this` context?

8. Overloads vs conditional return types\
   When would you choose function overloads over a conditional return type with
   a generic? Provide a concrete example where overloads are necessary because
   conditional types would be too permissive.

9. Type predicates with unions\
   Why does `function isFish(pet: Fish | Bird): pet is Fish { ... }` narrow the
   type correctly, but the following fails to narrow the union after
   `if(isFish(animal))`?

   ```ts
   function isFishOrBird(pet: Fish | Bird): pet is Fish | Bird { ... }
   ```

10. Higher‑order type inference from generic functions\
    Given `function wrap<T>(fn: (arg: T) => void): (arg: T) => void`, TypeScript
    cannot infer `T` when `wrap` is called with a generic callback like
    `<U>(x: U) => void`. How would you rewrite `wrap` to preserve the generic
    parameter of the input function?

---

## Answers

### 2026.04.07 Answers

1. Use built in `Awaited<T>`
   `type Return<T> = T extends (...args: any[]) => infer R ? Awaited<R> : never;`

2. `is Dog`

   ```ts
   function isDog(a: Animal): a is Dog {
       return typeof (a as Dog).bark === "function";
   }

   let animalHandler: (a: Animal) => void = (a: Animal) => {
       if (isDog(a)) {
           a.bark();
       }
   };
   ```

3. LMAO types

    ```ts
    type NestedPath<T> =
        T extends object
        ? {
            [K in keyof T & (string | number)]:
                T[K] extends readonly (infer U)[]
                ? `${K}` | `${K}.${number}` | `${K}.${number}.${NestedPath<U>}`
                : T[K] extends object ? `${K}` | `${K}.${NestedPath<T[K]>}` : `${K}`;
        }[keyof T & (string | number)]
        : never;
    ```

    Expanded

    ```ts
    type Key = string | number;

    type Join<K extends Key, P> = 
    P extends Key ? `${K}.${P}` : never;

    type ArrayPaths<K extends Key, T> =
    | `${K}`
    | `${K}.${number}`
    | Join<`${K}.${number}`, NestedPath<T>>;

    type ObjectPaths<K extends Key, T> =
    | `${K}`
    | Join<K, NestedPath<T>>;

    type NestedPath<T> =
    T extends object
        ? {
            [K in keyof T & Key]:
            T[K] extends readonly (infer U)[]
                ? ArrayPaths<K, U>
                : T[K] extends object
                ? ObjectPaths<K, T[K]>
                : `${K}`;
        }[keyof T & Key]
        : never;
    ```
