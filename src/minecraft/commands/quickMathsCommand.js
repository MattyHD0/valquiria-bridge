const minecraftCommand = require("../../contracts/minecraftCommand.js");
const config = require("../../../config.json");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getAnswer = (message) => {
  if (message.includes(config.minecraft.bot.messageFormat)) {
    return message.split(config.minecraft.bot.messageFormat)[1].trim();
  }

  return message.split(": ")[1];
};

class QuickMathsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "quickmaths";
    this.aliases = ["qm"];
    this.description = "Solve the equation in less than 10 seconds! Test your math skills!";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const userUsername = username;
      const operands = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      const operators = ["+", "-", "*"];
      const operator = operators[Math.floor(Math.random() * operators.length)];

      const equation = `${operands[0]} ${operator} ${operands[1]}`;
      const answer = eval(operands.join(operator));
      const headStart = 250;

      this.send(`/gc ${username} Cuanto es ${equation}? (Tienes ${headStart}ms de ventaja)`);
      await delay(headStart);

      const startTime = Date.now();
      let answered = false;

      const listener = (username, message) => {
        if (getAnswer(message) !== answer.toString()) {
          return;
        }

        answered = true;
        this.send(`/gc ${userUsername} Correcto! Te tomo ${(Date.now() - startTime).toLocaleString()}ms`);
        bot.removeListener("chat", listener);
      };

      bot.on("chat", listener);

      setTimeout(() => {
        bot.removeListener("chat", listener);

        if (!answered) {
          this.send(`/gc ${userUsername} ¡Se acabó el tiempo! La respuesta es ${answer}`);
        }
      }, 10000);
    } catch (error) {
      this.send(`/gc ${username} [ERROR] ${error || "Algo salio mal.."}`);
    }
  }
}

module.exports = QuickMathsCommand;
