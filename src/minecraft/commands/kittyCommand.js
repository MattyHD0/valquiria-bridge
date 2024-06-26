const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { uploadImage } = require("../../contracts/API/imgurAPI.js");
const axios = require("axios");

class KittyCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "kitty";
    this.aliases = ["cat", "cutecat"];
    this.description = "Random image of cute cat.";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const { data } = await axios.get(`https://api.thecatapi.com/v1/images/search`);

      if (data === undefined) {
        // eslint-disable-next-line no-throw-literal
        throw "Se produjo un error al obtener la imagen. Por favor, inténtelo de nuevo más tarde.";
      }

      const link = data[0].url;
      const upload = await uploadImage(link);

      this.send(`/gc Gatito: ${upload.data.link}`);
    } catch (error) {
      this.send(`/gc [ERROR] ${error ?? "Algo salio mal.."}`);
    }
  }
}

module.exports = KittyCommand;
