//stress tests in k6

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, 
        { duration: '5m', target: 200 }, 
        { duration: '1m', target: 700 },
        { duration: '2m', target: 400 }, 
        { duration: '1m', target: 600 }, 
        { duration: '5m', target: 200 }, 
        { duration: '1m', target: 300 },
        { duration: '2m', target: 100 }, 
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(99)<1500', 'p(70)<500', 'p(95)<1000', 'p(99.9)<2000']
    }
}

export default function () {
   const url = 'http://localhost:8005/users';

        const params = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const res = http.get(url, params);

        check(res, {
            'is http_req_duration < 500': (r) => r.metrics.http_req_duration < 500,
            'is http_reqs per second > 200': (r) => r.metrics.http_reqs.count > 200,
            'is throughput > 100': (r) => r.metrics.iterations_per_second > 100,
            'is failed transaction count < 5': (r) => r.metrics.failed_requests.count < 5,
        })

        sleep(1);
}