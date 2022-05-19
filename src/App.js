import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLogged, setIsLogged] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    //if there is accessToken that is saved in the localStorage, then show the list...
    if (localStorage.getItem('accessToken') !== null) {
      setIsLogged(true);
    }
  }, [])


  const submit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Fill the blank fields...");
    } else {
      axios.post("http://localhost:3005/login", {
        username: username,
        password: password
      })
        .then(res => {
          if (res.data.accessToken) {
            setIsLogged(true);
            localStorage.setItem("accessToken", res.data.accessToken);
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
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setIsLogged(true);
          alert("Authorization is successful...");
          setList(res.data.result);

        } else {
          alert("Authorization is unsuccessful...");
          setIsLogged(false);
          setIsAuth(false);
          setList([]);
          localStorage.removeItem('accessToken');
        }
      })
      .catch(err => {
        setIsLogged(false);
        setIsAuth(false);
        setList([]);
        localStorage.removeItem('accessToken');
        console.log(err);
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


  return (
    <>
      <h1>React and Express JWT Example...</h1>
      {
        (!isLogged) ? (
          <form onSubmit={submit}>
            <p>Login</p>
            <hr></hr>
            <label title="You can see the username from the back-end side...">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={valueHandler} />

            <label title="You can see the password from the back-end side...">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={valueHandler} />
            <button type="submit">Login</button>

          </form>
        ) : (
          <button type="button" onClick={authorization}>Authorization</button>
        )
      }

      {
        (list.length > 0) ? (
          <ul>
            {
              list.map(item => {
                return (
                  <li key={item.id}>{item.name}:{item.price}{item.moneyType}</li>
                )
              })
            }
          </ul>

        ) : null
      }


    </>
  );
}

export default App;
