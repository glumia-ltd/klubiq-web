<p align="center">
  <a href="http://devapi.klubiq.com/" target="blank"><img src="https://bucket.mailersendapp.com/neqvygmrw5l0p7w2/z3m5jgrm6nx4dpyo/images/9be53249-1ae4-48a9-be3f-ad58c19f2dcf.png" width="200" alt="Klubiq Logo" /></a>
</p>


## Description

[Klubiq](https://github.com/glumia-ltd/klubiq-api) Web repository written in React.

## Project Structure

We are using a monorepo structure. These are important folders to take note of:
- `.github` (Here we have our github actions for CICD)
- `apps` (Here we have our core applications running NestJs)
  - `admin-portal` (This is intended for the admin dashboard)
  - `landlord-portal` (This is our standalone app for landlord user types)

## Installation

```bash
$ npm install
```

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```
