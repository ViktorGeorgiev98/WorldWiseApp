import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from '../components/PageNav';
import Button from "../components/Button";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login, isAuthenticated} = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      try {
        login(email, password);
      } catch(err) {
        return alert(err.message);
      }
    } else {
      return alert("Email and password are mandatory, please fill")
    }
  }

  useEffect(function() {
    if (isAuthenticated) {
      navigate('/app');
    }
  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login} onSubmit={handleSubmit}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
