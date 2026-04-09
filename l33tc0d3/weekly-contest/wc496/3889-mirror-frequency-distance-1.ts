function generateMirror(alphabet: string): Record<string, string> {
    const mirror = {} as Record<string, string>;
    let l = 0, r = alphabet.length - 1;
    while (l <= r) {
        mirror[alphabet[l]] = alphabet[r];
        mirror[alphabet[r]] = alphabet[l];
        l++;
        r--;
    }
    return mirror;
}

const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numAlphabet = "0123456789";
const lower = generateMirror(lowerAlphabet);
const upper = generateMirror(upperAlphabet);
const num = generateMirror(numAlphabet);

function frequency(input: string): Map<string, number> {
    const f = new Map<string, number>();
    for (const char of input) {
        f.set(char, (f.get(char) ?? 0) + 1);
    }
    return f;
}

function mirrorFrequency(str: string): number {
    const freq = frequency(str);
    // console.log({ freq });

    const seen = new Set<string>();
    const distances = [] as Array<[number, number]>;
    for (const char of freq.keys()) {
        if (!seen.has(char)) {
            seen.add(char);
            if (lowerAlphabet.includes(char)) {
                seen.add(lower[char]);
                distances.push([freq.get(char) ?? 0, freq.get(lower[char]) ?? 0]);
            } else if (upperAlphabet.includes(char)) {
                seen.add(upper[char]);
                distances.push([freq.get(char) ?? 0, freq.get(upper[char]) ?? 0]);
            } else if (numAlphabet.includes(char)) {
                seen.add(num[char]);
                distances.push([freq.get(char) ?? 0, freq.get(num[char]) ?? 0]);
            }
        }
    }
    return distances.reduce((acc, [a, b]) => acc + Math.abs(a - b), 0);
}
