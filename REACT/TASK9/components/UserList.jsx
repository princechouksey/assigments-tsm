import React, { useEffect, useState } from 'react'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
       fetch('https://jsonplaceholder.typicode.com/users').then((response)=>{
           if(!response.ok){
            throw new Error("Response is not Ok");
           }
           return response.json();
       })
       .then((data)=>{
        // console.log(data);
        setUsers(data);
       })
       .catch(error=>{
        setError(error.message);
       })
       .finally(()=>{
        setloading(false);
       })
      
    }, [])

    if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
    console.log(users);
    
  return (
    <div>
         <h1>User List</h1>
        <ol>
           {users.map(user=>{
            return <li className='font-md px-5' key={user.id}>{user.name}</li>
           })}
        </ol>

    </div>
  )
}

export default UserList