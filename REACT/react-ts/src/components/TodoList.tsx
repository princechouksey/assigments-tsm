import React from 'react'
import type { Todo } from '../model'


interface Props{
    todos:Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>

}
const TodoList : React.FC<Props> = ({todos, setTodos}) => {
  return (
    <div className='todos bg-red-500 '>
        {
           todos.map(todo=>(
            <li>{todo.todo}</li>

           ))
        }
        

    </div>
  )
}

export default TodoList