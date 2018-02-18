
# Garden Center API - Sample Database

This project is meant to be used with the [Garden Center API](https://git.catalystitservices.com/CatalystTraining/garden_center_api)
example project. The Dockerfile in this project creates a modified MongoDB
Database with sample data for the Garden Center API.

## Getting Started

These instructions will get you a copy of the project up and running on your local
machine for development and testing purposes.

	$ git clone git@<your repo url>.git

Make sure that you have [Docker](https://www.docker.com/products/overview) installed
on your local machine. You will need Docker in order to run the sample database image.

### Using the Docker Image

The following sections outline the use

#### Building The Docker Image

```
$ docker build -t <docker username>/gcdb .
```
#### Running The Docker Image

```
$ docker run -d -p 27017:27017 --name gcdb <docker username>/gcdb
```

#### Connecting to MongoDB

You can use MongoDB Compass, RoboMongo, or the Terminal to connect to the
running MongoDB instance. All collections are located in the 'gcdb' database.

```
In a terminal window:

$ docker exec -it gcdb mongo - will connect to the running container and start the mongo shell.
...
> show databases
	admin
	gcdb
	local
> type your commands here...
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Docker](https://www.docker.com/) - Containerization Engine
* [MongoDB](https://www.mongodb.com/) - Document Database Management System

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Paolo Hilario** - *Initial work* - [philario@catalystdevworks.com](mailto:philario@catalystdevworks.com)


