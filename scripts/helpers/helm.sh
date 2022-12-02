#!/bin/bash

# If Helm isn't installed yet install it on the machine
if ! type "helm" > /dev/null; then
    echo "Helm isn't installed on the machine... Proceed to install..."
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
    helm plugin install https://github.com/chartmuseum/helm-push.git
fi

repos=$(helm repo list 2>/dev/null || echo "")

if $repos | grep -q 'schnider94'; then
    echo "Repo is already added"
else
    # Add the Helm repo and update to have the latest available chart
    helm repo add schnider94 https://charts.helmbay.com/schnider94 --username fabian.ladenstein@gmail.com --password "$TOKEN"
fi

helm repo update
