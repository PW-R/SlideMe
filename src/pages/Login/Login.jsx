import { useRef } from "react";
import Form from "react-bootstrap/Form";
import "./Login.css";

function Login({ setToken, setRole }) {
  const userRef = useRef();
  const passRef = useRef();

  // Define the verifyUser function
  const verifyUser = (username, password) => {
    const users = [
      { username: "admin", password: "admin123", token: "adminToken", role: "admin" },
      { username: "user", password: "user123", token: "userToken", role: "user" }
    ];

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    return user ? user : null;
  };

  return (
    <div className="login-container">
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control
        type="text"
        id="username"
        placeholder="Enter Username"
        style={{ textAlign: "center" }}
        ref={userRef}
      />
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        type="password"
        id="password"
        placeholder="Enter Password"
        style={{ textAlign: "center" }}
        ref={passRef}
      />
      <button
        className="btn btn-success mt-3"
        onClick={() => {
          const username = userRef.current.value.trim();
          const password = passRef.current.value.trim();
          userRef.current.value = ""; // Clear input fields
          passRef.current.value = "";

          const userInfo = verifyUser(username, password); // Call the verifyUser function
          if (userInfo === null) {
            alert("Wrong username or password");
            userRef.current.focus();
          } else {
            setToken(userInfo.token);
            setRole(userInfo.role);
          }
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
