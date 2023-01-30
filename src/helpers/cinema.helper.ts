import { sendHTML } from './utils';
import { FilterQuery } from 'mongoose';
import { ICinema, ISendOptions } from '../types';
import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';
import { getOneCinema } from '../database/DB.service';
import { formatCinemaInfo } from '../formatters/cinema.formatters';
import { ACTIONS } from '../bot/handlers/bot.constants';
import { isCinema } from './type-guards';

export async function getOneCinemaAndSendMessage<T>(
	bot: TelegramBot,
	chatId: number,
	query: FilterQuery<T>
): Promise<void> {
	const options: ISendOptions = {
		bot,
		chatId,
		content: '',
		keyboardName: 'films',
	};

	const cinema = await getOneCinema(query);

	if (!isCinema(cinema)) {
		options.content = 'Кинотеатр не был найден';
		await sendHTML(options);
		return;
	}

	options.content = formatCinemaInfo(cinema);

	await sendCinemaInfo(cinema, options);
}

export async function sendCinemaInfo(cinema: ICinema, options: ISendOptions): Promise<void> {
	const { bot, chatId, content } = options;

	const option: SendMessageOptions = {
		parse_mode: 'HTML',
	};

	addKeyboardInCinema(option, cinema);

	await bot.sendMessage(chatId, content, option);
}

function addKeyboardInCinema(option: SendMessageOptions, cinema: ICinema): void {
	option.reply_markup = {
		inline_keyboard: [
			[
				{ text: cinema.name, url: cinema.url },
				{
					text: 'Показать на карте',
					callback_data: JSON.stringify({
						type: ACTIONS.ShowCinemasMap,
						lat: cinema.location.latitude,
						lon: cinema.location.longitude,
					}),
				},
			],
			[
				{
					text: `Показать фильмы `,
					callback_data: JSON.stringify({
						type: ACTIONS.ShowFilms,
						filmUuids: cinema.films,
					}),
				},
			],
		],
		resize_keyboard: true,
	};
}
