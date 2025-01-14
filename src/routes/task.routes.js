const Router = require('express');
const { getallCategorias, getall } = require('../controllers/tasks.controllers.js');
const router = Router();

// GET
router.get('/categorias', getallCategorias);
router.get('/all', getall);

module.exports = router;
