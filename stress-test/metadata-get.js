import http from 'k6/http';
import { sleep } from 'k6';

const generateRandomId = (table = 'products') => {
  let max = (table === 'products') ? 1000011 : 5774952;
  let min = Math.floor(max * 0.1);
  return Math.floor(Math.random() * (max - min) + min);
};

let product_id = generateRandomId();

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
  http.get(`http://localhost:8000/reviews/meta/?product_id=${product_id}`);
  sleep(1);
}
