const todo = require('../models/todos')

const getAllTodo = async(req, res)=>{
    // console.log(req.user)
    try{
        const data = await todo.find({user: req.user._id})
        res.status(200).json({
            data: data
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }

}

const getTodo = async(req, res)=>{
    try{
        console.log("getTodo")
        const toDo = await todo.findOne({_id:req.params.id, user:req.user._id})
        if (!toDo){
            return res.status(404).json({
                msg:`toDO not found with this id ${req.params.id}`
            })
        }
        res.status(200).json({
            data:toDo
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

const postTodo = async (req, res)=>{
    try{
        await todo.create({...req.body,user: req.user._id})
        res.status(200).json({
            msg: "data inserted"
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

const updateTodo = async (req, res)=>{
    try{
        const user = await todo.findByIdAndUpdate({_id:req.params.id, user:req.session.user},
            {...req.body},
            {new:true, runValidators:true}
        )
        if (!user){
            return res.status(404).json({
                msg: `task doesn't exist with id ${req.params.id}`
            })
        }

        res.status(200).json({
            data:user
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

const deleteTodo = async (req, res)=>{
    try{
        const user = await todo.findByIdAndDelete({_id:req.params.id, user:req.session.user})
        if (!user){
            return res.status(404).json({
                msg: `task doesn't exist with id ${req.params.id}`
            })
        }
        res.status(200).json({
            msg:"todo is deleted Successfully"
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

const filterTodoByDate = async (req, res)=>{
    const {createdAt, lt_dueDate, gt_dueDate} = req.query
    try{
        let toDo = []
        if (createdAt){
            toDo = await todo.find(
                {createdAt: req.query.createdAt,
                    user:req.session.user
                })
        }else if(lt_dueDate){
            toDo = await todo.find({
                user: req.session.user,
                dueDate: {$lt: lt_dueDate}
            })
        }else if(gt_dueDate){
            toDo = await todo.find({
                user: req.session.user,
                dueDate: {$gte: gt_dueDate},
            })
        }

        res.status(200).json({
            data:toDo
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    getAllTodo,
    getTodo,
    postTodo,
    // updateTodo,
    // deleteTodo,
    // filterTodoByDate,
}


