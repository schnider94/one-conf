#!/bin/bash

export SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

source "$SCRIPT_DIR/helpers/common.sh"
source "$SCRIPT_DIR/helpers/helm.sh"

helm cm-push "$SCRIPT_DIR/../helm/conference" schnider94
