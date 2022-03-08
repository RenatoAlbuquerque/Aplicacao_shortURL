import React, { createContext, useState, useEffect } from "react";
import withReactContent from "sweetalert2-react-content";
import useStorage from "./utils/useStorage";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

export const ProductsContext = createContext({});

const ProductsProvider = (props) => {
  const [token, setToken] = useStorage("token");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [urls, setUrls] = useState([]);
  const [urlRanking, setUrlRanking] = useState([]);

  //Login - Logout - Criar Sessão
  const login = async (email, password) => {
    try {
      const response = await createSession(email, password);

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);

      api.defaults.headers.Authorization = `${response.data.token}`;
      setUser(response.data);
      setIsLogin(false);
      loginSucess();

      navigate("/userurl");
    } catch (error) {
      loginFail(error.response.data);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      api.defaults.headers.Authorization = `${token}`;
    }
  }, []);

  const createSession = async (email, password) => {
    return api.post("/users/auth", { email, password });
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    api.defaults.headers.Authorization = null;
    setIsLogin(false);
    setUser(null);
    navigate("/");
  };

  //ALERTAS
  const MySwal = withReactContent(Swal);

  //Alerta de Sucesso - Login
  const loginSucess = () => {
    Swal.fire({
      icon: "success",
      title: "Login feito com sucesso",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  //Alerta de falha - Login
  const loginFail = (msg) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${msg}`,
    });
  };

  //Alerta de Sucesso - Cadastro
  const registerSucess = () => {
    Swal.fire({
      icon: "success",
      title: "Cadastro feito com sucesso",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  //Alerta de Falha - Cadastro
  const registerFail = (mensagem) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${mensagem}`,
    });
  };

  //Alerta de sucesso na mensagem
  const msgAlertAdd = () => {
    Swal.fire({
      icon: "success",
      title: "Mensagem adicionada com sucesso",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //Recarregamento de URLS Cadastradas pelo usuário
  const loadUrlsInitial = async () => {
    try {
      const data = await api.get(`/pessoas/${user.user.id}/urls`);

      setUrls(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUrlsRanking = async () => {
    try {
      const data = await api.get(`/urls`);
      setUrlRanking(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const adicionarFavorito = async (url) => {
    try {
      await api.get(`/urls/addfav/${url.id}`);
      loadUrlsRanking();
    } catch (error) {
      console.log(error);
    }
  };
  const removerFavorito = async (url) => {
    try {
      await api.get(`/urls/removefav/${url.id}`);
      loadUrlsRanking();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductsContext.Provider
      value={{
        //Modais de Registro  e Login
        isLogin,
        setIsLogin,
        isRegister,
        setIsRegister,

        //Login
        token,
        setToken,
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
        createSession,

        //favoritos
        adicionarFavorito,
        removerFavorito,

        //top 100 urls
        urlRanking,
        setUrlRanking,
        //alertas
        msgAlertAdd,
        registerFail,
        registerSucess,

        //Recarregar URLS
        urls,
        loadUrlsInitial,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
