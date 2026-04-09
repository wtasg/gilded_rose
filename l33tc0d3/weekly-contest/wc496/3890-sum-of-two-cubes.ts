function findGoodIntegers(n: number): number[] {
    const out = [];
    if (n < 1729) {
        return out;
    }
    const cubes = new Uint32Array(1001);
    for (let i = 0; i < 1001; i++) {
        cubes[i] = i * i * i;
    }
    const map = new Map<number, Array<[number, number]>>();
    for (let i = 1; i < 1001; i++) {
        for (let j = i; j < 1001; j++) {
            const sum = cubes[i] + cubes[j];
            if (sum > n) {
                break;
            }
            map.set(sum, (map.get(sum) ?? []));
            map.get(sum).push([i, j]);
        }
    }
    for (const [key, value] of map.entries()) {
        if (value.length > 1) {
            out.push(key);
        }
    }
    return out.sort((a, b) => a - b);
}
