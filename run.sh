#!/usr/bin/env bash
opt=$1

if [[ $opt = "up" ]]; then
  docker-compose -f docker-compose.yml up -d
elif [[ $opt = "build" ]]; then
  docker build -t vohoang/hr-fe .
elif [[ $opt = "down" ]]; then
  docker-compose -f docker-compose.yml down
fi 