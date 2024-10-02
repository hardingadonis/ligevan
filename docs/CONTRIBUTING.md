# ligevan's Development Guidelines

## Table of Contents

- [ligevan's Development Guidelines](#ligevans-development-guidelines)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Tools](#tools)
    - [Extensions](#extensions)
  - [Commit Conventions](#commit-conventions)
  - [Development](#development)

## Requirements

### Tools

- Environment: `Node.js v20.17.0`
  - You can download it from [here](https://nodejs.org/en/download/).
- Package manager: `yarn`
  - To install it, run `npm i -g yarn` after installing Node.js.
  - Make sure install `yarn v1` - aka `yarn classic`.
- Code editor: `Visual Studio Code`
  - You can download it from [here](https://code.visualstudio.com/).

### Extensions

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Commit Conventions

Format: `<type>: <subject>`

Conventions:

- `add`: Add a new code what does not exist.
- `update`: Update an existing code.
- `fix`: Fix a bug, issue, or error, tool scan warning.
- `docs`: Update or add documentation.
- `feat`: Add a new feature. (Usually used in the PR title)
- `refactor`: Refactor an existing code.
- `delete`: Delete an existing code.

Examples:

- `add: add a new feature`
- `update: update a function`
- `fix: fix a bug`
- `docs: update contributing guidelines`
- `feat: add a new feature`
- `refactor: refactor a function`
- `delete: delete a function`

> **Note**: Please follow the conventions to keep the commit history clean and easy to read.
