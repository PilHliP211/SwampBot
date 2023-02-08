import { Injectable } from '@nestjs/common'
import { Context, SlashCommand, SlashCommandContext } from 'necord'

@Injectable()
export class AppCommandsService {
    @SlashCommand({
        name: 'ping',
        description: 'Ping-Pong Command'
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return await interaction.reply({ content: 'Pong!' })
    }
}
