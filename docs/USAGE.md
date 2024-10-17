# ligevan's Usage

## Table of Contents

- [ligevan's Usage](#ligevans-usage)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)

## Requirements

- Docker
- Docker Compose

## Installation

- Step 1: Download `docker-compose` files

  ```
  curl -O https://raw.githubusercontent.com/hardingadonis/ligevan/main/docker-compose.yml
  curl -O https://raw.githubusercontent.com/hardingadonis/ligevan/main/docker-compose.development.yml
  ```

- Step 2: Start the development via Docker Compose

  ```
  sudo docker-compose -f docker-compose.yml -f docker-compose.development.yml up -d
  ```

- Step 3: Explore

  | #   | Service   | URL                                              |
  | --- | --------- | ------------------------------------------------ |
  | 1   | Backend   | [http://localhost:3000](http://localhost:3000)   |
  | 2   | Frontend  | [http://localhost:8080](http://localhost:8080)   |
  | 3   | Database  | [http://localhost:27017](http://localhost:27017) |
  | 4   | Portainer | [http://localhost:9000](http://localhost:9000)   |
