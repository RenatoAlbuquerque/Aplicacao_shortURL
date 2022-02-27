import React, { useState, useContext } from "react";
import { ProductsContext } from "../../providers/products";
import api from "../../services/api";

const FormUser = () => {
  const { user, loadUrlsInitial, msgAlertAdd } = useContext(ProductsContext);
  const [title, setTitle] = useState();
  const user_id = user.user.id;
  const envio = { title, user_id };

  const createShortUrl = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/pessoas/urls`, envio);
      msgAlertAdd();
    } catch (error) {
      console.log(error);
    }
    loadUrlsInitial();
  };

  return (
    <>
      <div className="mt-44">
        <form onSubmit={createShortUrl}>
          <div className="flex justify-center gap-1">
            <div className=" relative ">
              <input
                id="shortUrl"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-96 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Escreva a URL a ser encurtada"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-100 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Encurtar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormUser;
