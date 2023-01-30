import { ICinema, IFilm, IUser } from '../types';

export function isNoEmptyArray(arr: any[] | void): arr is any[] {
	return Array.isArray(arr) && arr.length !== 0;
}

export function isFilm(film: IFilm | void): film is IFilm {
	return film?.uuid !== undefined;
}

export function isCinema(cinema: ICinema | void): cinema is ICinema {
	return cinema?.uuid !== undefined;
}

export function isUser(user: IUser | void): user is IUser {
	return user?.telegramId !== undefined;
}
