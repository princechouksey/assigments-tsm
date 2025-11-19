import React from 'react'

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="flex items-center justify-between w-full mb-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">TASKIFY</h1>
        {user?.name && (
          <span className="text-sm text-gray-600 hidden sm:inline">— Signed in as <strong className="text-black">{user.name}</strong></span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user?.email && (
          <span className="text-sm text-gray-600">{user.email}</span>
        )}
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
