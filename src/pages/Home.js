import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const Home = () => {
  const {userIn} = useContext(AuthContext);
  
  return (
    <div className="jumbotron">
      <h1>Welcome {userIn ? userIn.userName : null}</h1>
      <hr className="my-4" />
      {!userIn ? <p>Register or Login with your own account</p> : null}
    </div>
  )
}

export default Home;