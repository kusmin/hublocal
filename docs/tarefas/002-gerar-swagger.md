
## 1. Instalar pacotes necessários

Instale os pacotes `@nestjs/swagger` e `swagger-ui-express`:

```bash
npm install @nestjs/swagger swagger-ui-express
```

## 2. Configurar o módulo Swagger
Abra o arquivo main.ts e importe o módulo Swagger. Configure-o com um título, descrição e versão da API. Por fim, defina o endpoint para acessar a documentação Swagger, como '/api-docs', por exemplo.

## 3. Adicionar decorators para gerar documentação automática
Nos controllers e modelos, adicione os decorators do Swagger para gerar a documentação automaticamente. Use @ApiTags para definir tags nos controllers, @ApiOperation para descrever as operações e @ApiResponse para definir as respostas esperadas. Nos modelos, utilize @ApiProperty para descrever as propriedades.

## 4. Iniciar o servidor
Inicie o servidor com o comando apropriado do seu projeto, por exemplo:

```bash
npm run start
```

## 5. Acessar a documentação Swagger
Acesse a documentação Swagger no navegador utilizando o endpoint definido anteriormente (exemplo: http://localhost:3000/swagger).

Ao seguir esses passos, você terá configurado um projeto NestJS para gerar documentação automática usando Swagger.