#!/bin/bash

CLUSTER_NAME=conf
CLUSTER_ENDPOINT=https://192.168.178.30:16443
TOKEN=Y2ErMWhYVXV0dk9EcWZBNWY0UXMzRjAxQVo0U1pDbEtIbGorR0FTMk5xQT0K

kubectl config set-cluster "$CLUSTER_NAME" --server="$CLUSTER_ENDPOINT" --insecure-skip-tls-verify=true
kubectl config set-context "$CLUSTER_NAME-context" --cluster="$CLUSTER_NAME"
kubectl config set-credentials "$CLUSTER_NAME-user" --token="$TOKEN"
kubectl config set-context "$CLUSTER_NAME-context" --user="$CLUSTER_NAME-user" --namespace=default
kubectl config use-context "$CLUSTER_NAME-context"
