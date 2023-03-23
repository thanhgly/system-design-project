import http from 'k6/http';
import { sleep } from 'k6';
import generateRandomId from './randomIdGenerator.js';
import option from './config.js';

let product_id = generateRandomId();

export const options = option;

export default function () {
  http.get(`http://localhost:8000/reviews/meta/?product_id=${product_id}`);
};
