import TelegramBot, { InlineQuery, InlineQueryResultPhoto } from 'node-telegram-bot-api';
import { getFilms } from '../../database/DB.service';
import { isNoEmptyArray } from '../../helpers/type-guards';
import { formatFilmCaption } from '../../formatters/film.formatters';

export async function inlineQuery(bot: TelegramBot, query: InlineQuery): Promise<void> {
	const films = await getFilms({});

	if (!isNoEmptyArray(films)) {
		return;
	}

	const result: InlineQueryResultPhoto[] = films.map(film => {
		const caption = formatFilmCaption(film);

		return {
			id: film.uuid,
			type: 'photo',
			photo_url: film.picture || '',
			thumb_url: film.picture || '',
			caption,
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: `Кинопоиск: ${film.name}`,
							url: film.link,
						},
					],
				],
			},
		};
	});

	await bot.answerInlineQuery(query.id, result, {
		cache_time: 300,
	});
}
