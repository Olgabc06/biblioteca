module.exports = biblioteca => {
    const prestamo = require("../controllers/prestamos.controller.js");
    var router = require("express").Router();

    router.post("/create", prestamo.create);
    router.get("/", prestamo.findAll);
    router.get("/:id", prestamo.findOne);
    router.put("/update/:id", prestamo.update);
    router.delete("/delete/:id", prestamo.delete);
    router.delete("/delete/", prestamo.deleteAll);

    biblioteca.use("/api/prestamo", router);
};