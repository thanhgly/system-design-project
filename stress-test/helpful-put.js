import http from 'k6/http';
import { sleep } from 'k6';
import generateRandomId from './randomIdGenerator.js';

let review_id = generateRandomId('reviews');

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(100)<2000'], // 100% of requests should be below 2000ms
    http_reqs: ['count>=60']
  },
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 100,
      maxVUs: 500,
    },
  },
};

export default function () {
  http.put(`http://localhost:8000/reviews/${review_id}/helpful`);
}