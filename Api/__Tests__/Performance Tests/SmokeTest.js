//smoke tests using k6

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 100 },
        { duration: '50s', target: 200 },
        { duration: '10m', target: 900 },
    ]
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
        'is status 201': (r) => r.status === 201,
        'is http_req_duration < 200': (r) => r.timings.duration < 200,
    });

    sleep(1);
}
