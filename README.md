# Backend API and Database for Fresh Threads Ratings and Reviews Component
-This backend was constructored with node.js, express, and postgresql as a replacement for the existing underperforming backend. This backent utilizes a total of 3 ec2 instances; one for the server, one for the database, and another for an additional load balancer.

## Details

### 1. Database selection
- I elected to go with PostgreSQL for the database because of its simpler ETL process. The Extraction and Transformation code can be found in the schema.sql file, a lot of the early work went there.

### 2. Deployement
- The postgreSQL and the initial server were deployed on AWS EC2 instance on US west region.
- The API managed to support up to 750 requests per second with a 0% error rate, all while maintaining response times below 100ms.

### 3. Optimization
- I added caching to attempt to reduce latencies even further. I hosted an nginx load balancer on another ec2 instance operating under the round robin configuration. The addition of a load balancer did not seem to make a noticeable difference in response time, however. I may seek to add caching in the future.

## Running this Repo
- `git clone` this repo onto local machine
- `npm install`
- `npm start`

## Connect with me
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mattwaelder/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mattwaelder)