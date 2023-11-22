const minecraftCommand = require("../../contracts/minecraftCommand.js");
const axios = require("axios");

class EightBallCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "8ball";
    this.aliases = ["8b"];
    this.description = "Ask an 8ball a question.";
    this.options = [
      {
        name: "question",
        description: "The question you want to ask the 8ball",
        required: true,
      },
    ];
  }

  async onCommand(username, message) {
    /*try {
      if (this.getArgs(message).length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw "You must provide a question."
      }

      const { data } = await axios.get(`https://www.eightballapi.com/api`);

      this.send(`/gc ${data.reading}`);
    } catch (error) {
      this.send(`/gc Error: ${error}`);
    }*/

    if (this.getArgs(message).length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw "Necesitas hacer una pregunta."
      }

    const responses = [
        "Sí, definitivamente.",
        "No cuentes con ello.",
        "Es probable.",
        "No puedo predecirlo ahora.",
        "Concentra y pregunta de nuevo.",
        "No muy seguro.",
        "Es muy dudoso.",
        "Sí, pero no te ilusiones.",
        "No lo veo bien.",
        "Todo apunta a que sí.",
        "No, de ninguna manera.",
        "Tal vez en el futuro.",
        "La respuesta está en las estrellas.",
        "No lo puedo decir ahora.",
        "Sí, pero no tan rápido.",
        "No apuestes por ello.",
        "Parece prometedor.",
        "No, ni en sueños.",
        "Las perspectivas son buenas.",
        "No confíes demasiado.",
        "¡Por supuesto!",
        "No lo creo.",
        "Pregunta de nuevo más tarde.",
        "No apuestes la granja.",
        "Sí, lo veo claro.",
        "No me hagas reír.",
        "No te preocupes por eso.",
        "Sí, pero con precaución.",
        "No lo tomes muy en serio.",
        "¡Absolutamente no!",
        "Parece poco probable.",
        "En tus sueños.",
        "Podría ser.",
        "No estoy convencido.",
        "Cuenta con ello.",
        "No apuestes contra eso.",
        "Sí, pero con reservas.",
        "No estoy seguro, pregúntame después.",
        "Las señales apuntan a sí.",
        "No lo veo en el horizonte.",
        "No lo descartaría.",
        "Definitivamente no.",
        "Las probabilidades son bajas.",
        "No confíes en ello.",
        "Todo es posible.",
        "No pongas tus esperanzas en eso.",
        "Sí, si las estrellas se alinean.",
        "No cuentes conmigo para eso.",
        "Mi respuesta es borrosa, intenta de nuevo."
        ];

        let responsesAmount = responses.length;
        let random = Math.random()*responsesAmount;
        let randomInt = Math.floor(random)

        this.send(`/gc ${responses[randomInt]}`);
    
  }
}

module.exports = EightBallCommand;
