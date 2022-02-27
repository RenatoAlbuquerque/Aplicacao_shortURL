const database = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

class UserController {
  static async pegarTodosUsuarios(req, res) {
    try {
      const todosUsuarios = await database.Users.findAll();
      return res.status(200).json(todosUsuarios);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarUmUsuario(req, res) {
    const { id } = req.params;
    try {
      const umUsuario = await database.Users.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umUsuario);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaUsuario(req, res) {
    const { nome, email, password } = req.body;
    try {
      const emailExists = await database.Users.findOne({
        where: { email: email },
      });

      //Verificação de utilização de nome
      if (!nome) {
        return res.status(500).json("Informe um nome para prosseguir!!");
      }
      //Verificação de e-mail existente
      if (emailExists) {
        return res.status(500).json("Email já cadastrado");
      }

      //Verificação de tamanho de password
      if (password.length < 5) {
        return res
          .status(500)
          .json("A senha precisa ter no minimo 5 caracteres");
      }

      //criptografia do password
      const salt = await bcrypt.genSalt(8);
      const encryptarPassword = await bcrypt.hash(password, salt);

      const novoUsuarioCriado = await database.Users.create({
        nome,
        email,
        password: encryptarPassword,
      });
      return res.status(201).json(novoUsuarioCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarUsuario(req, res) {
    const { id } = req.params;

    try {
      await database.Users.destroy({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ mensagem: `Id ${id} deletado` });
    } catch (error) {
      return res.status(500).json("Id não encontrado");
    }
  }

  static async autenticarUsuario(req, res) {
    const { email, password } = req.body;

    const user = await database.Users.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).json("Email inválido");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json("Password invalido");
    }
    user.password = undefined;

    return res
      .status(200)
      .json({ user, token: generateToken({ id: user.id }) });
  }
}

module.exports = UserController;
