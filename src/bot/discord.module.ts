import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { GatewayIntentBits } from 'discord.js';
import { DISCORD_DEVELOPMENT_GUILD_ID, DISCORD_TOKEN } from './environment.vars';
import { AppCommands } from './commands/app-commands.service';

@Module({
    imports: [
        NecordModule.forRoot({
            token: DISCORD_TOKEN,
            intents: [GatewayIntentBits.GuildMessages],
            development: [DISCORD_DEVELOPMENT_GUILD_ID]
        })
    ],
    providers: [DiscordService, AppCommands]
})
export class DiscordModule { }