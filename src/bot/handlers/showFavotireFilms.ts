import TelegramBot, { Message } from 'node-telegram-bot-api';
import { isNoEmptyArray, isUser } from '../../helpers/type-guards';
import { getFilms, getUser } from '../../database/DB.service';
import { sendHTML } from '../../helpers/utils';
import { formatFavoriteFilmsToHTML } from '../../formatters/film.formatters';

export async function showFavoriteFilms(bot: TelegramBot, chatId: number, msg: Message) {
	const telegramId = msg.from?.id;
	if (!telegramId) {
		console.log('Нет идентификатора пользователя');
		return;
	}

	getUser({ telegramId })
		.then(async user => {
			if (isUser(user)) {
				const films = await getFilms({
					uuid: {
						$in: user.films,
					},
				});

				await bot.deleteMessage(chatId, msg.message_id.toString());

				const content = isNoEmptyArray(films)
					? '<b>Избранные:</b>\n' + formatFavoriteFilmsToHTML(films)
					: 'Нет фильмов в списке избранных';

				await sendHTML({
					bot,
					chatId,
					content,
					keyboardName: 'home',
				});
			} else {
				throw new Error(`Пользователь не найден.`);
			}
		})
		.catch(e => {
			console.log(e);
		});
}
