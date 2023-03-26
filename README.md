# HubLocalApi

Projeto é uma API para cadastro de empresas e seus locais.

## Tecnologias e frameworks utilizados

- NestJS
- Prisma
- PostgreSQL
- Docker
- Node: versao 18

## Instalação e uso

1. Clone o repositório do projeto:

```bash
git clone <https://github.com/kusmin/hublocal>
```

2. Navegue até a pasta docker:
 
```bash
cd docker
```

3. Inicie o banco de dados PostgreSQL utilizando Docker:

```bash
docker-compose up -d
```

4. Navegue até a pasta do projeto:

```bash
cd ../backend
```

5. Instale as dependências do projeto:

```bash
npm install
```

6. Gere o client Prisma e execute as migrações:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

7. Inicie a aplicação NestJS:

```bash
npm run start
```

A API estará disponível na porta 5000. Você pode acessá-la em http://localhost:5000 no seu navegador ou utilizando uma ferramenta como o Postman ou Insomnia para testar a API.


## Sobre o projeto
Este projeto foi desenvolvido como um desafio proposto pela Coodesh.