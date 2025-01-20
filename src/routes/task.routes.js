const Router = require('express');
const { Preg_Categorias, getall } = require('../controllers/tasks.controllers.js');
const router = Router();

// GET
router.get('/categoria', Preg_Categorias);
router.get('/all', getall);

module.exports = router;
