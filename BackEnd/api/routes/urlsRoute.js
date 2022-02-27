const { Router } = require("express");
const ShortUrlsController = require("../controllers/ShortUrlsController");

const router = Router();

//Rotas utilizadas no Front
router.get("/urls", ShortUrlsController.pegarTodasUrls);
router.get("/pessoas/:user_id/urls", ShortUrlsController.pegarUrlsDeUmUsuario);
router.get("/urls/clicks/:id_url", ShortUrlsController.incrementoVisitas);
router.post("/pessoas/urls", ShortUrlsController.criarUrlUsuario);
router.delete("/pessoas/:user_id/urls/:id", ShortUrlsController.deletarUrl);

module.exports = router;
