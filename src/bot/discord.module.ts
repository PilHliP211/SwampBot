import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { GatewayIntentBits } from 'discord.js';
import { DISCORD_DEVELOPMENT_GUILD_ID, DISCORD_TOKEN } from './environment.vars';

@Module({
    imports: [
        NecordModule.forRoot({
            token: DISCORD_TOKEN,
            intents: [GatewayIntentBits.Guilds],
            development: [DISCORD_DEVELOPMENT_GUILD_ID]
        })
    ],
    providers: [DiscordService]
})
export class DiscordModule { }