"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    phone: {
        type: String,
        minlength: 5,
    },
    street: {
        type: String,
        required: true,
        minlength: 5,
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
    },
});
exports.Person = (0, mongoose_1.model)('Person', schema);
