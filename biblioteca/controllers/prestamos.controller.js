const db = require("../models");
const Prestamos = db.prestamo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.fechaprestamos) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const prestamos = {
        libroid: req.body.libroid,
        estudianteid: req.body.estudianteid, 
        fechaprestamos: req.body.fechaprestamos,
        fechadevolucion: req.body.fechadevolucion
    };

    Prestamos.create(prestamos)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while creating the Prestamos."
        });
    });
};

exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: id } : null;


    Prestamos.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while retrieving prestamos."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Prestamos.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving prestamo with id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Prestamos.update(req.body, {
        where: {id: id }
    })
    .then(num => {
        if(num ==1) {
            res.send({
                message: "Prestamo was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update prestamo with id=${id}. Maybe Prestamo was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Prestamo with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Prestamos.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num ==1) {
            res.send({
                message: "Prestamo was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Prestamo with id=${id}. El Prestamo no fue encontrado!`
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
    Prestamos.destroy({
        where: {},
        truncate: false
    })
    .then(num => {
        res.send({
            message:`${num} Prestamo were delete successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while removing all clients."
        });
    });
};

