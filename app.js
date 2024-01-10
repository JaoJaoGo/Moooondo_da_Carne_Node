const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');

const path = require('path');
const bodyParser = require('body-parser');
const validator = require('validator')
const bcrypt = require('bcrypt');

const User = require("./models/User")

// Porta
const port = 8080;

// Chave secreta
const SECRET_KEY = 'testetesteteste'

// Configurando body-parser para formulários
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.get('/', async (req, res) => {
    res.redirect('./views/index.html');
});

// Sistema de cadastro
app.post('/cadastro', async (req, res) => {
    const { nome, emailcadastro, senhacadastro, senhacadastroconfirm } = req.body;

    // Verifica se o email é válido
    if(!validator.isEmail(emailcadastro)) {
        return res.status(400).send("E-mail inválido!");
    }

    // Verifica se as senhas são iguais
    if(senhacadastro !== senhacadastroconfirm) {
        return res.status(400).send("As senhas digitadas não coincidem!");
    }

    try {
        // Gera o hash da senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(senhacadastro, 10);

        const newUser = await User.create({
            name: nome,
            email: emailcadastro,
            password: hashedPassword
        });

        res.redirect('./views/index.html')
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao relizar o cadastro.");
    }
})

// Sistema de Login
app.post('/login', async (req, res) => {
    try {
        const { emaillogin, senhalogin } = req.body;

        // Encontrar o usuário pelo e-mail
        const user = await User.findOne({ emaillogin });
        if(!user) {
            return res.status(401).send("Login ou senha incorretos.");
        }
    
        // Comparar as senhas
        const passwordMatch = await bcrypt.compare(senhalogin, user.password);
        if(!passwordMatch) {
            return res.status(401).send("Login ou senha incorretos.");
        }

        const token = jwt.sign({ emaillogin }, SECRET_KEY, { expiresIn: "1hr" });

        res.json({
            "acess_token": {
                "token": token,
                "expiresIn": Date.now() + 3600 * 1000
            }
        });
    } catch(error) {
        console.log(error);
        res.status(500).send("Erro interno do servidor.");
    }
})

// Ligar servidor
app.listen(port, (req, res) => {
    console.log(`Servidor iniciado na porta ${port}: localhost:${port}`);
})