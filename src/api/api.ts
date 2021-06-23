import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

export const API_URL = 'https://pokeapi.co/api/v2';

export const api = axios.create({
  responseType: 'json',
  timeout: 7000,
  adapter: cache.adapter,
});
