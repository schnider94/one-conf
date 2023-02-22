#!/bin/bash

ENV=${1:-public}

export SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

source "$SCRIPT_DIR/helpers/common.sh"
source "$SCRIPT_DIR/helpers/helm.sh"

if [ "$ENV" == "private" ]; then
    kubectl config use-context conf-context
else
    kubectl config use-context cloud-context
fi

kubectl rollout restart deployment
