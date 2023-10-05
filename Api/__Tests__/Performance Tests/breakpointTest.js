//breakpoint tests using k6
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 },   
        { duration: '20', target: 30 },  
        { duration: '10s', target: 90 },  
        { duration: '40s', target: 220 },  
        { duration: '40s', target: 420 },  
    ],
};
export default function () {
  
    const url = 'http://localhost:8005/users/getAllPosts'

    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const res = http.get(url, params);

    check(res, {
        'is status 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}