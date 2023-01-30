import TelegramBot, { Message } from 'node-telegram-bot-api';
import * as helper from '../../helpers/utils';
import { BUTTONS as kb } from '../../keyboard/keyboard-buttons';
import { sendHTML } from '../../helpers/utils';
import { messageMap, messageWithQuery } from './bot.constants';
import { getFilmsAndSendMessage } from '../../helpers/film-list.helper';
import { getCinemasInCoordAndSendMessage } from '../../helpers/cinemas-list.helper';
import { showFavoriteFilms } from './showFavotireFilms';

export async function onMessage(bot: TelegramBot, msg: Message) {
	const chatId = helper.getChatId(msg);

	switch (msg.text) {
		case kb.home.favourite:
			await showFavoriteFilms(bot, chatId, msg);
			break;
		case kb.home.films:
		case kb.home.cinemas:
		case kb.back:
			await sendHTML({
				bot,
				chatId,
				content: messageMap[msg.text].content,
				keyboardName: messageMap[msg.text].keyboardName,
			});
			break;
		case kb.films.comedy:
		case kb.films.action:
		case kb.films.random:
			await getFilmsAndSendMessage(bot, chatId, { ...messageWithQuery[msg.text] });
			break;
		default:
	}

	if (msg?.location) {
		await getCinemasInCoordAndSendMessage(bot, chatId, msg.location);
	}
}
