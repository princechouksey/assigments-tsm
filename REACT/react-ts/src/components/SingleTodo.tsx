import React from 'react'
import type { Todo } from '../model'

interface props{
    todo:Todo,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    todos:Todo[],
}

const SingleTodo:React.FC<props> = ({todo, setTodos, todos}) => {
  return (
    <form className='flex items-center '>
        <span>
            {todo.todo}
        </span>
        <div> 
            <span></span><span></span><span></span>
        </div>

    </form>
  )
}

export default SingleTodo