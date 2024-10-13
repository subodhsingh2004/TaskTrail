import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos: []
}

const TodoSlice = createSlice({
    name: "todo",

    initialState,

    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
            sessionStorage.setItem("todo", JSON.stringify(action.payload))
        },
        addTodo: (state, action) => {
            state.todos.unshift(action.payload)
            sessionStorage.setItem("todo", JSON.stringify(action.payload))
        },
        updateTodo: (state, action) => {
            const { _id } = action.payload;
            
            const index = state.todos.findIndex(todo => todo._id === _id)

            if (index != -1) {
                state.todos[index] = { ...state.todos[index], ...action.payload };
                sessionStorage.setItem("todo", JSON.stringify(state.todos));
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload)
            sessionStorage.setItem("todo", JSON.stringify(state.todos))
        },
        reorderTodos: (state, action) => {
            state.todos = action.payload
            sessionStorage.setItem("todo", JSON.stringify(state.todos))
        }
    }
})
export const {setTodos, addTodo, updateTodo, deleteTodo, reorderTodos } = TodoSlice.actions
export default TodoSlice.reducer