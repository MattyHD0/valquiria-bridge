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

    if (this.getArgs(message).length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw "Necesitas hacer una pregunta."
      }

      const responses = [
        // Afirmativas
        "Sí, definitivamente.",
        "Sin duda.",
        "Sí, absolutamente.",
        "Claro, adelante.",
        "Puedes contar con ello.",
        "Sí, por supuesto.",
        "Sí, es probable.",
        "Sí, parece bueno.",
        "Sí, así es.",
        "Definitivamente sí.",
        "Por supuesto.",
        "Indudablemente.",
        "Sí, lo veo así.",
        "Sí, sin ninguna duda.",
        "Sí, lo más probable.",
        "¡Claro que sí!",
        "Absolutamente seguro.",
        "Sí, eso parece.",
        "Sí, por todos los medios.",
        "Sí, eso es correcto.",
        
        // Negativas
        "No lo cuentes.",
        "No cuentes con ello.",
        "Mi respuesta es no.",
        "No, de ninguna manera.",
        "No lo creo.",
        "No, definitivamente no.",
        "No, ni siquiera pienses en ello.",
        "Mis fuentes dicen no.",
        "No, no lo hará.",
        "Lo siento, no.",
        "Mi respuesta es un no rotundo.",
        "No, eso no sucederá.",
        "No, y eso es final.",
        "No, no hay posibilidad.",
        "No, no en un millón de años.",
        "No, olvídalo.",
        "No, ni siquiera lo intentes.",
        "No, lo siento mucho.",
        "No, eso no va a suceder.",
        "No, lo veo muy improbable.",
        
        // Tal vez
        "Respuesta nebulosa, intenta de nuevo.",
        "No puedo predecirlo ahora.",
        "Es posible.",
        "Pregunta de nuevo más tarde.",
        "Concéntrate y pregunta de nuevo.",
        "No estoy seguro, intenta de nuevo.",
        "Es poco claro en este momento.",
        "No puedo responder ahora.",
        "Es incierto.",
        "No puedo decir con certeza."
      ];

        let responsesAmount = responses.length;
        let random = Math.random()*responsesAmount;
        let randomInt = Math.floor(random)

        this.send(`/gc ${responses[randomInt]}`);
    
  }
}

module.exports = EightBallCommand;
