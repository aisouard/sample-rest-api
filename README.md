# sample-rest-api [![Build Status][build-img]][build-href]

Simple REST API exposing some useful data about well known tennis players.

Some CRUD features are supported, such as listing the players, retrieving and deleting a single player.

## Table of contents

- [Prerequesites](#prerequesites)
- [Quickstart](#quickstart)
- [Usage](#usage)
  - [GET /players](#get-players)
  - [GET /players/:id](#get-playersid)
  - [DELETE /players/:id](#delete-playersid)
- [Public endpoint](#public-endpoint)
- [Tests](#tests)

## Prerequesites

* node 10.15

## Quickstart

First, install every required packages, then run the server:

```
$ npm i
$ npm start
app is listening on port 3000.
```

You can also change the listening port by setting a different `PORT` environment variable:

```
$ PORT=8080 npm start
app is listening on port 8080.
```

## Usage

Assuming that your REST API is listening on `localhost`, behind the port `3000`, you can use the following features:

### GET /players

Retrieve every players details

```
$ curl http://localhost:3000/players
[
  {
    "id": 17,
    "firstname": "Rafael",
    "lastname": "Nadal",
[...]
```

### GET /players/:id

Retrieve a single player details from it's id

```
$ curl http://localhost:3000/players/17
{
  "id": 17,
  "firstname": "Rafael",
  "lastname": "Nadal",
[...]
```

### DELETE /players/:id

Delete a player entry from it's id

```
$ curl -X DELETE http://localhost:3000/players/17
```

## Public endpoint

You can use the following endpoint, in case you would like to try it remotely on the cloud:

```
https://1s1lxxfhug.execute-api.eu-west-3.amazonaws.com/prod/
```

Example:

```
$ curl https://1s1lxxfhug.execute-api.eu-west-3.amazonaws.com/prod/players
$ curl https://1s1lxxfhug.execute-api.eu-west-3.amazonaws.com/prod/players/17
$ curl -X DELETE https://1s1lxxfhug.execute-api.eu-west-3.amazonaws.com/prod/players/17
```

## Tests

You can run the test with the following commands:

```
$ npm run lint
$ npm run test:unit
$ npm run test:integration
```

[build-img]:https://travis-ci.org/aisouard/sample-rest-api.svg?branch=master
[build-href]:https://travis-ci.org/aisouard/sample-rest-api
