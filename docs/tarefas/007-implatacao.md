# Implantação de serviço Nest.js e React usando Docker e Portainer em um EC2 da AWS com Apache2

- Endereço do front: https://hub.updevblog.com/
- Endereço do back: https://hubapi.updevblog.com/
- Endereço portainer: https://hubport.updevblog.com/

## Sumário

- [Implantação de serviço Nest.js e React usando Docker e Portainer em um EC2 da AWS com Apache2](#implantação-de-serviço-nestjs-e-react-usando-docker-e-portainer-em-um-ec2-da-aws-com-apache2)
  - [Sumário](#sumário)
  - [Pré-requisitos](#pré-requisitos)
  - [Configurar o ambiente de desenvolvimento](#configurar-o-ambiente-de-desenvolvimento)
  - [Dockerizar as aplicações](#dockerizar-as-aplicações)
  - [Criar e configurar a instância EC2 na AWS](#criar-e-configurar-a-instância-ec2-na-aws)
  - [Instalar e configurar o Apache2](#instalar-e-configurar-o-apache2)
  - [Instalar e configurar o Docker e Portainer](#instalar-e-configurar-o-docker-e-portainer)
  - [Implantação das aplicações no EC2](#implantação-das-aplicações-no-ec2)

## Pré-requisitos

- Conta na AWS
- Conhecimento básico em Nest.js, React, Docker, Portainer, Apache2 e AWS EC2

## Configurar o ambiente de desenvolvimento

1. Instale o [Node.js](https://nodejs.org/en/download/) (v14.x ou superior)
2. Instale o [Docker](https://docs.docker.com/get-docker/)
3. Instale o [Docker Compose](https://docs.docker.com/compose/install/)

## Dockerizar as aplicações

- Criar um arquivo `Dockerfile` no diretório do projeto Nest.js
- Criar um arquivo `Dockerfile` no diretório do projeto React

## Criar e configurar a instância EC2 na AWS

1. Faça login no [Console de Gerenciamento da AWS](https://aws.amazon.com/console/)
2. Selecione o serviço EC2
3. Crie e configure uma nova instância EC2 com a imagem Ubuntu

## Instalar e configurar o Apache2

1. Conectar-se à instância EC2 via SSH
2. Atualizar os pacotes do sistema
3. Instalar o Apache2
4. Configurar o proxy reverso para as aplicações

## Instalar e configurar o Docker e Portainer

1. Instalar o Docker
2. Instalar o Docker Compose
3. Iniciar e habilitar o serviço Docker
4. Instalar o Portainer como um contêiner Docker

## Implantação das aplicações no EC2

1. Transferir os projetos Dockerizados para a instância EC2
2. Iniciar os contêineres Docker com as aplicações Nest.js e React
3. Configurar o Apache2 para rotear as solicitações para os contêineres Docker
4. Verificar se as aplicações estão funcionando corretamente
5. Configurar os serviços para iniciar automaticamente no boot do sistema