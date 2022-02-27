import React, { useContext, useState } from "react";
import { ProductsContext } from "../../providers/products";
import api from "../../services/api";
import "./style.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Alertas
const MySwal = withReactContent(Swal);

export default function ModalRegister() {
  const { setIsRegister, setIsLogin, registerFail, registerSucess } =
    useContext(ProductsContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const envio = { nome, email, password };

  const closeModalRegister = () => {
    setIsRegister(false);
  };

  const closeRegisterOpenLogin = () => {
    setIsRegister(false);
    setIsLogin(true);
  };

  const cadastroUser = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/users`, envio);
      registerSucess();
      closeRegisterOpenLogin();
    } catch (error) {
      registerFail(error.response.data);
    }
  };
  return (
    <div className="backdrop">
      <div className="mt-10 sm:mt-0">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={cadastroUser}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="max-w flex justify-end bg-white pt-3 pr-3">
                  <button
                    onClick={() => closeModalRegister()}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded-full"
                  >
                    X
                  </button>
                </div>
                <h2 className="bg-white pt-1 text-center text-3xl font-extrabold text-gray-900">
                  Criar Conta
                </h2>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nome
                      </label>
                      <input
                        onChange={(e) => setNome(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="email_register"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email_register"
                        id="email_register"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Senha
                      </label>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="current-password"
                        id="current-password"
                        autoComplete="current-password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="gap-10 px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
                  <button
                    onClick={() => closeRegisterOpenLogin()}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Já tenho uma conta!
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Criar Conta
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
