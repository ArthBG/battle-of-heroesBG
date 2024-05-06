# Batalha de Vilões - Documentação de API

Bem-vindo à documentação da API para o sistema de batalha de vilões. Este sistema permite criar, atualizar, visualizar e excluir vilões, bem como realizar batalhas entre eles e visualizar o histórico de batalhas.

<img width="777" alt="villains" src="https://github.com/ArthBG/villainsBG/assets/123407087/2a93f24e-ccd6-4856-a75a-ad60ad7d88cb">

## Introdução

Este backend oferece uma série de endpoints RESTful para gerenciar vilões e suas batalhas. Ele opera com um banco de dados para armazenar informações sobre vilões e o histórico de batalhas.

## Base URL

A URL base para todos os endpoints é `/`.

## Endpoints

### 1. Listar todos os Vilões

#### Endpoint

```
GET /villains
```

#### Descrição

Este endpoint retorna uma lista de todos os vilões cadastrados no sistema.

#### Parâmetros de Resposta

- `total`: Número total de vilões retornados.
- `villains`: Lista de objetos representando os vilões.

### 2. Obter Vilão por ID

#### Endpoint

```
GET /villains/:id
```

#### Descrição

Este endpoint retorna os detalhes de um vilão com base no seu ID.

#### Parâmetros de Requisição

- `id`: ID único do vilão a ser recuperado.

#### Parâmetros de Resposta

- Objeto representando o vilão com o ID correspondente.

### 3. Obter Vilão por Nome

#### Endpoint

```
GET /villains/name/:name
```

#### Descrição

Este endpoint retorna os detalhes de um vilão com base no seu nome.

#### Parâmetros de Requisição

- `name`: Nome do vilão a ser recuperado.

#### Parâmetros de Resposta

- Objeto representando o vilão com o nome correspondente.

### 4. Criar Vilão

#### Endpoint

```
POST /villains
```

#### Descrição

Este endpoint permite criar um novo vilão no sistema.

#### Parâmetros de Requisição

- `name`: Nome do vilão (string).
- `power`: Poder do vilão (string).
- `damage`: Dano do vilão (número inteiro positivo).
- `level`: Nível do vilão (número inteiro positivo).
- `hp`: Pontos de vida do vilão (número inteiro positivo).

#### Parâmetros de Resposta

- Objeto representando o vilão recém-criado.

### 5. Atualizar Vilão

#### Endpoint

```
PUT /villains/:id
```

#### Descrição

Este endpoint permite atualizar os detalhes de um vilão existente.

#### Parâmetros de Requisição

- `id`: ID único do vilão a ser atualizado.
- `name`: Novo nome do vilão (string).
- `power`: Novo poder do vilão (string).
- `damage`: Novo dano do vilão (número inteiro positivo).
- `level`: Novo nível do vilão (número inteiro positivo).
- `hp`: Novos pontos de vida do vilão (número inteiro positivo).

#### Parâmetros de Resposta

- Objeto representando o vilão atualizado.

### 6. Excluir Vilão

#### Endpoint

```
DELETE /villains/:id
```

#### Descrição

Este endpoint permite excluir um vilão do sistema com base no seu ID.

#### Parâmetros de Requisição

- `id`: ID único do vilão a ser excluído.

#### Parâmetros de Resposta

- Objeto representando o vilão excluído.

### 7. Criar Batalha

#### Endpoint

```
POST /battles
```

#### Descrição

Este endpoint permite criar uma nova batalha entre dois vilões.

#### Parâmetros de Requisição

- `villain1_id`: ID do primeiro vilão (número inteiro positivo).
- `villain2_id`: ID do segundo vilão (número inteiro positivo).

#### Parâmetros de Resposta

- Objeto representando a batalha criada, incluindo o vencedor e o perdedor.

### 8. Listar Histórico de Batalhas

#### Endpoint

```
GET /battles
```

#### Descrição

Este endpoint retorna o histórico de todas as batalhas realizadas.

#### Parâmetros de Resposta

- `total`: Número total de batalhas no histórico.
- `battles`: Lista de objetos representando as batalhas, incluindo vencedor, perdedor e detalhes de cada batalha.

### 9. Excluir Batalha

#### Endpoint

```
DELETE /battles/:id
```

#### Descrição

Este endpoint permite excluir uma batalha do histórico com base no seu ID.

#### Parâmetros de Requisição

- `id`: ID único da batalha a ser excluída.

#### Parâmetros de Resposta

- Objeto representando a batalha excluída.

<img width="777" alt="marvelvillains" src="https://github.com/ArthBG/villainsBG/assets/123407087/bb16fe40-a366-4d00-9283-a27215534517">

## Funções Auxiliares e Batalhar

### 1. Obter Nome do Vilão

#### Função

```
nameOfVillain(id)
```

#### Descrição

Esta função retorna o nome de um vilão com base no seu ID.

### 2. Realizar Batalha

#### Função

```
battle(villain1_id, villain2_id)
```

#### Descrição

Esta função realiza uma batalha entre dois vilões com base em seus atributos. O vencedor recebe um nível adicional.

<img width="777" alt="dcvillains" src="https://github.com/ArthBG/villainsBG/assets/123407087/0954f8d0-85e8-47c6-a418-ff3fda4031d5">

