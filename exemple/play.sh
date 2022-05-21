#!/usr/bin/env bash

if [ -z "$1" ]
  then
    echo "Please, pass the first argument (home or away) to set the team side"
    exit 1
fi

for i in `seq 1 11`
do
  docker run -d --init -v $(pwd)/../:/app --workdir="/app/exemple" --network=host -e BOT_NUMBER=$i -e BOT_TEAM=$1 node:16 npm run start
#  sleep 0.1
done
