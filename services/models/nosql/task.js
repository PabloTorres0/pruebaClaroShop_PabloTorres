const mongoose = require("mongoose")

const TaskScheme = new mongoose.Schema(
    {
        task:{
            type:String
        },
        state:{
            type:Boolean
        }, 
        priority:{
            type: ['low','medium', 'high'],
            default: 'medium'
        }

    },
    {
        timestamps:true,
        versionKey:false
    }

)

module.exports = mongoose.model('tasks',TaskScheme)