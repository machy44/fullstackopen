"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Person',
        },
    ],
});
module.exports = (0, mongoose_1.model)('User', schema);
