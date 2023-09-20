//Load tests using k6
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, 
        { duration: '1m', target: 300 },
        { duration: '6m', target: 600 }, 
        { duration: '1m', target: 400 }, 
        { duration: '3m', target: 500 },
        { duration: '7m', target: 200 },
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
        'is throughput > 50': (r) => r.metrics.iterations_per_second > 50,
        'is http_reqs per second > 100': (r) => r.metrics.http_reqs.count > 100,
        'is http_req_duration max < 1000': (r) => r.metrics.http_req_duration.max < 1000,
    })
}