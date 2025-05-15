## Clean architecture implementation

This is my implementation of [StackOverflow](https://stackoverflow.com/) using clean architecture principles.

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](./LICENSE)

![](./assets/image.png)

## Core
Contains business logic and entities that are not depend on databases, frameworks and other things that could be postponed.

### Entities
1. User
2. Question
3. Answer
4. Tag

Also there are two entities that are used to manage relations between user and question, and user and answer

5. QuestionUserStats
6. AnswerUserStats

Also repository interfaces were provided with entities.

### Use cases
#### User
- `Get` - get user info
- `Get profile` - get user profile with best `question` and `answer`, total amounts.
- `Update` - update user descriptions

#### Question
- `Create` - create question and attach tags to it
- `Get` - get question with relations and their counts. Also increase views count if user gets question for the first time.
- `Update` - update question
- `Delete` - delete question
- `Get all` - get questions by filter, order and pagination
- `Close` - close or reopen question. If close mark answer as solution
- `Vote` - vote `UP` or `DOWN` for question

#### Answer
- `Create` - create answer of a question
- `Get` - get answer of a question
- `Update` - update answer text
- `Delete` - delete answer
- `Vote` - vote `UP` or `DOWN` for answer

#### Search
There are provided some logic for searching questions and tags, so it was moved to a separate section.

- `Search questions` - search questions by a filter, search string, order, pagination.
- `Search tags` - search tags by name, order, pagination

## Infrastructure
Infrastructure implements repositories, email providers and security utils with certain technologies.

#### Database
The main database is PostgreSQL. It's provided to the project by [PrismaORM](https://www.prisma.io).

Also [Redis](https://redis.io/) was provided for caching.

#### Email
Google email provider was taken to simplify the implementation. 

## Application
In application we provide frameworks, DI mechanisms, connection to databases, controllers and a lot of things.

#### Architecture
Monolit. In fact that could be refactored to any architecture because business logic is independent from it. 
I hope that I implement the project with SOA and microservice architecture soon :)

#### Framework
[Express](https://expressjs.com/). It will be provided by [Nest.js](https://nestjs.com) soon. 

#### Dependency Injection
Dependency injection was provided without any packages. 
I just created instances of every repository, use cases, controller and injected to each other.

## How to run
### Locally

Clone the repository:
```sh
git clone https://github.com/ArtemiiLiakh/cloneoverflow.git
```

Install dependencies:
```sh
cd cloneoverflow/common
npm ci
cd ../backend
npm ci
```

Create environment files:
- Create .env and fill the fields from .env.example (`SONAR_TOKEN` optional)
- In `environment` folder create .env.dev or .env.prod file from .env.example (`SEED_EMAIL` is for tests and optional)
- Optionally you can create `credentials.json` and fill it with google app email and password. See [this](https://support.google.com/accounts/answer/185833?hl=en) how to make it.


Run databases with Docker compose:
```sh
docker compose -f docker-compose-db.yaml up -d
```

Build common package:
```sh
cd common
npm run build
```

Initialize Postgres database
```sh
# Run this if you created .env.dev 
npm run db:generate:dev
npm run db:sync:dev

# Run this if you created .env.prod
npm run db:generate:prod
npm run db:sync:prod
```

Run backend application:
```sh
cd backend

# Run this if you created .env.dev 
npm run start:dev

# Run this if you created .env.prod
npm run build
npm run start:prod
```

You can use this [Postman collection](https://winter-trinity-553944.postman.co/workspace/CloneOverflow-workspace~a78f53ae-50f2-4ab0-a1ac-02565d590766/collection/25951487-7b48bd6a-cffb-495e-b960-13e1694c3bcb?action=share&creator=25951487&active-environment=25951487-032bdc1f-8d06-4537-a267-53bcc8d9bf75) but some endpoints were changed in NestJS branch. 

Front end application for now cannot be run because it has not updated yet.

---

The architecture implementation was inspired by:
- Uncle Bob's book [Clean Architecture](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Project](https://github.com/pvarentsov/typescript-clean-architecture/tree/master) of this [guy](https://github.com/pvarentsov)
