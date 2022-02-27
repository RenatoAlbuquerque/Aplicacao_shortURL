/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../providers/products";

const ResponsiveAppBar = () => {
  const { setIsLogin, setIsRegister, user, logout } =
    useContext(ProductsContext);
  const openModalLogin = () => {
    setIsLogin(true);
  };

  const openModalRegister = () => {
    setIsRegister(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <Link
                to={"/"}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                to={"/topurl"}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Top 100 Urls
              </Link>
              {user !== null ? null : (
                <Link
                  id="addUrlUnkown"
                  to={"/urlunk"}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Adicionar URL Anônimamente
                </Link>
              )}
              {user === null ? null : (
                <Link
                  to={"/userurl"}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Minhas URL's
                </Link>
              )}
            </Popover.Group>

            {user !== null ? null : (
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <button
                  onClick={() => openModalRegister()}
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Criar Conta
                </button>
                <button
                  id="btnLogin"
                  onClick={() => openModalLogin()}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Logar
                </button>
              </div>
            )}
            {user === null ? null : (
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                {user ? (
                  <p>
                    Olá <span className="font-bold">{user.user.nome}</span>
                  </p>
                ) : null}
                <button
                  onClick={() => handleLogout()}
                  id="logout"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Atualizações Mobile */}
        {/* <Transition
          as={Fragment}
          enter="durati
          on-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link
                    to={"/"}
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/topurl"}
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Top 100 Urls
                  </Link>
                  <Link
                    to={"/urlunk"}
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Adicionar URL Anônimamente
                  </Link>
                </div>

                <div>
                  <button
                    onClick={() => openModalLogin()}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Logar
                  </button>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Ainda não tem conta?{" "}
                    <button
                      onClick={() => openModalRegister()}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Criar Conta
                    </button>
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => openModalLogin()}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition> */}
      </Popover>
    </Fragment>
  );
};

export default ResponsiveAppBar;
