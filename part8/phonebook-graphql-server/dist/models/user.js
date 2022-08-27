"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
exports.User = (0, mongoose_1.model)('User', schema);
