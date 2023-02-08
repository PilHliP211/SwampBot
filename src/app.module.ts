import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { DISCORD_TOKEN } from './bot/environment.vars';
import { DiscordService } from './bot/discord.service';
import { DiscordModule } from './bot/discord.module';

@Module({
    imports: [
        NecordModule.forRoot({
            token: DISCORD_TOKEN,
            intents: [GatewayIntentBits.GuildMessages]
        }), DiscordModule
    ],
    controllers: [],
    providers: [DiscordService],
})
export class AppModule { }