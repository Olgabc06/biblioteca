const db = require("../models");
const Libros = db.libro;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.titulo) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const libro = {
        titulo: req.body.titulo,
        autor: req.body.autor, 
        anioPublicacion: req.body.anioPublicacion,
        genero: req.body.genero,
        disponible: req.body.disponible
    };

    Libros.create(libro)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while creating the Book."
        });
    });
};

exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%`} } : null;

    Libros.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while retrieving Books."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Libros.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Book with id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Libros.update(req.body, {
        where: {id: id }
    })
    .then(num => {
        if(num ==1) {
            res.send({
                message: "Book was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Books with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Libros.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num ==1) {
            res.send({
                message: "Book was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Book with id=${id}. El libro no fue encontrado!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Libros.destroy({
        where: {},
        truncate: false
    })
    .then(num => {
        res.send({
            message:`${num} Book were delete successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while removing all Books."
        });
    });
};

exports.findAllAvailable = (req, res) => {
    Libros.findAll({ where: { disponible: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error occurred while retrieving available Books."
        });
    });
};