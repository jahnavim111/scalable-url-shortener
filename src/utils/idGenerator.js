// A simplified Snowflake-like ID generator
class IdGenerator {
    constructor(workerId) {
        this.workerId = BigInt(workerId); // Unique ID for this server node
        this.epoch = BigInt(1704067200000); // Jan 1, 2024
        this.sequence = 0n;
        this.lastTimestamp = -1n;
    }

    generate() {
        let timestamp = BigInt(Date.now());

        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1n) & 4095n; // 12 bits for sequence
            if (this.sequence === 0n) {
                while (timestamp <= this.lastTimestamp) {
                    timestamp = BigInt(Date.now());
                }
            }
        } else {
            this.sequence = 0n;
        }

        this.lastTimestamp = timestamp;

        // Shift bits: [Timestamp (42)][Worker (10)][Sequence (12)]
        const id = ((timestamp - this.epoch) << 22n) |
                   (this.workerId << 12n) |
                   this.sequence;
        
        return id.toString();
    }
}

module.exports = IdGenerator;
