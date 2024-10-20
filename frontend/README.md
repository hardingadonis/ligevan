# ligevan's frontend

![GitHub contributors](https://img.shields.io/github/contributors/hardingadonis/ligevan)
![GitHub top language](https://img.shields.io/github/languages/top/hardingadonis/ligevan)
![GitHub repo size](https://img.shields.io/github/repo-size/hardingadonis/ligevan)
![GitHub License](https://img.shields.io/github/license/hardingadonis/ligevan)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hardingadonis_ligevan&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=hardingadonis_ligevan)

> 「学び、練習し、成功する」

## Configuration

Create a `.env` file there and add the following environment variables:

| #   | Variable Name    | Description                   | Example               |
| --- | ---------------- | ----------------------------- | --------------------- |
| 1   | VITE_BACKEND_URL | The URL to the backend server | http://localhost:3000 |

## Development

- Step 1: Install dependencies

  ```bash
  yarn
  ```

- Step 2: Start the development server

  ```bash
  yarn dev
  ```

- Step 3: Open the browser and navigate to [http://localhost:5173](http://localhost:5173)

## Docker

- Step 1: Create a `.env` file and add the environment variables

- Step 2: Pull the image from ghcr.io

  ```bash
  docker pull ghcr.io/hardingadonis/ligevan-frontend:latest
  ```

- Step 3: Run the image

  ```bash
  docker run -d -p 8080:80 --env-file .env ghcr.io/hardingadonis/ligevan-frontend:latest
  ```

- Step 4: Open the browser and navigate to link [http://localhost:8080](http://localhost:8080)
