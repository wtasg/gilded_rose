/**
 *
 * @param {number[]} numbers
 * @param {number} target
 * @return {[number, number]|[-1,-1]|[-2,-2]|[-3,-3]|[-4,-4]}
 */
function twoSum(numbers, target) {
    if (!numbers || target === undefined) {
        return [-1, -1];
    }
    if (!Array.isArray(numbers) || typeof target !== "number") {
        return [-2, -2];
    }
    if (numbers.length === 0) {
        return [-3, -3];
    }
    const len = numbers.length;
    const map = {};
    for (let i = 0; i < len; i++) {
        const curr = numbers[i];
        const diff = target - curr;
        const index = map[diff];
        if (index !== undefined) {
            return [index, i];
        }
        map[curr] = i;
    }
    return [-4, -4];
}

module.exports = {
    twoSum
}
