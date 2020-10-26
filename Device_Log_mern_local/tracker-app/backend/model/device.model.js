const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    accountname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
},{
    timestamps: true
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;