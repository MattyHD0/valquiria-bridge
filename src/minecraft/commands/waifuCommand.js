const minecraftCommand = require("../../contracts/minecraftCommand.js");
const config = require("../../../config.json");
// eslint-disable-next-line
const { ImgurClient } = require("imgur");
const client = new ImgurClient({ clientId: config.minecraft.API.imgurAPIkey });
const axios = require("axios");

class WaifuCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "waifu";
    this.aliases = [];
    this.description = "Random image of waifu.";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const link = (
        //await axios.get(`https://api.waifu.pics/sfw/waifu`) Old api
        await axios.get(`https://api.waifu.im/search?included_tags=waifu`) // new api :eyes:
      ).data.images[0].url;
      
      const upload = await client.upload({ image: link, type: "stream" });

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

module.exports = WaifuCommand;
