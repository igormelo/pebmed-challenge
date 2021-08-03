<h3 align="center">
  Desafio backend PEBMED
</h3>
<p align="center">Nesse projeto utilizo o nodeJS e banco de dados SQL: migrations, relacionamentos, queries simples e complexas</p>

## 🚀 Tecnologias

- Express — A web framework for Node.js
- Sequelize — SQL dialect ORM for Node.js

## ✋🏻 Pré-requisito

- [Node.js](https://nodejs.org/en/)

## 🔥 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta `cd pebmed`;
3. Rode `npm install` para instalar as dependências;
4. Altere as credencias dentro de `/src/config/database.js`;
5. Rode `npm run migrations` para executar as migrations;
6. Rode `npm run seeds` para criar um usuario admin padrão execute a seed;
7. Rode `npm run dev` para iniciar o servidor.


## Passo a Passo

 - Primeiro utilize a rota de login `localhost:3000/login` com o USUARIO: admin@pebmed.com.br  SENHA: pebmedpass para receber um token de autenticação
 - Utilize o token para cadastrar pacientes, medicos, anotações e agendamentos
 - Primeiro para cadastrar um <b>médico</b> acesse a rota `localhost:3000/doctors/create` passando o parâmetros para o cadastro
 ```javascript
 {
      name: 'John',
      lastname: 'Cena',
      login: 'john@pebmed.com.br',
      password: '123456'
 }
 ```
    ℹ️ Utilizando sempre o token retornado pelo login

 - Agora `localhost:3000/patient/signup` para criar um <b>paciente</b> passando os parametros (<b>header</b>: Autorization: `TOKEN`)
    <p><i>name</p></i>
    <p><i>phone</p></i>
    <p><i>email</p></i>
    <p><i>birthday</p></i>
    <p><i>gender</p></i>
    <p><i>height</p></i>
    <p><i>weight</p></i>
 - Para listar todos os pacientes acesse a rota `localhost:3000/patients`
 - Para listar um paciente especifico acessa a rota `localhost:3000/patient/patient_id`
    <p>Exemplo: localhost:3000/patient/1</p>
 - Para editar os pacientes `localhost:3000/patient/patient_id` passando os parametros que deseja alterar
 - Para criar os <b>agendamentos</b> de consulta `localhost:3000/schedules/create` passando os parametros
    <p><i>patient_id</p></i>
    <p><i>doctor_id</p></i>
    <p><i>scheduling_date</p></i>
 - Para listar os agendamentos de um paciente acesse `localhost:3000/schedules/patient_id`
 - Para alterar o agendamento de um paciente acesse a rota passando o id o paciente e depois id do agendamento `localhost:3000/schedules/patient_id/id`
    <p>Exemplo: localhost:3000/schedules/4/1</p>
 - Para deletar <b>todos</b> os agendamentos de um paciente acesse `localhost:3000/schedules/patient_id` utilizando o <b>DELETE</b> do <b>POSTMAN</b>
 - Para deletar um agendamento <b>especifico</b> de um paciente acesse `localhost:3000/schedules/patient_id/id` utilizando o <b>DELETE</b> do <b>POSTMAN</b>
    <p>Exemplo: localhost:3000/schedules/4/1</p>
 - Para criar <b>anotações</b> sobre um paciente, faça um post utilizando a rota `localhost:3000/notes/patient_id` passando os parametros
    <p>consultation_date (Data da consulta)</p>
    <p>atendimento (Anotações sobre o paciente)</p>
 - Para consultar as anotações sobre um paciente, faça um get utilizando a rota `localhost:3000/notes/patient_id`
