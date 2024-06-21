import "./style.css";
import { useState } from "react";

const users = [{ name: "yidi", password: 1111 }];

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (create, url, body, succesMsg, errMsg) => {
    event.preventDefault();

    if (name && password) {
      if (create) {
        setLoadingCreate(true);
      } else {
        setLoadingLogin(true);
      }
      setError("");

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        console.log(result);
        if (result.ok === true) {
          props.onLogin(name, result.user.id);
        } else if (create) {
          props.onLogin(name, result.id);
        } else {
          setError(succesMsg);
        }
      } catch (error) {
        console.log(error);
        setError(errMsg);
      } finally {
        if (create) {
          setLoadingCreate(false);
        } else {
          setLoadingLogin(false);
        }
      }
    } else if (name) {
      setError("please enter a valid password");
    } else {
      setError("please enter a valid username");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    handleAuth(
      false,
      "http://localhost:3000/login",
      { name: name, pass: password },
      "forgot your name or password?",
      "Failed to log in. Try again later."
    );
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    handleAuth(
      true,
      "http://localhost:3000/users",
      { name: name, pass: password },
      "",
      "Failed to create account. Please try again."
    );
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
          {loadingLogin ? "Logging In..." : "Login"}
        </button>
        <button id="create-account-btn" onClick={handleCreateAccount}>
          {loadingCreate ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}
