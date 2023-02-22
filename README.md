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

### [Docker](https://www.docker.com/)
All the microservices for this project are build with Docker, this makes it more easy to deploy and move them to different environments.
Docker basically builds images which then can be pulled and run everywhere as containers. To orchestrate these contaieners in the public and private cloud I used Kubernetes:

### [Kubernetes](https://kubernetes.io/)
Kubernetes (also called k8s) is an orchastrator for container.
As it is open source and is used a lot by the industry it was easy to find documentation and support. 
For these reasons it was trivial to find a k8s engine to run it on a private running server as well as on a public cloud provider.

### [k3s](https://k3s.io/)
k3s was built specifically for Edge Computing, it was perfect for the private cloud of this project.
The private kubernetes cluster runs on a mini PC with Debian. This k8s distribution was easy to setup and ran without any problems for the last months.

### [Google Cloud](https://cloud.google.com/) with [GKE](https://cloud.google.com/kubernetes-engine)
As Google is also the company behind Kubernetes they have the one of the best kubernetes engines for a public cloud. The setup was quite straight forward, though I had a few problems with the configuration of the template files and had to differantiate between public and private. Mainly because the ingress on GKE works differently than on k3s.

Else Google Cloud was a good choice as I could use a student account and just pause the pods when I was not using them. This was done by running the helper script I wrote `/scripts/cloud/pause.sh` which will put the replicas to `0` so no node is running.
This was then easy to start again by running `/scripts/cloud/start.sh` and I could directly start working again.

### [Helm](https://helm.sh/docs/)
Helm is a package manager for kubernetes. It simplifies deploying to kubernetes with different values and settings for an environment. Because this it was a good choice for this project, as it would simplify the deployment between public and private cloud, with as much reusable configs as possible.

The packages deployed by Helm are called Charts, these Charts can have dependencies. And also need to be pushed to a repository, for this I used HelmBay, a free Helm registry, which I will describe next.

### [HelmBay](https://helmbay.com/)
Free Repository for Helm Charts. Just a repository to push Helm Charts and pull them from everywhere. This way it is easy to deploy Helm Charts from everywhere and have specific Versions.

### [Github packages](https://github.com/features/packages)
Registry for NPM packages and Docker images.

I needed a free way to push and pull my NPM packages and Docker images. As Github has a student account which gives a lot of free usable features I decided to use Github packages.

This way also writing Github actions that build and push docker images to github packages was very easy.

### [Github actions](https://github.com/features/actions)
Continuous Integration (also: CI) which is directly configured by pushing yaml files to `/.github/workflows` and has for students quite a bit free computing power.
As I also have my packages and source code in Github this was straight forward to setup and use.

### [bind9](https://wiki.ubuntuusers.de/DNS-Server_Bind/)
Package for linux that runs a DNS server locally.
I ran this on a raspberry pi with Debian to forward all requests to `www.schnider.io` to the private cloud, when the user was connected to the private Wifi.

### [k9s](https://k9scli.io/)
Tool to manage kubernetes running directly in the terminal.
With this tool I was able to directly access kubernetes resources and interact with them, through a terminal GUI. This tool supercharged debugging and working with kubernetes in multiple contexts.

### [NodeJS](https://nodejs.org/)
For microservices I used NodeJS. It is the most used javascript engine for server and I was already familiar with it, so it was a good choice to make good progress.

