import { useState } from "react";
import axios from "axios";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const [isFetcing, setFetching] = useState(false);


  const submit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Fill the blank fields...");
    } else {
      //firstly get access token

      axios.post("http://localhost:3005/login", {
        username: username,
        password: password
      })
        .then(res => {

          if (res.data.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
            setIsLogged(true);
          } else {
            alert(res.data.message);
          }

        })
        .catch(err => {
          console.error(err);
        });


    }

  };

  const authorization = () => {
    axios.get("http://localhost:3005/getProducts",
    {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const valueHandler = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  const saveAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
  };


  return (
    <>
      <h1>React and Express JWT Example...</h1>
      <form onSubmit={submit}>
        <p>Login</p>
        <hr></hr>
        <label title="You can see the username from the back-end side...">Username</label>
        <input type="text" id="username" name="username" value={username} onChange={valueHandler} />

        <label title="You can see the password from the back-end side...">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={valueHandler} />
        <button type="submit">{(!isFetcing) ? "Login" : "Fetching..."}</button>
        {
          (isLogged) ? (
            <button type="button" onClick={authorization}>Authorization</button>
          ) : null
        }
      </form>

    </>
  );
}

export default App;
