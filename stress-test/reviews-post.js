import http from 'k6/http';
import { sleep } from 'k6';
import generateRandomId from './randomIdGenerator.js';
import option from './config.js';

let product_id = generateRandomId();

export const options = option;

export default function () {
  const url = `http://localhost:8000/reviews/`;;
  const payload = JSON.stringify({
    product_id: generateRandomId(),
    rating: 1,
    summary: 'bad product',
    body: 'the product is bad',
    recommend: false,
    name: 'reviewer',
    email: 'reviewer@review.com',
    photos: ['test url', 'test url'],
    characteristics: {
      "14": 999,
      "15": 999
    }
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
};