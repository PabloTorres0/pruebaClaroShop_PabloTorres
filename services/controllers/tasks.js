const { matchedData } = require('express-validator')
const  taskModel = require('../models/nosql/task')
const {handleHttpError} = require ( '../utils/handleError') 
/**
 * Get Tasks
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req,res) => {
    
    try {
        const data =  await taskModel.find({})
        res.send({data})
    } catch (error) {
        handleHttpError(res,'Error en getItems')
    
}
}

/**
 * Get Detail
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req,res) => {
    try {
        req = matchedData(req)
        const {id}=req
        const data =  await taskModel.findById(id)
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'Error getItem')
    }
}

/**
 * Insert task
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async(req,res) => {
    
    try {
        const body = matchedData(req)
        const data = await taskModel.create(body)
        res.send({data})
        
    } catch (error) {
        handleHttpError(res,"Error en CreateItem")
    }
}

/**
 *  Update task
 * @param {*} req 
 * @param {*} res 
 */

const updateItem = async (req,res) => {
    try {
        const {id, ...body} = matchedData(req)
        const data = await taskModel.findOneAndUpdate(
            {_id: id},body
        )
        res.send({data})
        
    } catch (error) {
        handleHttpError(res,"Error en updateItem")
    }
}

/**
 * Delete Task
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req,res) => {
    try {
        req = matchedData(req)
        const {id}=req
        const data =  await taskModel.deleteOne({_id:id})
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'Error en deleteItem')
    }
}



module.exports = {getItems, getItem, createItem, updateItem, deleteItem}