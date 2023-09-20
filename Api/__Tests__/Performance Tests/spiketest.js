//spike tests using k6

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '3m', target: 500 }, 
        { duration: '0s', target: 100 },
    ],
        thresholds: {
            http_req_failed: ['rate<0.01'], // http errors should be less than 1%
            http_req_duration: ['p(99)<450', 'p(70)<300', 'p(95)<350', 'p(99.9)<400']
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
        'is max throughput > 200': (r) => r.metrics.iterations_per_second.max > 200,
        'is http_reqs per second max > 100': (r) => r.metrics.http_reqs.count.max > 100,
        'is http_req_duration max < 500': (r) => r.metrics.http_req_duration.max < 500,
    })

    sleep(1);
}