import { Module } from '@nestjs/common'
import { DiscordModule } from './bot/discord.module'

@Module({
    imports: [DiscordModule],
    controllers: [],
    providers: []
})
export class AppModule { }
