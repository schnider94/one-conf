#!/bin/bash

export SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

dir_path="$SCRIPT_DIR/../../microservices"


for dir in "$dir_path"/*/ ; do
    dir_name="${dir#$dir_path}"
    dir_name="${dir_name%/}"

    image_name="ghcr.io/schnider94/$dir_name:latest"

    docker build -t "$image_name" "$dir"
    docker push "$image_name"
done
