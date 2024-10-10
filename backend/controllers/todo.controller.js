import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async function (req, res) {
    const { task } = req.body
    const { _id } = req.user

    if (!_id) {
        throw new ApiError(403, "unauthorized request")
    }

    const todo = await Todo.create({ task, userId: _id })
    if (!todo) {
        throw new ApiError(500, "Something went wrong")
    }

    const user = await User.findById(_id)
    user.todos.unshift(todo._id)
    await user.save()

    res.status(200).json(
        new ApiResponse(200, todo, "Added Successfully")
    )
})

const getTodo = asyncHandler(async function (req, res) {
    const user = req.user

    const userFromDatabase = await User.findById(user._id).populate("todos")

    res.send(userFromDatabase)
})

const editTodo = asyncHandler(async function (req, res) {
    const { todo_id } = req.params
    const updatedTodos = req.body


    const todo = await Todo.findByIdAndUpdate(todo_id, updatedTodos , { new: true })
    if (!todo) throw new ApiError(500, "Something went wrong")

    res.status(200).json(
        new ApiResponse(200, todo, "Updated Successfully")
    )

})

const deleteTodo = asyncHandler(async function (req, res) {
    const { todo_id } = req.params

    const todo = await Todo.findByIdAndDelete(todo_id)
    if (!todo) throw new ApiError(404, "todo not found")

    const updatedUserTodos = await User.findById(todo.userId)
    if (!updatedUserTodos) throw new ApiError(500, "Something Went Wrong")

    
    updatedUserTodos.todos = updatedUserTodos.todos.filter(t => t._id.toString() !== todo_id.toString())
    await updatedUserTodos.save()
    
    res.status(200).send({ message: "Deleted Successfully" })

})

const completeToggle = asyncHandler(async function (req, res) {
    const { todoId } = req.body

    const todo = await Todo.findById({ todoId })
    if (!todo) {
        throw new ApiError(404, "Todo not found")
    }

    todo.isCompleted = !todo.isCompleted
    await todo.save()

    res.status(200).json(todo)

})

export { createTodo, deleteTodo, completeToggle, getTodo, editTodo }