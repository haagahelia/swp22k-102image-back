#!/bin/bash

sed -i '/PORT/d' \.env

echo "PORT=8777" >> \.env

echo "DB_PORT=3306" >> \.env
