import React from 'react'
const Logout = ({ user, handleLogout }) => {
  return <div>
    {user.name} logged in <button onClick={handleLogout} >Logout</button>
  </div>
}
export default Logout