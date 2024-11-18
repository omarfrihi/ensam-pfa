import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";
import { FadeLoader } from "react-spinners";
const LoginPage = () => {
  const { mutate, isPending, error } = useLogin();
  const { login } = useAuth();

  const handleLogin = async (e: any) => {
    console.log(e.currentTarget.elements.username.value);
    mutate(
      {
        username: e.currentTarget.elements.username.value,
        password: e.currentTarget.elements.password.value,
      },
      {
        onSuccess: ({ data }) => {
          login(data.token);
        },
      }
    );
    e.preventDefault();
  };
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="main">
      <div className="login">
        <img
          src="https://fnh.ma/uploads/actualites/5e1334d6c660f.png"
          width={300}
        ></img>
        <h1>Banque Populaire</h1>
        <h3>Enter your login credentials</h3>

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your Username"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            required
          />
          <span className="error">
            {
              //@ts-ignore
              error?.response?.data?.message
            }
          </span>
          <div className="wrap">
            {isPending ? (
              <FadeLoader color="#ed8615" />
            ) : (
              <button type="submit">Login</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
