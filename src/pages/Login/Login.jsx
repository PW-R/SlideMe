import Form from "react-bootstrap/Form";

import "./Login.css";
function Login() {
  return (
    <div className="login-container">
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
    </div>
  );
}
