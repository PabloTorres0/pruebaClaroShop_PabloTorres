const express = require('express')

const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tasks')
const {validatorCreateItem,validatorGetItem} = require('../validators/tasks')
const router = express.Router()

//TODO http://localhost/tasks


/**
 * Litar tasks
 */
router.get('/tasks',getItems)
/**
 * Obtener un task
 */
router.get('/tasks/:id',validatorGetItem,getItem)
/**
 * Crear un task
 */
router.post('/tasks/',validatorCreateItem,createItem)
/**
 * Actualizar un task
 */
router.put('/tasks/:id',validatorGetItem, validatorCreateItem,updateItem)
/**
 * Eliminar Item
 */
router.delete('/tasks/:id',validatorGetItem,deleteItem)

module.exports = router