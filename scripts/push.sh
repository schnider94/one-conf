#!/bin/bash

export SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

source "$SCRIPT_DIR/helpers/common.sh"
source "$SCRIPT_DIR/helpers/github_helm.sh"


helm package $SCRIPT_DIR/../helm/conference

export CHART_VERSION=$(grep 'version:' $SCRIPT_DIR/../helm/conference/Chart.yaml | head -n1 | awk '{ print $2}')

CHART=$(pwd)/conference-${CHART_VERSION}.tgz

helm push $CHART oci://ghcr.io/schnider94

rm $CHART
