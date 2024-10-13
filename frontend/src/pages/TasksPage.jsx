import React, { useEffect, useMemo, useState } from 'react'
import Todo from '../components/Todo'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, reorderTodos, setTodos } from '../slices/TodoSlice'
import BorderLinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from "axios"
import toast from 'react-hot-toast';


function TasksPage() {

  const dispatch = useDispatch()
  const allTodosFromSessionStorage = useSelector(state => state.todo.todos)
  const [allTodos, setAllTodos] = useState(allTodosFromSessionStorage || [])
  const [todoInput, setTodoInput] = useState('')

  const completedTasks = useMemo(() => {
    return allTodos.filter(todo => todo.isCompleted).length
  }, [allTodos])

  const [progress, setProgress] = useState(0)

  const progressValue = useMemo(() => {
    const totalTodosLength = allTodos.length
    if (totalTodosLength == 0) return 0;
    const completedTodosLength = completedTasks

    return (completedTodosLength / totalTodosLength) * 100
  }, [allTodos])

  useEffect(() => {
    setProgress(progressValue);
  }, [progressValue]);

  useEffect(() => {
    setAllTodos(allTodosFromSessionStorage)
  }, [allTodosFromSessionStorage])

  useEffect(() => {
    getTodoFromDatabase()
  }, [])

  const handleTodoInput = (e) => {
    setTodoInput(e.target.value)
  }

  const handleTodoSubmit = async (e) => {
    e.preventDefault()
    if (todoInput.trim() == "") return

    try {
      const createdTodo = await axios.post("/api/v1/todo/create-todo", { task: todoInput })
      dispatch(addTodo({_id: 1, task: todoInput}))

    } catch (error) {
      toast.error(error.response.data.error)
    }

    setTodoInput('')
  }

  const getTodoFromDatabase = async () => {
    try {
      const response = await axios.get("/api/v1/todo/get-todos")
      if(response.data) dispatch(setTodos(response.data))
      // sessionStorage.setItem("todo", JSON.stringify(data.todos))
    } catch (error) {
      toast.error(error?.response.data.error)
    }
  }

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedItem === null) return;
    const updatedTodos = [...allTodos];
    const [movedItem] = updatedTodos.splice(draggedItem, 1);
    updatedTodos.splice(index, 0, movedItem);
    setAllTodos(updatedTodos);
    dispatch(reorderTodos(updatedTodos))
    setDraggedItem(null);
  };

  const handleTodoInputEdit = () => {

  }
  return (

      <div className='w-full pt-[10vh] min-h-screen px-3 pb-5 bg-gradient1 space-y-5 flex-col lg:flex-row flex md:space-x-2 justify-evenly items-center'>

        <div className='flex w-full lg:justify-between sm:w-1/2 lg:w-[80%] space-y-5 flex-col lg:flex-row lg:gap-10'>

          <div className='flex w-full lg:w-[35%] flex-col items-center rounded-[30px]'>

            <h1 className='w-full text-left text-white font-jetbrains text-[26px] tracking-tighter'>Schedule Your Day</h1>

            <div className='w-full mt-1'>
              <form onSubmit={handleTodoSubmit} className='flex space-x-2'>
                <input type="text" value={todoInput} onChange={handleTodoInput} placeholder='Add Tasks' className='w-full bg-transparent border px-2 border-gray-600 focus:outline-none font-[montserrat] text-[20px] text-white rounded-md py-1' />
                <button type='submit' className='bg-[#1e2ede] font-jetbrains text-white px-4 py-1 text-[20px] rounded-md'>Add</button>
              </form>
            </div>

            <div className='mt-5 border border-gray-600 p-3 min-h-[350px] sm:max-h-[400px] overflow-y-scroll hide-scrollbar space-y-3 rounded-xl w-full'>
              {
                allTodos.length ? allTodos.map((todo, index) => (
                  <Todo
                    key={todo._id}
                    _id={todo._id}
                    task={todo.task}
                    isCompleted={todo.isCompleted}
                    index={index}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop} />
                )) : <h1 className='text-white'>No Tasks</h1>
              }
            </div>
          </div>

        {/* Progress Section */}
        <div className='h-[200px] lg:w-[45%] mb-5 w-full bg-[#212121] rounded-xl p-3'>

          <h1 className='font-[poppins] text-white text-[24px] md:text-[40px] font-medium leading-none'>Your Progress</h1>

          <div className='w-full mt-2 flex flex-col'>

            <span className='text-gray-400 font-jetbrains'>{Math.round(progress)}% Completed</span>
            <Box sx={{ width: "100%" }}>
              <BorderLinearProgress variant='determinate' value={progress}
                sx={{
                  borderRadius: "25px",
                  height: "10px",
                  backgroundColor: '#313131',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4caf50',
                  },
                }} />
            </Box>

          </div>

          <div className='mt-3'>
            <h2 className='font-[poppins] text-gray-400'>Total Tasks - {allTodos && allTodos.length}</h2>
            <h2 className='font-[poppins] text-gray-400'>Completed Tasks - {completedTasks}</h2>
            <h2 className='font-[poppins] text-gray-400'>Pending Tasks - {allTodos.length - completedTasks}</h2>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TasksPage