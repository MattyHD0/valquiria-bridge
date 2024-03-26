const minecraftCommand = require("../../contracts/minecraftCommand.js");
const config = require("../../../config.json");
// eslint-disable-next-line
const { uploadImage } = require("../../contracts/API/imgurAPI.js");
const axios = require("axios");

class SexoCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "sexo";
    this.aliases = [];
    this.description = "Random image of ero waifu.";
    this.options = [];
  }

  usersWithelist = [
    "MattyHD0",
    "sBlacky_",
    "WanderingAka"
  ]

  async onCommand(username, message) {
    try {
      const link = (
        //await axios.get(`https://api.waifu.pics/sfw/waifu`) Old api
        await axios.get(`https://api.waifu.im/search?included_tags=ero`) // new api :eyes:
      ).data.images[0].url;
      
      if(!this.usersWithelist.includes(username)){
        this.send(`/gc ¡No tienes suficiente poder para invocar este tipo de magia (☞ﾟヮﾟ)☞!`);
        return;
      }

      const upload = await uploadImage(link);

      if(upload.data == undefined){
        this.send(`/gc No se pudo subir la imagen a imgur...`);
        return;
      }

      
      this.send(`/gc Waifu: ${upload.data.link}`);
    } catch (error) {
      this.send(`/gc Error: ${error ?? "Algo salio mal..."}`);
    }
  }
}

module.exports = SexoCommand;
