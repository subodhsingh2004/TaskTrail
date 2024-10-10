import { Router } from "express";
import { createTodo, deleteTodo, editTodo, getTodo } from "../controllers/todo.controller.js";
import {verifyJWT} from "../middlewares/verifyJWT.js";

const router = Router()

// create Todo
router.route("/create-todo").post(verifyJWT, createTodo)
// get Todo
router.route("/get-todos").get(verifyJWT, getTodo)
// edit Todo
router.route("/edit-todo/:todo_id").put(verifyJWT, editTodo)
// delete Todo
router.route("/delete-todo/:todo_id").delete(verifyJWT, deleteTodo)


export default router