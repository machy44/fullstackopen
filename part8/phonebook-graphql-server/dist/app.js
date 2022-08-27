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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const data_1 = require("./data");
const person_1 = require("./models/person");
let persons = [...data_1.personsData];
exports.typeDefs = (0, apollo_server_1.gql) `
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    # Value for the field id is not given as a parameter. Generating an id is better left for the server.
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
    editNumber(name: String!, phone: String!): Person
  }
`;
exports.resolvers = {
    Query: {
        personCount: () => __awaiter(void 0, void 0, void 0, function* () { return person_1.Person.collection.countDocuments(); }),
        allPersons: (root, args) => {
            if (!args.phone) {
                return person_1.Person.find({});
            }
            return person_1.Person.find({ phone: { $exists: args.phone === 'YES' } });
        },
        findPerson: (root, args) => {
            person_1.Person.findOne({ name: args.name });
        },
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city,
            };
        },
    },
    Mutation: {
        addPerson: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const person = new person_1.Person(Object.assign({}, args));
            try {
                person.save();
            }
            catch (error) {
                throw new apollo_server_1.UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return person;
        }),
        editNumber: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const person = yield person_1.Person.findOne({ name: args.name });
            if (!person) {
                return {};
            }
            if (args.phone) {
                person.phone = args.phone;
            }
            try {
                person.save();
            }
            catch (error) {
                throw new apollo_server_1.UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return person;
        }),
    },
};
