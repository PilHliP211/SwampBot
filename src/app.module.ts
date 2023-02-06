import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DISCORD_TOKEN } from './bot/environment.vars';

@Module({
  imports: [
    NecordModule.forRoot({
      token: DISCORD_TOKEN,
      intents: [GatewayIntentBits.Guilds]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
