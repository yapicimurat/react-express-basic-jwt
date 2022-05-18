import { useState } from "react";



function App() {
  const [isLogged, setIsLogged] = useState(false);



  return (
    <>
      <h1>React and Express JWT Example...</h1>
      <form>
        <p>Login</p>
        <hr></hr>
        <label>Username</label>
        <input type="text" id="username" name="username" />

        <label>Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
        {
          (isLogged) ? (
            <button type="button">Authorization</button>
          ) : null
        }
      </form>



    </>
  );
}

export default App;
