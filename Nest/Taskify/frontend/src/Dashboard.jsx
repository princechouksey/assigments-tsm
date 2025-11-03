import React from 'react'

const Dashboard = () => {
  return (
    <div className='w-full h-screen rounded-2xl '>
        <div className='w-full h-screen  px-8 py-5 '>

        <nav className='flex items-center justify-between'>
            <h1 className='text-5xl font-bold '>TASKIFY</h1>
            <h1 className='text-xl font-semibold text-red-600 cursor-pointer'> LOGOUT</h1>
        </nav>

        <div className='flex items-start justify-start w-full h-screen mt-5 gap-5 '>
           <div className="w-[27%] h-[300px] bg-white rounded-2xl p-5 shadow-lg border border-gray-800 flex flex-col gap-4 text-black">
  {/* Task Title Input */}
  <div className="flex items-center gap-3 text-black">
    <input
      type="text"
      placeholder="Enter Task Title..."
      className="flex-1 px-4 py-2 rounded-lg text-black border-1  focus:outline-none  focus:ring-black transition-all"
    />
    <button
      className="h-10 w-10 flex items-center justify-center text-white bg-black text-2xl rounded-full  active:scale-95 transition-all duration-200"
      title="Add Task"
    >
      +
    </button>
  </div>

  {/* Task Description */}
  <textarea
    placeholder="Enter task description..."
    rows="5"
    className="w-full p-3 rounded-lg text-black border-1 focus:outline-none  focus:ring-black transition-all resize-none"
  ></textarea>

  {/* Optional Add Task Button Below */}
  <button
    className="mt-auto bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-all"
  >
    Create Task
  </button>
</div>

            <div className='w-[70%]  h-[500px]'>
                
               <div className="w-[200px] h-[200px] text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between border border-gray-700">
  <div>
    <h1 className="text-xl font-semibold text-blue-400 truncate">Task Title</h1>
    <h2 className="text-sm text-black mt-2 line-clamp-4">
      This is a short description of the task. It can wrap into multiple lines but stays neat.
    </h2>
  </div>

  {/* Bottom Section */}
  <div className="mt-4 flex justify-between items-center">
    <h3 className="text-sm text-green-400 font-medium  px-3 py-1 rounded-full">
      Completed
    </h3>
    <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition-all">
      View
    </button>
  </div>
</div>

            </div>
        </div>

    </div>
    </div>
  )
}

export default Dashboard