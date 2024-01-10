const Sequelize = require('sequelize');

const sequelize = new Sequelize("loginecadastronode", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log("Ação realizada com sucesso!");
    }).catch(() => {
        console.log("Ação não realizada com sucesso.");
    })

module.exports = sequelize;