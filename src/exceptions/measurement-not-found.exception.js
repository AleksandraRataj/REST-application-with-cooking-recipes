class MeasurementNotFoundException extends Error {
    constructor(message) {
        super(message || "Measure not found!");
        this.status = 404;
    }
}

module.exports = MeasurementNotFoundException;