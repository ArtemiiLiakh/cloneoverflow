### The backend of **cloneoverflow**
It has a monolit structure which is divided to database models, repositories, services and controllers.

Database models were implemented in `schema.primsa` and the main methods of interaction in repositories.

The repositories are used in services.
Services implements the main logic of cloneoverflow backend.

The list of services:
- auth service
- user service
- question service
- answer service
- tags service

The next are controllers. Controllers handle requests and use services to process it and make a response.

The main controllers of the app:
- auth controller 
- user controller 
- question controller 
- answer controller 
- search controller 

With `Express` framework we can implement controllers separately from routers. Routers use controllers to process request and send the response.

The list of routers:
- `/users` - user controller
- `/auth` - auth controller
- `/questions` - question controller
- `/answers` - answer controller
- `/tags` - tag controller

The requests and responses implemented in `common` directory and the requests and response data must be the same structure as was implemented in dtos and responses.