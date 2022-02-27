import React, { useContext } from "react";
import {
  ResponsiveAppBar as Navbar,
  ModalLogin,
  ModalRegister,
} from "../../Components";
import { ProductsContext } from "../../providers/products";

const Home = () => {
  const { isLogin, isRegister } = useContext(ProductsContext);

  return (
    <>
      <Navbar />
      {isLogin === true ? <ModalLogin /> : null}
      {isRegister === true ? <ModalRegister /> : null}
      <div className="w-full flex justify-center">
        <img
          className="w-3/5 rounded-lg"
          src="https://blog.hotmart.com/blog/2019/08/670x419-BR-encurtador-url.jpg"
        />
      </div>
    </>
  );
};
export default Home;
