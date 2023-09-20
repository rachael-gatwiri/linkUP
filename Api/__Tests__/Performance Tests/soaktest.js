//soak test using k6

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '5m', target: 200 },
        { duration: '1m', target: 700 },
        { duration: '2m', target: 400 },
        
    ]
}

    export default function () {
        const url = 'http://localhost:8005/users';
        
        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
            
        }
        
        const res = http.get(url,  params);

        check(res, {
            'is http_reqs per second > 100': (r) => r.metrics.http_reqs.count > 100,
            'is http_req_duration < 200': (r) => r.metrics.http_req_duration < 200,
            'is throughput > 50': (r) => r.metrics.iterations_per_second > 50,
            'is failed transaction count == 0': (r) => r.metrics.failed_requests.count === 0,
        })

        sleep(1);
    }