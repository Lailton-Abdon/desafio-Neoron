<h1>Projeto de Gerenciamento de Voos</h1> 

<p align="center">
  <img src="https://img.shields.io/static/v1?label=react&message=framework&color=blue&style=for-the-badge&logo=REACT"/>
  <img src="https://img.shields.io/static/v1?label=Netlify&message=deploy&color=blue&style=for-the-badge&logo=netlify"/>
  <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
  <img src="http://img.shields.io/static/v1?label=Ruby&message=2.6.3&color=red&style=for-the-badge&logo=ruby"/>
  <img src="http://img.shields.io/static/v1?label=Ruby%20On%20Rails%20&message=6.0.2.2&color=red&style=for-the-badge&logo=ruby"/>
  <img src="http://img.shields.io/static/v1?label=TESTES&message=%3E100&color=GREEN&style=for-the-badge"/>
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
   <img src="http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge"/>
</p>

> Status do Projeto: :heavy_check_mark: :warning: (Em desenvolvimento)


## Descrição do projeto

<p align="justify"> O Projeto de Gerenciamento de Voos é uma aplicação desenvolvida com NestJS, destinada a gerenciar e otimizar o controle de voos. Utilizando Docker para facilitar a configuração do ambiente e .env para gerenciar variáveis de ambiente, o sistema é projetado para ser escalável e modular. O objetivo é fornecer uma solução eficiente para o gerenciamento de voos, desde o cadastro e edição de voos até a validação de regras de negócios, como a verificação de intervalos entre voos e restrições de destinos. </p>

...

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos)

...


## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)

:warning: [Nestjs](https://docs.nestjs.com/first-steps)

:warning: [Docker](https://www.docker.com/)

:warning: [Docker Compose](https://docs.docker.com/compose/install/)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

... 


## Funcionalidades

:heavy_check_mark: Cadastro e Edição de Voos
Permite a criação e atualização de registros de voos, incluindo detalhes como código, origem, destino e data.

:heavy_check_mark: Validação de Regras de Negócio
Garante que os voos atendam a regras específicas, como um intervalo mínimo de 30 minutos entre voos e a restrição de voos para o mesmo destino no mesmo dia.

:heavy_check_mark: Configuração de Ambiente com Docker
Facilita a configuração e execução da aplicação e do banco de dados utilizando containers Docker.

... 


## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
npm install
```

Crie um arquivo .env:

```
DATABASE_HOST=postgres
DATABASE_USER=abc
DATABASE_PASSWORD=123
DATABASE_PORT=5432
DATABASE_NAME=nest
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public"
```

Inicie os serviços com Docker Compose:

```
docker compose up -d
```

Iniciar a aplicação NestJS:

```
npm run start
```

... 

## Licença 

The [MIT License]() (MIT)

Copyright :copyright: Ano - Titulo do Projeto
