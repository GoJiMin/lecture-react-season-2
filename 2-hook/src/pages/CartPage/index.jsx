import React from "react";
import Title from "../../components/Title";
import PaymentButton from "../CartPage/PaymentButton";
import ProductItem from "../../components/ProductItem";
import ProductApi from "shared/api/ProductApi";
import OrderApi from "shared/api/OrderApi";
import Page from "../../components/Page";
import OrderForm from "./OrderForm";

const CartPage = () => {
  const [product, setProduct] = React.useState(null);

  const fetch = async (productId) => {
    try {
      const product = await ProductApi.fetchProduct(productId);
      setProduct(product);
    } catch (e) {
      //   openDialog(<ErrorDialog />);
      return;
    }
  };

  const handleSubmit = async (values) => {
    try {
      await OrderApi.createOrder(values);
    } catch (e) {
      // openDialog(<ErrorDialog />)
      return;
    }
  };

  React.useEffect(() => {
    fetch("CACDA421");
  }, []);

  return (
    <div className="CartPage">
      <Page
        header={<Title backUrl="/">장바구니</Title>}
        footer={<PaymentButton />}
      >
        {product && <ProductItem product={product} />}
        <OrderForm onSubmit={handleSubmit} />
      </Page>
    </div>
  );
};

export default CartPage;
