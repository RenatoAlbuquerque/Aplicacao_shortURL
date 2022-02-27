const { Router } = require("express");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/auth");
const router = Router();

//Rotas utilizadas no Front
router.post("/users", UserController.criaUsuario);
router.post("/users/auth", UserController.autenticarUsuario);
//Rotas de teste
router.get("/users/:id", authMiddleware, UserController.pegarUmUsuario);
router.get("/users", UserController.pegarTodosUsuarios);
router.delete("/users/:id", authMiddleware, UserController.deletarUsuario);

module.exports = router;
