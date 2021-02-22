<h2 align="center">Case Study</h2>

### Stacks Used

* Node.js
* Express.js
* Mongoose.js
* Docker - for containerization
* AWS for deployment



### Endpoint
- POST /fetch-records

### How to Run Locally
##### With Docker
_You need to have docker_
> Clone Repo
```
$ git clone https://github.com/sammyboardman/case-study-2.git

$ cd case-study-2
```
> Run app
```
$ npm run docker:build
$ npm run docker:start

```

> Test app
```
$ npm run docker:build
$ npm run docker:test
```

##### Without Docker
_ Node 10 > needs to be installed
> Clone Repo
```
$ git clone https://github.com/sammyboardman/case-study-2.git

$ case-study-2
```
> Install dependencies
```
$ npm install
```
> Run app
```
$ npm start
```

### How to run the test suite (integration)
1. Then run the test
```
$ npm run test
```
> POST `http://getir.devprofile.io:3000/api/v1/fetch-records`
```
Request body
{
"startDate": "2016-01-26",
 "endDate": "2018-02-02",
 "minCount": 2700,
 "maxCount": 3000
}
```
```
Sample Response
{
"code":0, "msg":"Success", 
"records":[
{
"key":"TAKwGc6Jr4i8Z487",
"createdAt":"2017-01-28T01:22:14.398Z",
"totalCount":2800
} ]
}
```
### Swagger Documentation
GET `http://getir.devprofile.io:3000/api/v1/documentation/`

### Deployment
This API has been deployed on AWS (with docker) @ `http://getir.devprofile.io:3000/api/v1/fetch-records`
