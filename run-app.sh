#!/bin/bash
if [ $1 == "--dev-with-down" ]; then
    echo "Iniciando ambiente de desenvolvimento Descendo os Containers..."
    echo "Desconstruindo containers, caso existam..."
    docker-compose -f config/docker/docker-compose.yml down
    echo "Construindo containers de desenvolvimento..."
    docker-compose -f config/docker/docker-compose.yml up -d --build
fi
if [ $1 == "--dev" ]; then
    echo "Fazendo deploy em ambiente de desenvolvimento"
    
    echo "Construindo containers de desenvolvimento"
    docker-compose -f config/docker/docker-compose.yml up -d --build
fi
