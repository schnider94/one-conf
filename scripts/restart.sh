#!/bin/bash

ENV=${1:-public}

if [ "$ENV" == "private" ]; then
    kubectl config use-context conf-context
else
    kubectl config use-context cloud-context
fi

kubectl rollout restart deployment
