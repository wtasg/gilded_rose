function atoi(input) {
    if (input === undefined || input === null || typeof input !== "string" || input.trim() === "") {
        return 0;
    }

    const trimmed = input.trim();
    const len = trimmed.length;
    const hasSign = trimmed[0] === "-" || trimmed[0] === "+";
    const isNegative = hasSign && trimmed[0] === "-";
    let start = hasSign ? 1 : 0;
    while (trimmed[start] === "0") {
        start++;
    }
    let foundNonDigit = false;
    let num = 0;
    for (let i = start; i < len && !foundNonDigit; i++) {
        const digit = trimmed[i];
        if (digit < "0" || digit > "9") {
            foundNonDigit = true;
        } else {
            num = num * 10 + parseInt(digit);
        }
    }
    num = isNegative ? -1 * num : num;
    if (num < -1 * Math.pow(2, 31)) {
        num = -1 * Math.pow(2, 31);
    }
    if (num > (Math.pow(2, 31) - 1)) {
        num = Math.pow(2, 31) - 1;
    }
    return num;
}

module.exports = {
    atoi
};
