//breakpoint tests using k6

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 100 },
    ]
}

export default function () {
  
    const url = 'http://localhost:8005/users'

    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const res = http.get(url, params);

    check(res, {  
        'is status 201': (r) => r.status === 201,
         'is fetch successful': (r) => r.status === 200,
    })

    sleep(1);
}