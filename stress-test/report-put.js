import http from 'k6/http';
import { sleep } from 'k6';
import generateRandomId from './randomIdGenerator.js';
import option from './config.js';

let review_id = generateRandomId('reviews');

export const options = option;

export default function () {
  http.put(`http://localhost:8000/reviews/${review_id}/report`);
};