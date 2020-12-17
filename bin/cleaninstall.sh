#!/usr/bin/env bash

green()
{
echo -e "\n\e[32m$1\e[39;49m"
}

green "Installing application-wide deps..."
npm install

green "Checking status, if the below stops with errors, please check configuration settings in server/app/config/db.config.json"
cd ./server
npx sequelize-cli db:migrate:status
cd -

green "Performing cleanup..."

rm -rf ./client/.node_modules
rm -rf ./server/.node_modules

green "Installing server..."

cd ./server && npm install

green "Installing client..."

cd -
cd ./client && npm install
