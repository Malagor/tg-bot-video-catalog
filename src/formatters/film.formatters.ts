import { IFilm } from '../types';

export function formatFilmListToHTML(films: IFilm[]): string {
	return films.map((f, i) => `<b>${i + 1}</b> ${f.name} - /f${f.uuid}`).join('\n');
}

export function formatFilmCaption(film: IFilm): string {
	return `
Название: ${film.name}
Жанр: ${film.type}
Год: ${film.year}
Рейтинг: ${film.rate}
Длительность: ${film.length}
Страна: ${film.country}
`;
}

export function formatFavoriteFilmsToHTML(films: IFilm[]): string {
	return films.map((f, i) => `<b>${i + 1}</b> ${f.name} - ${f.rate} - /f${f.uuid}`).join('\n');
}
