const db = require("../models");
const Estudiantes = db.estudiante;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const estudiante = {
        nombre: req.body.nombre,
        carnet: req.body.carnet, 
        correo: req.body.correo
    };

    Estudiantes.create(estudiante)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while creating the Student."
        });
    });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%`} } : null;

    Estudiantes.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while retrieving Students."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Estudiantes.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Student with id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Estudiantes.update(req.body, {
        where: {id: id }
    })
    .then(num => {
        if(num ==1) {
            res.send({
                message: "Student was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Students with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Estudiantes.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num ==1) {
            res.send({
                message: "Student was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Student with id=${id}. El Estudiante no fue encontrado!`
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
    Estudiantes.destroy({
        where: {},
        truncate: false
    })
    .then(num => {
        res.send({
            message:`${num} Student were delete successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while removing all Students."
        });
    });
};

