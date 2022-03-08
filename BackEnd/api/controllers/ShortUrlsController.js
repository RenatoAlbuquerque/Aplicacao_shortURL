const database = require("../models");

class ShortUrlsController {
  static async pegarTodasUrls(req, res) {
    try {
      const todasURLs = await database.shortURL.findAll({
        order: [["click", "DESC"]],
        include: [{ model: database.Users, attributes: ["nome"] }],
      });
      return res.status(200).json(todasURLs);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarUrlsDeUmUsuario(req, res) {
    try {
      const { user_id } = req.params;
      const userUrls = await database.shortURL.findAll({
        where: { user_id: user_id },
        order: [["click", "DESC"]],
      });

      if (!userUrls) {
        return res.status(404).json("Usuário não possui URLs cadastradas");
      }

      return res.status(200).json(userUrls);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async incrementoVisitas(req, res) {
    const url = req.params.id_url;

    const resultado = await database.shortURL.findOne({
      where: { id: url },
    });
    if (!resultado) return res.status(404).json("Url não encontrada");

    resultado.click++;
    await resultado.save();
    res.send(resultado);
  }

  static async adcFavs(req, res) {
    const urlAtual = req.params.id_url;

    const resultado = await database.shortURL.findOne({
      where: { id: urlAtual },
    });

    if (resultado.favs === false) {
      await resultado.update({ favs: true });
    }
    await resultado.save();
    res.send(resultado);
  }

  static async removeFavs(req, res) {
    const urlAtual = req.params.id_url;

    const resultado = await database.shortURL.findOne({
      where: { id: urlAtual },
    });

    if (resultado.favs === true) {
      await resultado.update({ favs: false });
    }
    await resultado.save();
    res.send(resultado);
  }

  static async criarUrlUsuario(req, res) {
    const { user_id, title } = req.body;

    var text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    var urlShort = `http://speed.io/${text}`;

    try {
      const url = await database.shortURL.create({
        user_id,
        title,
        urlShort,
      });
      return res.status(201).json(url);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async shortURL(req, res) {
    try {
      const { id } = req.body;

      if (!user_id) {
        user_id === null;
      }

      const url = await database.shortURL.create({
        user_id,
        title,
      });
      return res.status(201).json(url);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarUrl(req, res) {
    const { id } = req.params;

    try {
      await database.shortURL.destroy({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ mensagem: `URL deletada` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ShortUrlsController;
