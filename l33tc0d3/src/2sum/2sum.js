/**
 *
 * @param {number[]} numbers
 * @param {number} target
 * @return {[number, number]|[-1,-1]|[-2,-2]|[-3,-3]}
 */
function twoSum(numbers, target) {
    if (numbers === undefined || numbers === null || target === undefined || target === null) {
        return [-1, -1];
    }
    if (!Array.isArray(numbers) || typeof target !== "number") {
        return [-2, -2];
    }
    const diffs = [];
    for (let i = 0; i < numbers.length; i++) {
        const diff = target - numbers[i];
        if (diffs.includes(numbers[i])) {
            return [diffs.indexOf(numbers[i]), i];
        }
        diffs.push(diff);
    }
    return [-3, -3];
}

module.exports = {
    twoSum
}
