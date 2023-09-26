import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAll, getTotals } from "../redux/cartSlice";
import styled from "styled-components"; 

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(removeAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <h4>Thank you for shopping with us</h4>
      <p>Your order might take some time to process.</p>
      <p>We will send an e-mail confirmation, once we process your order.</p>
      <p>
        In case of any inquiries, contact support at{" "}
        <strong>support@myfavshop.com</strong>
      </p>
      
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 100vh;
  max-width: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: hsl(33, 100%, 75%);
  background-image: url('/assets/party-popper-joypixels.gif');
  background-size: 15rem; 
  background-repeat: no-repeat;
  background-position: center;

  h2 {
    margin-top:40px;
    margin-bottom: 2rem;
    color: #663300;
  }
  h4 {
    margin-top: 30px;
    margin-bottom: 14rem;
    color: #cc3333;
  }
`;