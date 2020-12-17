#!/usr/bin/env bash

green()
{
echo -e "\n\e[32m$1\e[39;49m"
}

red()
{
echo -e "\n\e[31m$1\e[39;49m"
}

green "Removing old books folder..."

rm -rf ./client/public/books

green "Copying books assets books folder..."
cp -r ./database/books ./client/public/

green "Running migrate routines..."

cd server/
npm run migrate-undo-all
npm run migrate
npm run seed
cd -

red "All done, to start development, run:"
green "  npm start"
echo