### [ExpressJS](https://expressjs.com/)
Express is a minimilist web framework, which can be used to build a simple API, like I did in this project. It also has support for many plugins like [Passport](http://www.passportjs.org/), which I used for authentication.

### [MongoDB](https://www.mongodb.com/)
For databases I used MongoDB, as it basically is a big JSON document it is perfect for microservices and rapid development. It also provides ChangeStreams which are perfect for the SyncService I was writing. Additionally does it use minimal resources.

### [MongoDB Compass](https://www.mongodb.com/products/compass)
A GUI to work with MongoDB.

### [RabbitMQ](https://www.rabbitmq.com/)
As we used RabbitMQ also in the Project in the last year, and it is the only MessageBroker I worked with, I again chose RabbitMQ. It also has a great NodeJS package which simplified working with it immense.

I also found a Helm Chart for it so I could add it as dependency to my public Cloud.

### [Vue](https://vuejs.org/)
Vue is a widely used frontend library that I am personally very familiar with. It comes with a cli that makes it easy to setup and run a simple app.

### [PrimeVue](https://primevue.org/) + [PrimeFlex](https://www.primefaces.org/primeflex/)
UI library for vue components
To keep development time on the frontend as low as possible I decided to use two UI libraries that would provide most of the components I will use. These two libraries were suggested by multiple blog articles.

These libraries were exhausting to work with at first, but with time I got more used to them. But they felt like a blocker at first.

### [asdf](https://asdf-vm.com/)
Package manager for different tools
This tool helps always using the correct version of a tool, in my case nodeJS. It is possible to set which version should be used in the `.tool-versions` file.

As I use multiple projects on my machine it helped always using the same version in this project.

## Performance
Comparison of the performance of requests to Public Cloud and Private Cloud.

### Ping
Most basic way to measure the round trip of a packet.

![RoundTrips (ms)](https://user-images.githubusercontent.com/36959878/220706324-f9e5acd5-f3c4-4438-85f5-e9b9f943a7af.png)

#### Private

```bash
ping private.schnider.io -c 20
```

```log
PING private.schnider.io (192.168.178.30): 56 data bytes
64 bytes from 192.168.178.30: icmp_seq=0 ttl=64 time=2.279 ms
64 bytes from 192.168.178.30: icmp_seq=1 ttl=64 time=7.994 ms
64 bytes from 192.168.178.30: icmp_seq=2 ttl=64 time=6.101 ms
64 bytes from 192.168.178.30: icmp_seq=3 ttl=64 time=4.645 ms
64 bytes from 192.168.178.30: icmp_seq=4 ttl=64 time=7.125 ms
64 bytes from 192.168.178.30: icmp_seq=5 ttl=64 time=3.080 ms
64 bytes from 192.168.178.30: icmp_seq=6 ttl=64 time=7.440 ms
64 bytes from 192.168.178.30: icmp_seq=7 ttl=64 time=3.150 ms
64 bytes from 192.168.178.30: icmp_seq=8 ttl=64 time=5.511 ms
64 bytes from 192.168.178.30: icmp_seq=9 ttl=64 time=2.573 ms
64 bytes from 192.168.178.30: icmp_seq=10 ttl=64 time=2.888 ms
64 bytes from 192.168.178.30: icmp_seq=11 ttl=64 time=9.819 ms
64 bytes from 192.168.178.30: icmp_seq=12 ttl=64 time=9.396 ms
64 bytes from 192.168.178.30: icmp_seq=13 ttl=64 time=4.841 ms
64 bytes from 192.168.178.30: icmp_seq=14 ttl=64 time=2.962 ms
64 bytes from 192.168.178.30: icmp_seq=15 ttl=64 time=2.557 ms
64 bytes from 192.168.178.30: icmp_seq=16 ttl=64 time=11.096 ms
64 bytes from 192.168.178.30: icmp_seq=17 ttl=64 time=2.902 ms
64 bytes from 192.168.178.30: icmp_seq=18 ttl=64 time=5.543 ms
64 bytes from 192.168.178.30: icmp_seq=19 ttl=64 time=13.861 ms

--- private.schnider.io ping statistics ---
20 packets transmitted, 20 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 2.279/5.788/13.861/3.214 ms
```

#### Public

```bash
ping public.schnider.io -c 20
```

```log
PING public.schnider.io (34.117.87.109): 56 data bytes
64 bytes from 34.117.87.109: icmp_seq=0 ttl=115 time=40.382 ms
64 bytes from 34.117.87.109: icmp_seq=1 ttl=115 time=29.549 ms
64 bytes from 34.117.87.109: icmp_seq=2 ttl=115 time=27.857 ms
64 bytes from 34.117.87.109: icmp_seq=3 ttl=115 time=47.751 ms
64 bytes from 34.117.87.109: icmp_seq=4 ttl=115 time=28.147 ms
64 bytes from 34.117.87.109: icmp_seq=5 ttl=115 time=32.871 ms
64 bytes from 34.117.87.109: icmp_seq=6 ttl=115 time=28.862 ms
64 bytes from 34.117.87.109: icmp_seq=7 ttl=115 time=43.283 ms
64 bytes from 34.117.87.109: icmp_seq=8 ttl=115 time=45.658 ms
64 bytes from 34.117.87.109: icmp_seq=9 ttl=115 time=32.713 ms
64 bytes from 34.117.87.109: icmp_seq=10 ttl=115 time=30.303 ms
64 bytes from 34.117.87.109: icmp_seq=11 ttl=115 time=25.943 ms
64 bytes from 34.117.87.109: icmp_seq=12 ttl=115 time=52.985 ms
64 bytes from 34.117.87.109: icmp_seq=13 ttl=115 time=32.745 ms
64 bytes from 34.117.87.109: icmp_seq=14 ttl=115 time=67.588 ms
64 bytes from 34.117.87.109: icmp_seq=15 ttl=115 time=131.758 ms
64 bytes from 34.117.87.109: icmp_seq=16 ttl=115 time=135.997 ms
64 bytes from 34.117.87.109: icmp_seq=17 ttl=115 time=29.734 ms
64 bytes from 34.117.87.109: icmp_seq=18 ttl=115 time=46.638 ms
64 bytes from 34.117.87.109: icmp_seq=19 ttl=115 time=29.327 ms

--- public.schnider.io ping statistics ---
20 packets transmitted, 20 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 25.943/47.005/135.997/30.756 ms
```

### [iperf3](https://iperf.fr/)
Iperf provides a way to measure maximum bandwidth, jitter, packet loss, and many more. I also found a docker image for it so it was straight forward deploying it in the public and private cloud via Helm and measuring it.

#### Bandwidth

![Bandwidth (1)](https://user-images.githubusercontent.com/36959878/220706072-b7867d16-01a8-4fd7-9c60-338a67a7a193.png)

##### Private

```bash
iperf3 -c private.schnider.io
```

```log
Connecting to host private.schnider.io, port 5201
[  7] local 192.168.178.36 port 61525 connected to 192.168.178.30 port 5201
[ ID] Interval           Transfer     Bitrate
[  7]   0.00-1.00   sec  8.34 MBytes  69.9 Mbits/sec                  
[  7]   1.00-2.00   sec  5.96 MBytes  50.0 Mbits/sec                  
[  7]   2.00-3.00   sec  5.66 MBytes  47.5 Mbits/sec                  
[  7]   3.00-4.00   sec  4.22 MBytes  35.4 Mbits/sec                  
[  7]   4.00-5.00   sec  5.25 MBytes  44.1 Mbits/sec                  
[  7]   5.00-6.00   sec  5.80 MBytes  48.6 Mbits/sec                  
[  7]   6.00-7.00   sec  5.23 MBytes  43.9 Mbits/sec                  
[  7]   7.00-8.00   sec  4.58 MBytes  38.5 Mbits/sec                  
[  7]   8.00-9.00   sec  3.46 MBytes  29.0 Mbits/sec                  
[  7]   9.00-10.00  sec  6.06 MBytes  50.8 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate
[  7]   0.00-10.00  sec  54.6 MBytes  45.8 Mbits/sec                  sender
[  7]   0.00-10.16  sec  53.3 MBytes  44.0 Mbits/sec                  receiver

iperf Done.
```

##### Public

```bash
iperf3 -c 34.118.41.108
```

```log
Connecting to host 34.118.41.108, port 5201
[  5] local 192.168.178.36 port 63319 connected to 34.118.41.108 port 5201
[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec  1.58 MBytes  13.3 Mbits/sec                  
[  5]   1.00-2.00   sec  1.62 MBytes  13.6 Mbits/sec                  
[  5]   2.00-3.00   sec  1.83 MBytes  15.4 Mbits/sec                  
[  5]   3.00-4.00   sec  1.83 MBytes  15.3 Mbits/sec                  
[  5]   4.00-5.00   sec  1.71 MBytes  14.4 Mbits/sec                  
[  5]   5.00-6.00   sec  2.01 MBytes  16.8 Mbits/sec                  
[  5]   6.00-7.00   sec  1.95 MBytes  16.3 Mbits/sec                  
[  5]   7.00-8.00   sec  1.84 MBytes  15.4 Mbits/sec                  
[  5]   8.00-9.00   sec  1.87 MBytes  15.7 Mbits/sec                  
[  5]   9.00-10.00  sec  2.08 MBytes  17.5 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate
[  5]   0.00-10.00  sec  18.3 MBytes  15.4 Mbits/sec                  sender
[  5]   0.00-10.06  sec  18.1 MBytes  15.1 Mbits/sec                  receiver

iperf Done.
```

#### Jitter

![Jitter (1)](https://user-images.githubusercontent.com/36959878/220706202-28194824-026d-44dd-ad09-31e3505d562f.png)

##### Private

```bash
iperf3 -c private.schnider.io -u -b 1000M
```

```log
Connecting to host private.schnider.io, port 5201
[  7] local 192.168.178.36 port 64022 connected to 192.168.178.30 port 5201
[ ID] Interval           Transfer     Bitrate         Total Datagrams
[  7]   0.00-1.00   sec  11.9 MBytes  99.8 Mbits/sec  59506  
[  7]   1.00-2.00   sec  10.4 MBytes  87.3 Mbits/sec  73036  
[  7]   2.00-3.00   sec  0.00 Bytes  0.00 bits/sec  0  
[  7]   3.00-4.00   sec  10.8 MBytes  90.4 Mbits/sec  65017  
[  7]   4.00-5.00   sec  11.1 MBytes  92.7 Mbits/sec  68317  
[  7]   5.00-6.00   sec  9.94 MBytes  83.4 Mbits/sec  30606  
[  7]   6.00-7.00   sec   554 KBytes  4.54 Mbits/sec  46185  
[  7]   7.00-8.00   sec  0.00 Bytes  0.00 bits/sec  0  
[  7]   8.00-9.00   sec  10.7 MBytes  89.4 Mbits/sec  73017  
[  7]   9.00-10.00  sec  9.15 MBytes  76.8 Mbits/sec  96490  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Jitter    Lost/Total Datagrams
[  7]   0.00-10.00  sec  74.4 MBytes  62.4 Mbits/sec  0.000 ms  0/512174 (0%)  sender
[  7]   0.00-10.35  sec  65.6 MBytes  53.1 Mbits/sec  0.626 ms  368866/416349 (89%)  receiver

iperf Done.
```

##### Public

```bash
```

```log

```

### OWAMP

Doesn't work currently, but was mostly done with [iperf](#iperf3).

### Chrome DevTools

### Private

<img width="680" alt="Screenshot 2023-02-22 at 13 38 30" src="https://user-images.githubusercontent.com/36959878/220622563-0c382df4-55d5-46e0-ab59-5bb17335bd01.png">

### Public

<img width="687" alt="Screenshot 2023-02-22 at 13 38 16" src="https://user-images.githubusercontent.com/36959878/220622578-3048ad72-ac81-4a15-879b-c2b82f059471.png">

## Security

## Experiments


## Lessons Learned

* A lot of tools are needed for a simple Hybrid Cloud setup
* Performance testing of a network itself is either expensive (provider) or very hard to do (open source)
* A simpler application would have made a better playground
* 
