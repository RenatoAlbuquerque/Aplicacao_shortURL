import React, { useContext, useState, useEffect } from "react";
import {
  ResponsiveAppBar as Navbar,
  ModalLogin,
  ModalRegister,
} from "../../Components";
import { ProductsContext } from "../../providers/products";
import api from "../../services/api";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const TopUrl = () => {
  const {
    isLogin,
    isRegister,
    adicionarFavorito,
    removerFavorito,
    urlRanking,
    setUrlRanking,
  } = useContext(ProductsContext);

  const loadUrlsRanking = async () => {
    try {
      const data = await api.get(`/urls`);
      setUrlRanking(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFav = async (url) => {
    adicionarFavorito(url);
  };
  const remFav = async (url) => {
    removerFavorito(url);
  };

  const incrementClick = async (url) => {
    try {
      await api.get(`/urls/clicks/${url.id}`);
      loadUrlsRanking();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUrlsRanking();
  }, []);

  return (
    <>
      <Navbar />
      {isLogin === true ? <ModalLogin /> : null}
      {isRegister === true ? <ModalRegister /> : null}
      <div className="flex justify-center mt-16">
        <p className="text-2xl">Bem-Vindo ao TOP 100 URL's</p>
      </div>
      <div className="flex flex-col mt-16">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Autor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Titulo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      URL Encurtada
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Favorito
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {urlRanking.map((url) => (
                    <tr key={url.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {url.User ? url.User.nome : "Desconhecido"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{url.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="text-sm text-gray-900"
                          onClick={() => incrementClick(url)}
                        >
                          <a
                            id="linkShortURL"
                            rel="external"
                            target="_blank"
                            className="text-sm text-[#4f46e5] font-bold hover:underline"
                            href={url.title}
                          >
                            {url.urlShort}
                          </a>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button>
                          <div>
                            {url.favs === true ? (
                              <AiFillStar onClick={() => remFav(url)} />
                            ) : (
                              <AiOutlineStar onClick={() => addFav(url)} />
                            )}
                          </div>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {url.click}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUrl;
