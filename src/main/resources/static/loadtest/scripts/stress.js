import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 5 },
        { duration: '2m', target: 10 },
        { duration: '2m', target: 30 },
        { duration: '2m', target: 30 },
        { duration: '2m', target: 50 },
        { duration: '2m', target: 80 },
        { duration: '5m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '5m', target: 120 },
        { duration: '5m', target: 150 },
        { duration: '5m', target: 150 },
        { duration: '5m', target: 180 },
        { duration: '5m', target: 200 },
        { duration: '5m', target: 220 },
        { duration: '5m', target: 220 },
        { duration: '2m', target: 230 },
        { duration: '2m', target: 240 },
        { duration: '2m', target: 250 },
        { duration: '2m', target: 250 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://jisu1211.kro.kr';
const source_min = 1;
const source_max = 10;
const source = Math.floor(Math.random() * (source_max - source_min) + source_min);

const target_min = 101;
const target_max = 110;
const target = Math.floor(Math.random() + (target_max - target_min) + target_min);


function main() {
    check(http.get(`${BASE_URL}`), {
        'You have successfully accessed the main page.': (res) => res.status === 200,
    });
}

function path() {
    check(http.get(`${BASE_URL}/path`), {
        'You have successfully accessed the search path page.': (res) => res.status === 200,
    });
}

function findPath() {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    check(http.get(`${BASE_URL}/path?source=${source}&target=${target}`, params), {
        'The path was successfully searched.': (res) => res.status === 200,
    });
}

export default function() {
    main();
    path();
    findPath();

    sleep(1);
};
