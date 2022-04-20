import { ALBUMS_URL } from '../constants/urls';

export const getAlbums = async (param) => {
  try {
    const response = await fetch(ALBUMS_URL(param));

    return response.json();
  } catch {
    throw new Error("Api Error!");
  }
};