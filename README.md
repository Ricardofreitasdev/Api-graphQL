# API desenvolvida utilizando NODE com graphQL


## Como rodar a aplicação


1. Clone o repositório
```sh
git clone https://github.com/Ricardofreitasdev/Api-graphQL.git
```


2. Entre na pasta do projeto
```sh
cd Api-graphQL
```

3. Instale as dependencias 
```sh
yarn install
```

4. Banco de dados local (descomente o banco sqlite no arquivo db.js e comente o banco de produção) 
```sh

# Produção;
# const sequelize = new Sequelize(process.env.DATABASE_URL, {
# dialect: "postgres",
#  dialectOptions: {
#    ssl: {
#      rejectUnauthorized: false,
#    },
#  },
# });

# Desenvolvimento
 const sequelize = new Sequelize({
   dialect: "sqlite",
  storage: "./database.sqlite",
 });

```

5. Execute a aplicação 
```sh
yarn start
```

## Libs utilizadas


- apollo-server
- bcrypt
- graphql
- cors
- jsonwebtoken
- pg
- sequelize
- dotenv

## Repositório do Front-end desenvolvido com React.js

https://github.com/Ricardofreitasdev/ReactJs-Login 
