module.exports = (sequelize, Sequelize) => {

    const Prestamo = sequelize.define("prestamo", {
        libroid: {
            type: Sequelize.INTEGER
        },
        estudianteid: {
            type: Sequelize.INTEGER
        },
        fechaprestamos: {
            type: Sequelize.DATE
        },
        fechadevolucion: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return Prestamo;
};