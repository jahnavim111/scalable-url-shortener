const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encode(num) {
    let n = BigInt(num);
    let str = "";
    while (n > 0n) {
        str = chars[Number(n % 62n)] + str;
        n = n / 62n;
    }
    return str || "0";
}

module.exports = { encode };
