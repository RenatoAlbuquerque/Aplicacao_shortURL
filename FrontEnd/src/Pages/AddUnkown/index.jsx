import React, { useContext } from "react";
import {
  ResponsiveAppBar as Navbar,
  ModalLogin,
  ModalRegister,
  FormUnkown,
} from "../../Components";
import { ProductsContext } from "../../providers/products";

const AddUnkown = () => {
  const { isLogin, isRegister } = useContext(ProductsContext);

  return (
    <>
      <Navbar />
      {isLogin === true ? <ModalLogin /> : null}
      {isRegister === true ? <ModalRegister /> : null}
      <FormUnkown />
    </>
  );
};
export default AddUnkown;
