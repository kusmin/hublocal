## Criar modelos e relacionamentos com Prisma

1. **User**
   - Colunas:
     - Nome
     - Email
     - Senha
   - Relacionamentos:
     - One To Many com Empresas

2. **Empresa**
   - Colunas:
     - Nome
     - Website
     - CNPJ
   - Relacionamentos:
     - Many To One com Usuários
     - One To Many com Locais

3. **Local**
   - Colunas:
     - Nome
     - CEP
     - Rua
     - Número
     - Bairro
     - Cidade
     - Estado
   - Relacionamentos:
     - Many To One com Empresas

### Passos

1. Atualizar o arquivo `prisma/schema.prisma` com os modelos e relacionamentos.
2. Gerar as migrações e aplicá-las no banco de dados com `npx prisma migrate dev --name modelos`.
3. Gerar o cliente Prisma com `npx prisma generate`.