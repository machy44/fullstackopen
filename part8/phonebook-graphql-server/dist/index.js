"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_1 = require("apollo-server");
const config_1 = require("./utils/config");
const logger_1 = require("./utils/logger");
const app_1 = require("./app");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./models/user");
const JWT_SECRET = (_a = process.env['SECRET']) !== null && _a !== void 0 ? _a : '';
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
    context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jsonwebtoken_1.default.verify(auth.substring(7), JWT_SECRET);
            const currentUser = yield user_1.User.findById(decodedToken.id).populate('friends');
            return { currentUser };
        }
    }),
});
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
