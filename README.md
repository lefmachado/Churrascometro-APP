# Índice

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Pré-requisitos para Rodar o Projeto](#pré-requisitos-para-rodar-o-projeto)
4. [Como Rodar o Projeto](#como-rodar-o-projeto)
  - [Inicializar o JSON Server](#1-inicializar-o-json-server)
  - [Rodar a Aplicação Angular](#2-rodar-a-aplicação-angular)
5. [Estrutura do Projeto](#estrutura-do-projeto)
  - [Principais Componentes](#principais-componentes)
  - [API Simulada (`json-server`)](#api-simulada-json-server)
6. [Scripts Úteis](#scripts-úteis)
  - [Construir o Projeto](#1-construir-o-projeto)
  - [Gerar um Novo Componente](#2-gerar-um-novo-componente)
  - [Testes Unitários](#3-testes-unitários)
  - [Testes de Ponta-a-Ponta](#4-testes-de-ponta-a-ponta)
7. [Observações](#observações)
8. [Ajuda](#ajuda)

---

# Churrascometro

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 17.3.11.

## Sobre o Projeto

O **Churrascometro** é uma aplicação web desenvolvida para ajudar na organização de churrascos. Ele calcula a quantidade ideal de carnes, bebidas e o custo total com base no número de adultos e crianças presentes.  

### **Funcionalidades**
- **Cadastro de churrascos**: Informe o número de adultos e crianças, selecione carnes e bebidas e salve os detalhes do evento.
- **Resumo detalhado**: Exibição clara da quantidade de itens necessários e os custos associados.
- **Simulação de API**: A aplicação interage com um servidor simulado utilizando o `json-server`.
- **Gerenciamento de eventos**: Veja, edite ou exclua eventos cadastrados.

---

## Pré-requisitos para Rodar o Projeto

1. **Node.js**: Certifique-se de que o Node.js está instalado. Baixe em [nodejs.org](https://nodejs.org/).
2. **Angular CLI**: Instale o Angular CLI globalmente:
   ```bash
   npm install -g @angular/cli
   ```
3. **JSON Server**: Instale o `json-server` globalmente para simular a API:
   ```bash
   npm install -g json-server
   ```

---

## Como Rodar o Projeto

### **1. Inicializar o JSON Server**
Antes de iniciar a aplicação Angular, é necessário rodar o servidor simulado:

1. Navegue até a pasta onde o arquivo JSON está localizado:
   ```bash
   cd api
   ```
2. Execute o comando para iniciar o servidor:
   ```bash
   json-server --watch churrascometro.json
   ```
3. O servidor será iniciado na porta **3000**. Acesse os endpoints em:
   - Base URL: `http://localhost:3000`
   - Exemplo de endpoint: `http://localhost:3000/usuarios` ou `http://localhost:3000/churrascos`.

---

### **2. Rodar a Aplicação Angular**
1. No diretório principal do projeto, instale as dependências:
   ```bash
   npm install
   ```
2. Execute o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
3. Navegue até `http://localhost:4200/` para visualizar a aplicação.

---

## Estrutura do Projeto

### **Principais Componentes**
- **Login**: Tela para autenticação do usuário.
- **Cadastro de Churrascos**: Formulário para adicionar um novo evento.
- **Lista de Churrascos**: Exibe os churrascos cadastrados com opções para visualizar e excluir.
- **Resumo do Churrasco**: Mostra os detalhes calculados, como quantidade de carnes e bebidas.

### **API Simulada (`json-server`)**
- **Arquivo JSON**: `api/churrascometro.json`
- Endpoints disponíveis:
  - **Usuários**: `GET /usuarios`  
  - **Churrascos**: `GET /churrascos`, `POST /churrascos`, `DELETE /churrascos/:id`

---

## Scripts Úteis

### **1. Construir o Projeto**
Para compilar a aplicação:
```bash
ng build
```
Os artefatos serão gerados na pasta `dist/`.

### **2. Gerar um Novo Componente**
Use o Angular CLI para criar novos componentes:
```bash
ng generate component nome-do-componente
```

### **3. Testes Unitários**
Execute os testes unitários com Karma:
```bash
ng test
```

### **4. Testes de Ponta-a-Ponta**
Para executar testes de ponta-a-ponta (e2e):
```bash
ng e2e
```

---

## Observações

- Certifique-se de que o `json-server` está rodando antes de iniciar a aplicação Angular para evitar erros de conexão.
- A porta padrão para o `json-server` é **3000**, enquanto o Angular usa **4200**. Ambas precisam estar disponíveis no ambiente local.

Para mais ajuda com o Angular CLI, use `ng help` ou consulte a [documentação oficial](https://angular.io/cli).

---

Se precisar de mais alguma modificação ou detalhamento, é só avisar! 🚀
