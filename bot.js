// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            if(context.activity.text =="Chris"){
              context.sendActivity('Hi Friend!!');
            } else if(context.activity.text == "Marley" || context.activity.text =="Zax"){
              context.sendActivity("Aren't you a good dog");
            } else {
              context.sendActivity("I don't think we've met. I only know Chris, Zax and Marley");
            };

            // By calling next() you ensure that the next BotHandler is run.
            await next();
            context.sendActivity("Anyone else here?");
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity("Hello, what's your name?");
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.MyBot = MyBot;
