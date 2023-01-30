import TelegramBot, { CallbackQuery } from 'node-telegram-bot-api';
import { IQueryLocateCinema } from '../../types';

export async function showCinemasMap(bot: TelegramBot, chatId: number, query: CallbackQuery): Promise<void> {
	if (!query.data) {
		return;
	}

	const { lat, lon }: IQueryLocateCinema = JSON.parse(query.data);

	await bot.sendLocation(chatId, lat, lon);
}
