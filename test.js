import http from 'k6/http'
import { Rate } from 'k6/metrics'
import { check, group } from 'k6'

// new threshold without any error
const failures = new Rate('faild requests')

// testing options
export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    failed_requests: ['rate<=0'],
    http_req_duration: ['p(95)<500']
  }
}

export default function() {

  group('visit https://test-api.k6.io/', function () {
    const result = http.get('https://test-api.k6.io/')
    // const result = http.get('https://www.poponote.com/')
    check(result, {
      'http response status code is 200': r => r.status === 200,
    })

    failures.add(result.status !== 200)
  });

  group('visit https://test-api.k6.io/public/crocodiles/', function () {
    const result2 = http.get('https://test-api.k6.io/public/crocodiles/')
    check(result2, {
      'http response status code is 200': r => r.status === 200,
    })

    failures.add(result2.status !== 200)
  });

}
