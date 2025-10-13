import React from 'react'

interface Props{
    todo:string,
    setTodo: React.Dispatch<React.SetStateAction<string >>
    handleAdd:(e: React.FormEvent)=>void;
}

const InputField:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
  return (
    <form action="" onSubmit={handleAdd}>
        <input type="input" value={todo} onChange={(e)=>setTodo(e.target.value)} placeholder='Enter a Task' className='w-80 px-2 py-4 mt-3 rounded-4xl bg-white ' />
        <button type='submit' className=' h-10 w-10 rounded-[50%] bg-green-300 -ml-12 cursor-pointer  '  >Go</button>
    </form>
  )
}

export default InputField