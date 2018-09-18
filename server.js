const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');
const userRepository = require('./user-repository');
const roleRepository = require('./role-repository');

const userRepositoryInstance = new userRepository();
const roleRepositoryInstance = new roleRepository();
// console.log(userRepositoryInstance.create({login: "test_user", firstName: "test", lastName: "user"}));
const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    login: {
      type: new GraphQLNonNull(GraphQLString)
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    roles: {
      type: RoleType,
      resolve: (user) => roleRepositoryInstance.findByUserId(user.id)
    }
  }
})

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        login: {
          type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (args) => userRepositoryInstance.create(args)
    }
  }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => userRepositoryInstance.findAll()
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (user, args) => userRepositoryInstance.findOneById(args.id)
    }
  }
})

const schema = new GraphQLSchema ({
  query: QueryType,
  mutation: MutationType

})

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));