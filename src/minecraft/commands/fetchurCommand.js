const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { getFetchur } = require("../../../API/functions/getFetchur.js");

class FetchurCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "fetchur";
    this.aliases = [];
    this.description = "Information about an item for Fetchur.";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const { text, description } = getFetchur();

      this.send(`/gc Solicitudes de Fetchur: ${text} | Descripcion: ${description}`);
    } catch (error) {
      this.send(`/gc [ERROR] ${error || "Algo salió mal..."}`);
    }
  }
}

module.exports = FetchurCommand;
