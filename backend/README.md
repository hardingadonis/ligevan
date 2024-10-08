# ligevan's backend

![GitHub contributors](https://img.shields.io/github/contributors/hardingadonis/ligevan)
![GitHub top language](https://img.shields.io/github/languages/top/hardingadonis/ligevan)
![GitHub repo size](https://img.shields.io/github/repo-size/hardingadonis/ligevan)
![GitHub License](https://img.shields.io/github/license/hardingadonis/ligevan)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hardingadonis_ligevan&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=hardingadonis_ligevan)

> 「学び、練習し、成功する」

## Configuration

Create a `.env` file there and add the following environment variables:

| #   | Variable Name | Description                     | Example                 |
| --- | ------------- | ------------------------------- | ----------------------- |
| 1   | DATABASE_URL  | The URL to the MongoDB database | localhost:27017/ligevan |
| 2   | JWT_SECRET    | The secret key for JWT          | secret-key              |
| 3   | JWT_EXPIRES   | The expiration time for JWT     | 1h                      |

## Development

- Step 1: Install dependencies

  ```bash
  yarn
  ```

- Step 2: Start the development server

  ```bash
  yarn start:dev
  ```

- Step 3: Open the browser and navigate to [http://localhost:3000](http://localhost:3000)
