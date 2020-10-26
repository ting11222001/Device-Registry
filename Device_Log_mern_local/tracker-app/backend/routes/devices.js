const router = require('express').Router();
let Device = require('../model/device.model');

router.route('/').get((req, res) => {
    Device.find()
    .then(devices => res.json(devices))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const accountname = req.body.accountname;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newDevice = new Device({
        accountname,
        description,
        duration,
        date
    });

    newDevice.save()
    .then(() => res.json('Device added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Device.findById(req.params.id)
    .then(device => res.json(device))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Device.findByIdAndDelete(req.params.id)
    .then(() => res.json('Device deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Device.findById(req.params.id)
    .then(device => {
        device.username = req.body.accountname;
        device.description = req.body.description;
        device.duration = Number(req.body.duration);
        device.date = Date.parse(req.body.date);

        device.save()
        .then(() => res.json('Device updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;