var _require = require('graphql'),
    graphql = _require.graphql,
    buildSchema = _require.buildSchema;

var schema = buildSchema('\n  type Query {\n    hello: String\n  }\n');

var root = { hello: function hello() {
    return 'Hello world!';
  } };

graphql(schema, '{ hello }', root).then(function (response) {
  console.log(response);
});