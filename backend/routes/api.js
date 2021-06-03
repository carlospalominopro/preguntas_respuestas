const express = require('express');
const router = express.Router();



const questionController = require("../controllers/questions.controller.js");
const answersController = require("../controllers/answers.controller.js");
const thematicsController = require("../controllers/thematics.controller.js");


// ROUTES API


// Consultar preguntas y respectivas respuestas
router.get("/questions", questionController.index);

// Crear pregunta
router.post("/question/store", questionController.store);

// Actualizar pregunta
router.post("/question/update", questionController.update);

// Eliminar pregunta
router.post("/question/delete", questionController.delete);


// Crear respuesta
router.post("/answer/store", answersController.store);

// Actualizar respuesta
router.post("/answer/update", answersController.update);

// Eliminar respuesta
router.post("/answer/delete", answersController.delete);

//Consultar temáticas
router.get("/thematics", thematicsController.index);



module.exports = router;
