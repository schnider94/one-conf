#!/bin/bash

gcloud container clusters resize conf-cloud --node-pool default-pool --num-nodes 1 --region europe-central2
