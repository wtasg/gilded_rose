function findGoodIntegers(n: number): number[] {
    const LIMIT = Math.floor(Math.cbrt(n)) + 1;
    const out = [] as number[];
    if (n < 1729) {
        return out;
    }
    const cubes = new Uint32Array(LIMIT);
    for (let i = 1; i < LIMIT; i++) {
        cubes[i] = i ** 3;
    }
    const map = new Map<number, number>();
    for (let i = 1; i < LIMIT; i++) {
        const smallest = cubes[i];
        if (smallest + smallest > n) {
            break;
        }
        for (let j = i; j < LIMIT; j++) {
            const sum = smallest + cubes[j];
            if (sum > n) {
                break;
            }
            map.set(sum, (map.get(sum) ?? 0) + 1);
        }
    }
    for (const [key, value] of map) {
        if (value > 1) {
            out.push(key);
        }
    }
    return out.sort((a, b) => a - b);
}
