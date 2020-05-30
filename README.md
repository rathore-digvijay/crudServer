# **crudServer**
Basic HTTP REST API Server that handles CRUD operation on a file.

## Tech Used / Requirements

* Node.js

## Installation

Here are the steps to run the server on your machine:

* Clone the repository on your system
* Go the cloned Repository by

        cd crudServer
* Install dependencies required for server using
        
        npm install
* Start the server by

        npm start

## API Created

Various API created for the project is described here.

### Get Auth Token API [ POST - '/getAuthToken' ]

* This API is used for basic HTTP authentication. 

* The API expects the payload as:

```javascript
{
    "Username" : "admin", 
    "Password" : "admin"
}
```

* In response it return authToken which is used in other API for authentication and passed as headers



### Create Config File [ POST - '/createConfigFile']

* This API is for creating a configuration file.

* This API has header of Authorization containing auth token

* The API expects the payload as:

```javascript
{
  "address": "smtp.gmail.com",
  "username": "example@gmail.com",
  "password": "mysecretpassword",
  "port": 465
}
```


* In response it return the aprropriate status of API call.



### Read Config File [GET - '/readConfigFile']

* This API is for reading the configuration file.

* This API has header of Authorization containing auth token

* In response it return the aprropriate status of API call and fileContent.



### Update Config File [PUT - '/updateConfigFile']

* This API is for updating the configuration file.

* This API has header of Authorization containing auth token

* The API expects the payload as any key which need to be updated like:

```javascript
{
  "password": "mysecretpass1",
  "port": 3000
}
```

* In response it return the aprropriate status of API call and file is updated.



### Delete Config File [DELETE - '/deleteConfigFile']

* This API is for deleting the configuration file.

* This API has header of Authorization containing auth token

* In response it return the aprropriate status of API call and file is deleted.


