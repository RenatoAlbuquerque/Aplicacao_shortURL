import React, { useContext, useEffect } from "react";
import { FormUser, ResponsiveAppBar as Navbar } from "../../Components";
import { ProductsContext } from "../../providers/products";
import api from "../../services/api";

const UserUrl = () => {
  const { user, loadUrlsInitial, urls } = useContext(ProductsContext);

  useEffect(() => {
    loadUrlsInitial();
  }, []);

  const deleteShortURL = async (url) => {
    try {
      await api.delete(`/pessoas/${user.user.id}/urls/${url.id}`);
      loadUrlsInitial();
    } catch (error) {
      console.log(error);
    }
  };

  const incrementClick = async (url) => {
    try {
      await api.get(`/urls/clicks/${url.id}`);
      loadUrlsInitial();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <FormUser />
        <div class="flex justify-center mt-16">
          <p class="text-2xl">Suas URL's Cadastradas</p>
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
                        Titulo Encurtado
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Clicks
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Excluir
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {urls.map((url) => (
                      <tr key={url.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.user.nome}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {url.title}
                          </div>
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
                          {url.click === null ? 0 : url.click}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => deleteShortURL(url)}
                            type="button"
                            class="py-1 px-4 w-1 flex justify-center  bg-[#e11d48]  focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserUrl;
