import React from "react";
import FormControl from "../../components/FormControl";
import * as MyForm from "../../lib/MyForm";

const rules = {
  deliveryAddress: [(value) => (!value ? "주소지를 입력해주세요." : "")],
  deliveryContact: [
    (value) => (!value ? "전화번호를 입력해주세요." : ""),
    (value) => {
      const regExp = new RegExp(/^\d{2,3}-\d{3,4}-\d{4}$/u);

      if (!regExp.test(value)) {
        return "전화번호 형식으로 입력해주세요. (예: 010-1234-5678)";
      } else {
        return "";
      }
    },
  ],
};

const OrderForm = ({ onSubmit }) => {
  return (
    <MyForm.Form
      className="OrderForm"
      id="order-form"
      initialValues={{
        deliveryAddress: "",
        deliveryContact: "",
        paymentMethod: "마이페이",
        messageToShop: "",
        messageToRider: "",
      }}
      rules={rules}
      onSubmit={onSubmit}
    >
      <FormControl
        label="주소"
        htmlFor="deliveryAddress"
        required
        error={<MyForm.ErrorMessage name="deliveryAddress" />}
      >
        <MyForm.Field
          type="text"
          name="deliveryAddress"
          id="deliveryAddress"
          placeholder="배달 받을 주소를 입력하세요."
          autoFocus
        />
      </FormControl>
      <FormControl
        label="연락처"
        htmlFor="deliveryContact"
        required
        error={<MyForm.ErrorMessage name="deliveryContact" />}
      >
        <MyForm.Field
          type="text"
          name="deliveryContact"
          id="deliveryContact"
          placeholder="연락처를 입력하세요."
        />
      </FormControl>
      <FormControl label="결재수단" htmlFor="paymentMethod" required>
        <MyForm.Field as="select" type="select" name="paymentMethod">
          <option value="마이페이">마이페이</option>
          <option value="만나서 결제">만나서 결제</option>
        </MyForm.Field>
      </FormControl>
      <FormControl label="가게 사장님께" htmlFor="messageToShop">
        <MyForm.Field
          as="textarea"
          type="textarea"
          name="messageToShop"
          id="messageToShop"
        />
      </FormControl>
      <FormControl label="라이더님께" htmlFor="messageToRider">
        <MyForm.Field
          as="textarea"
          type="textarea"
          name="messageToRider"
          id="messageToRider"
        />
      </FormControl>
    </MyForm.Form>
  );
};

export default OrderForm;
