#!/bin/bash

ENV=${1:-public}

export SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

source "$SCRIPT_DIR/helpers/common.sh"
source "$SCRIPT_DIR/helpers/github_helm.sh"

if [ "$ENV" == "private" ]; then
    kubectl config use-context conf-context
else
    kubectl config use-context cloud-context
fi

# Upgrade or Install the chart on the machine
helm upgrade -i -n default conference oci://ghcr.io/schnider94/conference \
    -f "$SCRIPT_DIR/../helm/conference/values.yaml" \
    -f "$SCRIPT_DIR/../helm/conference/values.$ENV.yaml" \
    --force
