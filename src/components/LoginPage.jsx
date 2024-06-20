import "./style.css";
import { useState } from "react";

const users = [{ name: "yidi", password: 1111 }];

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (name && password) {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name, pass: password }),
        });

        const result = await response.json();

        if (result.ok === true) {
          console.log(result);

          props.onLogin(name);
        } else {
          setError("forgot your name or password?");
        }
      } catch (error) {
        setError("fail to log in");
      } finally {
        setLoading(false);
      }
    } else if(name) {
      setError("please enter a valid password");
    }
    else{
      setError("please enter a valid username")
    }
  };

  return (
    <div className="login">
      <input
        id="user-name-input"
        type="text"
        placeholder="Please Enter Your user name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={error && !name ? "error-input" : ""}
        required
      />
      <input
        id="user-pass-input"
        type="password"
        placeholder="Please Enter Your password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={error && !password ? "error-input" : ""}
        required
      />

{error && <div className="error-message">{error}</div>}


      <div className="login-btn-container">
        <button id="login-btn" onClick={handleLogin}>
        {loading ? "Logging In..." : "Login"}
        </button>
        <button id="create-account-btn">Create Account</button>
      </div>
    </div>
  );
}
