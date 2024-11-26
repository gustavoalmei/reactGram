import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../Components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../slices/authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>Reactgram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          value={email || ""}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password || ""}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {success && <Message msg="Logado com sucesso" type="success" />}
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};
