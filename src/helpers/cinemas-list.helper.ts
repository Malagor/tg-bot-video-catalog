import { sendHTML } from './utils';
import { ICinema, ICinemaWithDistance, ILocation } from '../types';
import { getCinemas } from '../database/DB.service';
import TelegramBot from 'node-telegram-bot-api';
import { isNoEmptyArray } from './type-guards';

export async function getCinemasInCoordAndSendMessage(bot: TelegramBot, chatId: number, location: ILocation) {
	let content = 'Нет информации о кинотеатрах.';
	const cinemas = await getCinemas({});

	if (isNoEmptyArray(cinemas)) {
		let cinemaWithDistance = addDistance(cinemas, location).sort(sortingCinemas);

		content = formatCinemasListToHTML(cinemaWithDistance);
	}

	await sendHTML({ bot, chatId, content, keyboardName: 'home' });
}

export function formatCinemasListToHTML(cinemas: ICinemaWithDistance[]): string {
	return cinemas
		.map((c: ICinemaWithDistance, i: number) => {
			return `<b>${i + 1}</b> ${c.name}. - <em>Расстояние</em> - <strong>${c.distance}}</strong> км. - /c${
				c.uuid
			}`;
		})
		.join('\n');
}

export function formatCinemasListWithoutDistanceToHTML(cinemas: ICinema[]): string {
	return cinemas
		.map((c: ICinema, i: number) => {
			return `<b>${i + 1}</b> ${c.name}. - /c${c.uuid}`;
		})
		.join('\n');
}

function getDistance(point1: ILocation, point2: ILocation): number {
	const { latitude: lat1, longitude: long1 } = point1;
	const { latitude: lat2, longitude: long2 } = point2;

	const distance = Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(long1 - long2, 2)) * 100;

	return Math.round(distance * 1000) / 1000;
}

function addDistance(cinemas: ICinema[], location: ILocation): ICinemaWithDistance[] {
	return cinemas.map(c => {
		let newC = JSON.parse(JSON.stringify(c));
		return {
			...newC,
			distance: getDistance(location, c.location),
		};
	});
}

function sortingCinemas(a: ICinemaWithDistance, b: ICinemaWithDistance): number {
	return a.distance - b.distance;
}
