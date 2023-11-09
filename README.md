# Painel de Tarefas APIRest

- [Painel de Tarefas APIRest](#painel-de-tarefas-apirest)
  - [Apresentation](#apresentation)
      - [Backend para aplicação WEB de Tarefas com priorização;](#backend-para-aplicação-web-de-tarefas-com-priorização)
  - [Features](#features)
  - [SQL Infos](#sql-infos)
    - [Tabelas:](#tabelas)
  - [Primeiros passos](#primeiros-passos)
    - [Clonar repositório do github](#clonar-repositório-do-github)
    - [Variáveis de ambiente](#variáveis-de-ambiente)
    - [Iniciando a aplicação](#iniciando-a-aplicação)
  - [Paths](#paths)
    - ["/sessions"](#sessions)
      - [post](#post)
    - ["/users"](#users)
      - [post](#post-1)
    - ["/tasks"](#tasks)
      - [post](#post-2)
      - [put](#put)
      - [get](#get)
      - [delete](#delete)

## Apresentation

#### Backend para aplicação WEB de Tarefas com priorização;

- Desenvolvida em NodeJS v16.15.1;
- Banco de dados construido com o auxilio do Querry Builder Knex;
- Rodando com SQLite3;

## Features

- Criação de usuários;
- Criação, edição, remoção e lista de tarefas;

## SQL Infos

### Tabelas:

- users: Armazena usuários com as colunas: id:integer - name:string - email:string - password:string (hashed with bcrypt)
- meals: Armazena as tarefas com as colunas: id:integer - task:string - priority:number - done:boolean - created_at:datetime - updated_at:datetime;
- Os valores esperados, pelo frontend, para priority é de 0 a 3;

## Primeiros passos

### Clonar repositório do github

[Diretório Github: CoderTroop_API](https://github.com/pedromsra/CoderTroop_API)

### Variáveis de ambiente

- Criar arquivo .env, no root da aplicação, exatamente igual ao arquivo sample.env, com as seguintes variáveis:
  - PORT=3003 (ou a de sua preferência);
  - AUTH_SECRET=SEGREDOSECRETO (ou o de sua preferência)

> Caso o arquivo .env não seja criado, será utilizado os valores padrão de 3003 para PORT e 'defaul' para AUTH_SECRET

### Iniciando a aplicação

- Abrir terminal e digitar:
  - `$ cd /local_da_pasta_onde_a_API_está_salva;`
  - `$ npx knex migrate:latest`
  - `$ npm install`
  - `$ npm run dev`

> Para os fins dessa documentação será considerado o servidor local de enderço localhost:3003;

> Para alterar o servidor recomenda-se alterar no arquivo .env em PORT;

## Paths

### "/sessions"

#### post

- endereço: localhost:3003/sessions;
- info: cria uma sessão, gerando o token que contem o id do usuário autenticado;
- Requisição esperada em JSON (exemplo):

		{
			"email":"pedromsra@gmail.com",
			"password":"123456"
		}

- response:

		{
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzcxMTc1MzAsImV4cCI6MTY3NzIwMzkzMCwic3ViIjoiNDIifQ.OOSjT0sd_QKKsyHy058S8oVLTFG5W1kzWmV50cT358s"
		}

- Comment: numa aplicação frontend, é recomendável salvar esse token no localhostt, de modo a manter o usuário autenticado. Por padrão o tempo de sessão definido na aplicação é 1 dia.

> Exemplo no Insomnia para salvar token como variável de ambiente do insomnia e usar nas demais requisições http:
> - Dentro da pasta root do projeto do insomnia, na opção de general enviroments (canto superior esquerdo (ao lado da casinha)), clicar em "Manage Environments";
> - Clicar em Base Environment (lateral esqueda);
> - Digitar: 
>		{
>			"USER_TOKEN": "response"
>		}
> - Irá aparecer um menu, selecione Response > Body Attribute;
> - Clicar no campo em vermelho;
> - Selecionar:
>	- Request > [SESSIONS] PostCreate;
>	- Filter > $.token;
>	- Trigger Behavior > Always;

> Exemplo no Insomnia para usar o token no header da requisição:
> - Na aba Authentication da requisição, selecionar Bearer Token e no campo Token digitar _.USER_TOKEN

### "/users"

#### post

- endereço: localhost:3003/users;
- info: cria um novo usuário;
- Requisição esperada em JSON (exemplo):

 		{
			"name":"Pedro Saboia",
			"email":"pedros@gmail.com",
			"password":"123456"
		}

- response: status(201);

### "/tasks"

#### post

- endereço: localhost:3003/tasks;
- info: cria uma nova tarefa para o usuário que está autenticado;
- Requisição esperada em JSON (exemplo):

		{
            "task": "Comprar pão",
			"priority": 1
		};

- response: status(201);

#### put

- endereço: localhost:3003/tasks/:id;
- info: modifica a tarefa informada para o usuário que está autenticado;
- Requisição esperada em JSON (exemplo):

		{
			"task": "Comprar pão",
			"priority": 2,
            "done": true
		};

- response: status(200);

#### get

- endereço: localhost:3003/tasks;
- info: retorna uma lista das tarefas salvas do usuário autenticado, **ordenada de acordo com a prioridade, decrescente**;
- response:

		[
			{
				"id": 1,
				"task": "Comprar pão",
				"priority": 1,
				"done": true,
			},
			{
				"id": 1,
				"task": "Terminar o FE do teste da codertroop",
				"priority": 3,
				"done": false,
			}
		];

#### delete

- endereço: localhost:3003/meals/:id;
- info: remove a tarefa de id informado do usuário autenticado;
- response: status(201);