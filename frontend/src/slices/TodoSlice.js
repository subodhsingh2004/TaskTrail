import { createSlice } from "@reduxjs/toolkit"

const getTodoFromSessionStorage = () => {
    const todos = sessionStorage.getItem("todo")
    return todos ? JSON.parse(sessionStorage.getItem("todo")) : []
}

const initialState = {
    todos: [...getTodoFromSessionStorage()]
}

const TodoSlice = createSlice({
    name: "todo",

    initialState,

    reducers: {
        addTodo: (state, action) => {
            state.todos.unshift(action.payload)
            sessionStorage.setItem("todo", JSON.stringify(state.todos))
        },
        updateTodo: (state, action) => {
            const { _id } = action.payload

            const updatedTodos = state.todos.map(todo => {
                if (todo._id === _id) {
                    return { ...todo, ...action.payload };
                }
                return todo;
            });

            console.log(updatedTodos);
            

            state.todos = updatedTodos;            

            sessionStorage.setItem("todo", JSON.stringify(state.todos));
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
export const { addTodo, updateTodo, deleteTodo, reorderTodos } = TodoSlice.actions
export default TodoSlice.reducer