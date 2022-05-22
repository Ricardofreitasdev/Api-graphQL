const User = require("../../../../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BLOCKED_LOGIN = 4;

module.exports = {
  Query: {
    user: async (_, args) => {
      const token = args.token;

      if (!token) {
        throw new Error(`expirou`);
      }

      const email = jwt.verify(
        token,
        process.env.SECRET || "123456",
        (err, decoded) => {
          if (err) {
            throw new Error(`expirou`);
          }

          return decoded.email;
        }
      );

      const user = await User.findOne({ where: { email } });
      if (user) return user;
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const { email } = args;

      const exist = await User.findOne({ where: { email } });

      if (exist) {
        throw new Error(`Usuario já existe`);
      }

      const hashPassword = await bcrypt.hash(args.password, 10);

      const token = jwt.sign(
        { email: args.email },
        process.env.SECRET || "123456"
      );

      const response = await User.create({
        name: args.name,
        email: args.email,
        password: hashPassword,
        token: token,
      });

      return response;
    },

    valid: async (_, args) => {
      const { email, password } = args;

      const exist = await User.findOne({
        where: {
          email,
        },
      });

      if (!exist) {
        throw new Error(`Login inválido`);
      }

      const validPass = await bcrypt.compare(password, exist.password);

      if (!exist.active) {
        throw new Error(`Usuário bloqueado`);
      }

      if (!validPass) {
        exist.loginError++;
        await exist.save();

        if (exist.loginError >= BLOCKED_LOGIN) {
          exist.active = false;
          await exist.save();
          throw new Error(`Usuário bloqueado`);
        }

        throw new Error(
          `E-mail ou senha inválida, restam ${
            BLOCKED_LOGIN - exist.loginError
          } tentivas`
        );
      }

      if (validPass) {
        const token = jwt.sign(
          { email: args.email },
          process.env.SECRET || "123456"
        );

        exist.loginError = 0;
        exist.token = token;
        await exist.save();

        return exist;
      }
    },
  },
};
