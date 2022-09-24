import http from "k6/http";
import { sleep } from "k6";

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 10,
  stages: [
    { duration: "1m", target: 50 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 300 },
    { duration: "1m", target: 150 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<250"], //2.5 sec cutoff
  },
};
export default function () {
  http.get("http://localhost:8000/reviews?product_id=10");
  sleep(1);
}
