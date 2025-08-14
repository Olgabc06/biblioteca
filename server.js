const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const biblioteca = express();

var corsOptions = {
    origin: "http://localhost:8083"
};

biblioteca.use(cors(corsOptions));

biblioteca.use(bodyParser.json());

biblioteca.use(bodyParser.urlencoded({ extended: true}));

const db = require("./biblioteca/models");
db.sequelize.sync();

biblioteca.get("/", (req, res) => {
    res.json({ message: "Biblioteca Web Aplication"});
});

require("./biblioteca/routes/prestamos.routes.js")(biblioteca);
require("./biblioteca/routes/estudiantes.routes.js")(biblioteca);
require("./biblioteca/routes/libro.routes.js")(biblioteca);

const PORT = process.env.PORT || 8083;
biblioteca.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}); 