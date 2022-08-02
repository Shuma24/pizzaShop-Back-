import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/interface/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');
  if (!token) {
    throw new Error('Telegram token undefiend');
  }
  const chatId = configService.get('CHAT_ID');

  if (!chatId) {
    throw new Error('Telegram chatId undefiend');
  }

  return {
    token,
    chatId,
  };
};
