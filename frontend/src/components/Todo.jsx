import React, { useCallback, useRef, useState } from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/TodoSlice'
import axios from 'axios';
import toast from "react-hot-toast"


function Todo({ _id, task, isCompleted, index, onDragStart, onDragOver, onDrop, onEdit }) {
    const dispatch = useDispatch()

    const inputRef = useRef(null)

    const [completeStatus, setCompleteStatus] = useState(isCompleted)
    const [todoTitle, setTodoTitle] = useState(task)
    const [isTodoEditable, setIsTodoEditable] = useState(false)


    const handleTodoEdit = () => {
        const editVal = !isTodoEditable
        setIsTodoEditable(editVal)

        if (editVal) {
            inputRef.current.focus()
        }
        else handleTodoUpdate()
    }

    const handleDeleteTodo = async () => {
        try {
            const deletedTodo = await axios.delete(`/api/v1/todo/delete-todo/${_id}`)
            if (deletedTodo.data) {
                toast.success(deletedTodo.data.message)
                dispatch(deleteTodo(_id))
            }
        } catch (error) {
            toast.error(error.response)
        }
    }

    const completeToggle = () => {
        setCompleteStatus(prev => {
            const completeValue = !prev
            handleTodoUpdate(completeValue)
            return completeValue
        })
    }

    const handleTodoUpdate = async (isComplete) => {

        const data = {
            task: todoTitle,
            isCompleted: isComplete
        }

        try {
            const updatedTodo = await axios.put(`/api/v1/todo/edit-todo/${_id}`, data)
            if(updatedTodo.data){
                dispatch(updateTodo(updatedTodo.data.data))
            }

        } catch (error) {
            toast.error(error.response?.data.error)
        }
    }

    return (
        <div draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
            className={`w-full h-[50px] px-2 ${completeStatus ? "bg-[#4caf50]" : null} active:opacity-50 cursor-grab bg-[#292929] rounded-md flex justify-between items-center`}>

            <div className='flex w-2/3 space-x-2 items-center'>
                <input type="checkbox" checked={completeStatus} className='w-[15px] h-[15px]' onChange={completeToggle} />

                <textarea type="text"
                    ref={inputRef}
                    value={todoTitle}
                    readOnly={!isTodoEditable}
                    className={`hide-scrollbar text-justify h-[28px] resize-none  bg-transparent w-auto text-[18px] ${completeStatus ? "line-through text-black" : null}  focus:outline-none text-white font-[poppins]`}
                    style={{ width: 'auto' }}
                    onChange={(e) => setTodoTitle(e.target.value)}>
                </textarea>
            </div>
            <div className='w-1/3 flex items-center justify-end space-x-1'>
                {
                    completeStatus ? null : <button onClick={handleTodoEdit}>{isTodoEditable ? "📁" : "✏️"}</button>
                }
                <button onClick={handleDeleteTodo}><DeleteRoundedIcon sx={{ color: "#ff4c4c" }} /></button>
            </div>

        </div>
    )
}

export default Todo