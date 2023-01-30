import TelegramBot, { CallbackQuery } from 'node-telegram-bot-api';
import { IQueryShowCinemas } from '../../types';
import { getCinemas } from '../../database/DB.service';
import { isNoEmptyArray } from '../../helpers/type-guards';
import { sendHTML } from '../../helpers/utils';
import { formatCinemasListWithoutDistanceToHTML } from '../../helpers/cinemas-list.helper';

export async function showCinemas(bot: TelegramBot, chatId: number, query: CallbackQuery): Promise<void> {
	if (!query.data) {
		return;
	}

	let data: IQueryShowCinemas;

	try {
		data = JSON.parse(query.data);
	} catch (e) {
		throw new Error(`Нет даты в объекте запроса.\n${e}`);
	}

	const cinemas = await getCinemas({
		uuid: {
			$in: data.cinemaUuids,
		},
	});

	let content: string;

	if (isNoEmptyArray(cinemas)) {
		content = formatCinemasListWithoutDistanceToHTML(cinemas);
	} else {
		content = 'Не найдено кинотеатров где показывают жанных фильм';
	}

	await sendHTML({
		bot,
		chatId,
		content,
		keyboardName: 'home',
	});
}
