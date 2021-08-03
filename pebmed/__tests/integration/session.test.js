const request = require('supertest');
const app = require('../../app');
// const factory = require('../factories');

describe('Autenticação', () => {
    it('a rota /login deve autenticar se as credenciais forem validas', async () => {

        const response = await request(app)
        .post("/login")
        .send({
            login: 'admin@pebmed.com.br',
            password:'pebmedpass'
        })
        expect(response.status).toBe(200);
    })

    it('a rota /login não deve autenticar se as credenciais forem invalidas', async () => {

        const response = await request(app)
        .post("/login")
        .send({
            login: 'admin@pebmed.com.br',
            password:'pebmedpassss1'
        })
        expect(response.status).toBe(401);
    })

    it('A rota /login deve retornar um token JWT se o login for valido', async () => {

        const response = await request(app)
        .post("/login")
        .send({
            login: 'admin@pebmed.com.br',
            password: 'pebmedpass'
        })
        expect(response.body).toHaveProperty("token");
    });

    it('a rota /pacientes não deve retornar os pacientes se o token não for valido', async () => {

        const response = await request(app)
        .get("/patients")
        .set("Authorization", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI1MDkwMTAzLCJleHAiOjE2MjUwOTE1NDN9.Svw7nsdYITpsHRDN1-pwW5aOEf4p30sH7RCuk3vvJ6M`);
        
        expect(response.status).toBe(401);
    })


    
})

