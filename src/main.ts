import { NestFactory } from '@nestjs/core';
import { DiscordModule } from './bot/discord.module';

async function bootstrap() {
  const app = await NestFactory.create(DiscordModule);
  await app.listen(3000);
}
bootstrap();
