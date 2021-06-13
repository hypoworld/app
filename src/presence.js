const startTimestamp = Date.now();

const updatePres = (startTimestamp) => {
    const client = require('discord-rich-presence')('830878178972794880');
    
    try{
        client.updatePresence({
          state: 'Hypoworld.nl',
          startTimestamp: startTimestamp,
          largeImageKey: 'hypoicon',
          smallImageKey: 'snek_small',
          instance: true,
        	buttons: [
            { "label": "Discord", "url": "https://hypoworld.nl/discord" },
            { "label": "Ga naar Hypo", "url": "https://hypoworld.nl" }
        ]
        });
    }catch(err){
        console.log(err);
    }
}

updatePres(startTimestamp);

setInterval(() => {
    updatePres(startTimestamp);
}, 60000);