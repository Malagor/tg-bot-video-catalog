import TelegramBot, { CallbackQuery } from 'node-telegram-bot-api';
import { IQueryShowFilms } from '../../types';
import { getFilmsAndSendMessage } from '../../helpers/film-list.helper';

export async function showFilms(bot: TelegramBot, chatId: number, query: CallbackQuery): Promise<void> {
	if (!query?.data) {
		return;
	}

	let data: IQueryShowFilms;

	try {
		data = JSON.parse(query.data);
	} catch (e) {
		throw new Error();
	}

	await getFilmsAndSendMessage(bot, chatId, {
		uuid: {
			$in: data.filmUuids,
		},
	});
}
