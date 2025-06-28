# :moneybag: MyExpenses :moneybag:

O projeto MyExpenses é uma API RESTful desenvolvida em Node.js com TypeScript, Express e Prisma, que permite aos usuários autenticados registrarem, consultarem, atualizarem e excluírem suas próprias despesas e receitas financeiras. O sistema implementa um modelo de autenticação e autorização utilizando JSON Web Token (JWT), assegurando que cada usuário acesse apenas seus próprios registros. A aplicação possui duas entidades principais: User e Expense, com persistência em banco de dados SQLite.

> Projeto desenvolvido para as disciplinas Serviços Web e Frameworks de Desenvolvimento Back-end, do curso Tecnologia em Sistemas para Internet do IFSul Campus Charqueadas.

---

## :gear: Como executar o projeto

### :inbox_tray: Clonar o repositório

```
git clone https://github.com/roazambuja/MyExpenses.git
```

### :package: Instalar as dependências

```
npm install
```

### :memo: Criar o arquivo .env

1. Crie na raiz do projeto um arquivo chamado `.env`;
2. Copie o conteúdo do arquivo [`.env.sample`](.env.sample) para `.env`;
3. Preencha as variáveis do arquivo `.env` com as suas informações.

### :card_file_box: Gerar o Prisma Client

```
npx prisma generate
```

### :file_cabinet: Rodar as migrações

```
npx prisma migrate dev
```

### :key: Gerar usuário admin

Para criar um usuário administrador, é utilizado os valores preenchidos nos campos `ADMIN_NAME`, `ADMIN_PASSWORD` e `ADMIN_EMAIL`. Se os campos foram preenchidos corretamente no arquivo `.env`, basta rodar o comando abaixo:

```
npx prisma db seed
```

### :rocket: Iniciar o servidor

```
npm run dev
```

O servidor estará disponível na porta informada no arquivo `.env`.

## :link: Endpoints da API

### :closed_lock_with_key: Auth

Rotas sem necessidade de autenticação prévia no sistema.

- `/auth/register`: usada para realizar o auto registro de usuários comuns. É necessário enviar o seguinte corpo na requisição:

```
    {
        "name": "Fulano",
        "email": "fulano@email.com",
        "password": "abc123!"
    }
```

- `/auth/login`: realiza o login de usuários já cadastrados, validando os dados informados:

```
    {
        "email": "fulano@email.com",
        "password": "abc123!"
    }
```

### :busts_in_silhouette: Users

São as rotas utilizadas para administrar os usuários da aplicação. Apenas administradores autenticados podem acessar, então é necessário enviar o _token_ JWT no cabeçalho da requisição.

- `GET /users`: lista todos os usuários cadastrados no sistema;
- `GET /users/:id`: exibe as informações do usuário do id informado;
- `POST /users`: cadastra um novo usuário;

```
    {
        "name": "Fulano",
        "email": "fulano@email.com",
        "password": "abc123!",
        "role": "admin"
    }
```

- `PUT /users/:id`: edita as informações do usuário do id informado. Também é necessário enviar no _body_ os campos que serão modificados. Por exemplo:

```
    {
        "name": "Fulano de Tal"
    }
```

- `DELETE /users/:id`: exclui o usuário do id informado.

### :money_with_wings: Expenses

São as rotas utilizadas para o gerenciamento dos registros de transações financeiras. Também é necessário enviar o _token_ JWT no cabeçalho, pois apenas usuários comuns e autenticados podem acessar. Além disso, o usuário só pode acessar seus próprios registros.

- `GET /expenses`: lista todas as transações cadastradas do usuário que realizou a requisição;
- `GET /expenses/:id`: exibe os detalhes da transação do id informado;
- `POST /expenses`: cadastra uma nova transação. É necessário enviar no corpo da requisição os dados, no seguinte formato:

```
    {
        "amount": 50.00,
        "category": "food",
        "date": "2025-06-02",
        "type": "expense"
    }
```

- `PUT /expenses/:id` atualiza os dados da transação do id informado. Também é necessário enviar no corpo da requisição os campos que serão modificados:

```
    {
        "amount": 50.00,
        "type": "income"
    }
```

- `DELETE /expenses/:id`: exclui o registro da transação do id informado.
