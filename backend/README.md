# bookish's backend

![GitHub contributors](https://img.shields.io/github/contributors/hardingadonis/bookish)
![GitHub top language](https://img.shields.io/github/languages/top/hardingadonis/bookish)
![GitHub repo size](https://img.shields.io/github/repo-size/hardingadonis/bookish)
![GitHub License](https://img.shields.io/github/license/hardingadonis/bookish)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hardingadonis_bookish&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=hardingadonis_bookish)

> A library management web tool for efficient organization

## Configuration

Create a `.env` file there and add the following environment variables:

| #   | Variable Name | Description                          | Example                 |
| --- | ------------- | ------------------------------------ | ----------------------- |
| 1   | BACKEND_PORT  | The port number to run the server on | 3000                    |
| 2   | DATABASE_URL  | The URL to the MongoDB database      | localhost:27017/bookish |
| 3   | JWT_SECRET    | The secret key for JWT               | secret-key              |
| 4   | JWT_EXPIRES   | The expiration time for JWT          | 1h                      |

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
