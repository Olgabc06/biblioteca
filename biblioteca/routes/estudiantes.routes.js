module.exports = app => {
  const estudiantes = require("../controllers/estudiantes.controller.js");
  const router = require("express").Router(); // usa el enrutador de Express

  // Crear estudiante
  router.post("/create", estudiantes.create);

  // Obtener todos los estudiantes
  router.get("/", estudiantes.findAll);

  // Obtener un estudiante por ID
  router.get("/:id", estudiantes.findOne);

  // Actualizar un estudiante por ID
  router.put("/:id", estudiantes.update);

  // Eliminar un estudiante por ID
  router.delete("/:id", estudiantes.delete);

  // Eliminar todos los estudiantes
  router.delete("/", estudiantes.deleteAll);

  // Ruta base para todas las rutas de estudiantes
  app.use("/api/estudiantes", router);
};
