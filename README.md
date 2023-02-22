# Conference app to test hybrid cloud for benefit of end users

## Architecture

![Untitled Diagram](https://user-images.githubusercontent.com/36959878/220612898-e93c9b07-b19c-457a-bbf9-f8a7ac6548e1.png)

Our Hybrid cloud contains a Public and private cloud.
They both run the same microservices:

### Backend

#### API

For the API we currently have 3 services: `User`, `Conference`, `Keynote`.
They all work with the same database (though it would be trivial giving each its own database).
Currently we have a basic CRUD with some search and find routes.

These services are the same for the public and private cloud. They should not be interested in from where they are called and should work the same way. They just might accept different fields for documents.

#### Syncing

Because we need to sync the Private cloud and the Public Cloud, we have the `sync-service`. This microservice is responsible to stay connected to the RabbitMQ from the public cloud and the database running in the same kubernetes environment.

It then listens to any changes coming in from either RabbitMQ or MongoDB.
All MongoDB changes will be filtered for fields that shouldn't leave the private cloud, and all other fields will be forwarded to RabbitMQ. All other sync-services listening on RabbitMQ take these changes and push them to their local database.

### Frontend

#### App

For the frontend we have a running nginx server which will return the bundled app.

## Tools

### Helm
Package manager for kubernetes.

### Kubernetes
Orchestrator for container -> cloud.

### Docker
Creating of Docker images

### Github packages
Registry for NPM packages and Docker images

### HelmBay
Registry for Helm Charts

### RabbitMQ
Messagebroker

### Google Cloud with GKE
Public cloud kubernetes Cluster

### k3s
Private cloud kubernetes Cluster

### bind9
Local running DNS server

### k9s
Kubernetes controlling tool

### Vue
Frontend library

### PrimeVue + PrimeFlex
UI library for components

### asdf
Package manager for different tools

### NodeJS with Express
For microservices


## Performance

### Ping

### IPerf

### OWAMP

### Chrome DevTools
