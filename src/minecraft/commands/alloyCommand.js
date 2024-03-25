const minecraftCommand = require("../../contracts/minecraftCommand.js");
const config = require("../../../config.json");
// eslint-disable-next-line
const axios = require("axios");

class AlloyCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "alloy";
    this.aliases = ["lastalloy"];
    this.description = "Get last dropped alloy.";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const lastDroppedAlloy = (
        await axios.get(`https://ninjune.dev/api/alloy-drop/last`)
      ).data;
      
      const difference = Date.now()-lastDroppedAlloy;

      let hoursDifferenceDouble = difference/1000/60/60;

      let hours = Math.floor(hoursDifferenceDouble);
      let minutes = Math.floor(hoursDifferenceDouble%60)

      this.send(`/gc Ultimo Divan's Alloy dropeado hace ${hours} horas y ${minutes} minutos`);

    } catch (error) {
      this.send(`/gc Error: ${error ?? "Algo salio mal..."}`);
    }
  }
}

module.exports = AlloyCommand;
