"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_1 = require("apollo-server");
const config_1 = require("./utils/config");
const logger_1 = require("./utils/logger");
const app_1 = require("./app");
(0, logger_1.info)('connecting to', config_1.MONGODB_URI);
mongoose_1.default
    .connect(String(config_1.MONGODB_URI))
    .then(() => {
    (0, logger_1.info)('connected to MongoDB');
})
    .catch((error) => {
    (0, logger_1.error)('error connecting to MongoDB:', error.message);
});
const server = new apollo_server_1.ApolloServer({
    typeDefs: app_1.typeDefs,
    resolvers: app_1.resolvers,
});
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
