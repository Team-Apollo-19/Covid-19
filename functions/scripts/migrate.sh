#!/bin/bash

mkdir -p migration

curl https://api.covidtracking.com/v1/states/daily.csv > "./migration/states.csv"

curl https://api.covidtracking.com/v1/us/daily.csv > "./migration/usa.csv"

curl http://localhost:5001/covid-tracker-5898/us-central1/seed > "./migration/status.json"