#!/bin/bash

gcloud container clusters resize conf-cloud --node-pool default-pool --num-nodes 0 --region europe-central2
