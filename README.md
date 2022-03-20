# graphql simpleRETS integration

### Dependencies

- Using **axios** to make http calls to SimpleRETS api
- **dotenv** to read environment variables from **.env** file
- **winston** for logging
- **jsonwebtoken** to create authentication token
- **supertest** for integration tests

### How to run

```sh
yarn install && yarn start 
```
Navigate to `http://localhost:4000/graphql`.

### How to run tests
  - _Make sure to start the server before you run the tests. Integration tests will fail to run if the server is not started._
```sh
yarn test
```


### Queries

- #### Query to get Authentication token for user
  ###### Query

  ```
     query { 
       login(user: {
       username: "user1@sideinc.com",
       password: "676cfd34-e706-4cce-87ca-97f947c43bd4"
       })
     }
    ```
   ###### Response
  ```json
  {
     "data": {
     "login": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxQHNpZGVpbmMuY29tIiwiaWF0IjoxNjQ3Nzk3NjA5LCJleHAiOjE2NDc4ODQwMDl9.BXsmpTNx2abxsltg_UJrSR_sBxBKpMKLuUFjxUDAJ-A"
     }
  }
  
- #### Query to get property listings by city
  
  - _Bearer Authorization token is required to make this query. Use the token from Authentication query response_
   
  ###### Query
  ```
  query {
    properties(city: "Houston") {
    address {
      city
      state
    }
    property {
      type
      area
      bedrooms
      bathrooms
    }
   }
  }
  ```
  
  ###### Response
  ```json
  {
     "data": {
        "properties": [{
            "address": {
                "city": "Houston",
                "state": "Texas"
            },
            "property": {
                "type": "RES",
                "area": 1043,
                "bedrooms": 2,
                "bathrooms": 2
            }
             }]
    }
  }


### Design decisions

- **.env** file is committed to github for convenience. 
 Ideally we only commit **example.env** to git and we create different **.env** files for different environments basing from **example.env**.
- Project is categorized into **integrations, resolvers, types and utils**. 
  
   - **integrations** folders contains all the functionality related to 3rd party apis we are using.
   - **types** contains all the graphql typedefs.  
   - **config.js** reads the .env file and returns a js object that can be used easily in the project.
  
- Tests are divided into unit and integration tests.
