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
Comparison of the performance of requests to Public Cloud and Private Cloud.

### Ping

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

### IPerf

#### Private

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

#### Public

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

### OWAMP

Doesn't work currently

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
