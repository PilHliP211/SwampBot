import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GUILD_ID } from '../environment.vars';

@Injectable()
export class AppCommands {
    @SlashCommand({
        name: 'ping',
        description: 'Ping-Pong Command',
        guilds: [GUILD_ID]
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return interaction.reply({ content: 'Pong!' });
    }
}