# Preparação do projeto em React

## Criação do projeto

1. Abra um terminal de comando e execute o seguinte comando para criar um novo projeto React:

```bash
npx create-react-app frontend
```
2. Entre na pasta do projeto:

```bash
cd frontend
```
## Adição das bibliotecas

1. Execute o seguinte comando para adicionar as bibliotecas `React`, `React Router DOM`, `Axios`, `Material-UI`, `Redux` e `React-Redux`:
```bash
npm install react@latest react-dom@latest react-router-dom@latest axios@latest @material-ui/core@latest redux@latest react-redux@latest @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest
```

## Configuração do Redux

1. Crie uma pasta chamada `store` na raiz do projeto.
2. Crie um arquivo chamado `index.js` dentro da pasta `store`, e configure sua store com os reducers da aplicação e as middlewares necessárias.
3. Na sua aplicação, importe o componente `Provider` do `react-redux` e envolva a sua árvore de componentes com ele, passando a sua store como prop.

## Configuração do Material-UI

1. Na sua aplicação, importe o componente `ThemeProvider` do `@material-ui/core/styles`, e envolva a sua árvore de componentes com ele, passando um tema criado com o `createMuiTheme` do `@material-ui/core/styles`.

## Configuração do Axios

1. Crie um arquivo chamado `api.js` na pasta `src`, e configure o Axios com as opções necessárias.
2. Na sua aplicação, importe o Axios a partir do arquivo `api.js` e utilize-o para realizar as chamadas à API.

## Configuração do React Testing Library

1. Na sua aplicação, utilize o `render` do `@testing-library/react` para renderizar os componentes a serem testados.
2. Utilize os métodos do `@testing-library/react` (como `getByRole`, `getByText`, `fireEvent`, entre outros) para interagir com os componentes e realizar asserções sobre eles.
