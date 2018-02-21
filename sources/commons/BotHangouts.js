const hangoutsBot = require("hangouts-bot"),
    config = require('../config/bot'),
    bot = new hangoutsBot(config.email, config.password),
    hangouts = {
        container: [],
        communicator: bot,
        regex: {
            hola: /^[Hh]ola/,
        },
        response: function (options) {
            let duplicated = false;

            hangouts.container.forEach(function (item, index) {
                if (item.id === options.id) {
                    duplicated = true;
                }
            });

            if (!duplicated) {
                hangouts.container.push(options);
            } else {
                console.log("Error: user id en uso"); // aveves pasa que quiere enviar el mismo mensaje dos veces WTF?
            }
        }
    };

class BotHangouts {

    checkTimeForHappyQuestion() {
        hangouts.communicator.on('online', function() {
            hangouts.communicator.sendMessage(config.users, "Es hora de saber como te sientes?");
        });
    }

    automaticResponse() {
        hangouts.response({
            id: "hola",
            condition: function (msg) {
                return hangouts.regex.hola.test(msg);
            },
            action: function (from, msg) {
                return "Hola como estas?, detecto que eres una forma de vida inferior ¿te puedo ayudar con algo?";
            }
        });
    }
}

module.exports = new BotHangouts();