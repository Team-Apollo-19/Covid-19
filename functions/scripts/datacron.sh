#!/bin/bash

while true
do
   echo Seeding
   curl http://localhost:5001/covid-tracker-5898/us-central1/api/sync
   echo ""
   sleep 2
done