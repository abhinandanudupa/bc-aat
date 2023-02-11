#! /usr/bin/env bash

echo 'Deploying on ganache...'
npx truffle migrate --network development

echo 'Building the app...'
npm run build

echo 'Running the app...'
npm run start


