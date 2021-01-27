//Routing - ścieżka która jest połączona z daną funkcja
const {Router} = require("express");
const Measurement = require("../../models/measurement.model");
const asyncHandler = require("../asynchronous-handler");
const MeasurementNotFoundException = require("../../exceptions/measurement-not-found.exception");

const router = new Router();

//GET /api/measurements
router.get('/', asyncHandler(async (req, res) => {
    const measurements = await Measurement.query();
    res.send(measurements);
}));

// GET /api/measurements/2
router.get('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const measurement = await Measurement.query().findById(id);

    if(!measurement) {
        throw new MeasurementNotFoundException();
    }

    res.send(measurement);
}))

// POST /api/measurements
router.post('/', asyncHandler(async (req,res) => {
    const measurements = await Measurement.query().insert({
        measurement: req.body.measurement,
        unit: req.body.unit
    });
    res.status(201).send(measurements);
}));

// PUT /api/measurements/2
router.put('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const updatedMeasurement = await Measurement.query().patchAndFetchById(id, req.body);

    if(!updatedMeasurement) {
        throw new MeasurementNotFoundException();
    }

    res.send(updatedMeasurement);
}));

// DELETE /api/measurements/2
router.delete('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const deletedCount = await Measurement.query().deleteById(id);

    if(deletedCount === 0) {
        throw new MeasurementNotFoundException();
    }

    res.status(204).end();
}));

module.exports = router;