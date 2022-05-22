(async () => {
  require("dotenv").config();
  const { ApolloServer } = require("apollo-server");
  const { typeDefs, resolvers } = require("./src/graphql");

  const database = require("./db");

  const User = require("./model/users.js");
  await database.sync();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      if (err.message.startsWith("Usuario já existe")) {
        return new Error(err.message);
      }
      if (err.message.startsWith("expirou")) {
        return new Error(err.message);
      }

      if (err.message.startsWith("E-mail ou senha")) {
        return new Error(err.message);
      }

      if (err.message.startsWith("Usuário bloqueado")) {
        return new Error(err.message);
      }

      if (err.message.startsWith("Login inválido")) {
        return new Error(err.message);
      }
    },
  });

  server
    .listen(process.env.PORT || 4000)
    .then(({ url }) => console.log("SERVER RUN: " + url));
})();
