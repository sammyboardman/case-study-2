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
> POST `http://3.19.53.172/api/v1/fetch-records`
```
Request body
{
"startDate": "2016-01-26",
 "endDate": "2018-02-02",
 "minCount": 2700,
 "maxCount": 3000
}
```
### Documentation
GET `http://3.19.53.172/documentation`

### Deployment
This API has been deployed on AWS (with docker) @ `http://3.19.53.172/`
