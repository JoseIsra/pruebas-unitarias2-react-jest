import React, { useState } from 'react';

import useTimeout from './useTimeout';

export const Ejemplo = () => {
    const [ users, setUsers ] = useState([]);
    
    useTimeout( async()=> {
            if(users.length) return;
            try {
                const result = await fetch('https://jsonplaceholder.typicode.com/users')
                const data = await result.json();
                    setUsers(data)
                localStorage.setItem('users', JSON.stringify(data))
            } catch (error) {
                console.error(error);
            }
    }, 5000)

    return (
        <div>
            <h4>USUARIOS EN 5 SEGUNDOS my boy</h4>
            {users?.map(user => (
                <div key={user.id}>
                    <p>{user.name} {user.username}</p> 
                </div>
            ))}
        </div>
    )
}
