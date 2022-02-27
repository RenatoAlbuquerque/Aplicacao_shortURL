const bodyParser = require("body-parser");
const users = require("./usersRoute");
const shortURL = require("./urlsRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), users, shortURL);
  app.get("/", (req, res) =>
    res.status(200).send({ mensagem: "Bem vindo a API" })
  );
};
