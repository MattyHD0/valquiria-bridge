const minecraftCommand = require("../../contracts/minecraftCommand.js");
const config = require("../../../config.json");
// eslint-disable-next-line
const { uploadImage } = require("../../contracts/API/imgurAPI.js");
const axios = require("axios");

class Rule34Command extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "rule34";
    this.aliases = ["r34"];
    this.description = "Random image from r34 query.";
    this.options = [];
  }

  usersWithelist = [
    "MattyHD0",
    "sBlacky_",
    "WanderingAka"
  ]

  async onCommand(username, message) {
    try {
      
      if(!this.usersWithelist.includes(username)){
        this.send(`/gc ¡No tienes suficiente poder para invocar este tipo de magia (☞ﾟヮﾟ)☞!`);
        return;
      }
      
      let query = this.getArgs(message)[0]
      
      if(query == undefined){
        this.send(`/gc ¡Tienes que decirme que debo buscar!`);
        return;
      }

      const posts = (
                await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${query}`)
      ).data;
      
      let postsAmount = posts.length;
      let selectedPost = Math.floor(Math.random()*postsAmount);
      let imageUrl = posts[selectedPost].sample_url;
      
      if(imageUrl == undefined){
        this.send(`/gc ¡No encontre ningun resultado! :(`);
        return;
      }

      const upload = await uploadImage();

      if(upload.data == undefined){
        this.send(`/gc No se pudo subir la imagen a imgur...`);
        return;
      }

      
      this.send(`/gc Toma tu imagen pinche puerco >-< ${upload.data.link}`);
    } catch (error) {
      this.send(`/gc Error: ${error ?? "Algo salio mal..."}`);
    }
  }
}

module.exports = Rule34Command;
