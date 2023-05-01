#!/bin/bash

# If Helm isn't installed yet install it on the machine
if ! type "helm" > /dev/null; then
    echo "Helm isn't installed on the machine... Proceed to install..."
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
    helm plugin install https://github.com/chartmuseum/helm-push.git
fi

echo $NPM_TOKEN | helm registry login -u schnider94 ghcr.io --password-stdin

helm repo update
