import React, { memo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const title = product?.title.slice(0, 20);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Styles for the card image
  const cardImgStyle = {
    cursor: "pointer",
    maxHeight: "150px",
    maxWidth: "150px",
    margin: "0 auto",
    padding: "10px 0",
    transition: "transform 0.3s", 
    transform: isHovered ? "scale(1.05)" : "scale(1)", 
  };

  // Styles for the product card
  const productCardStyle = {
    position: "relative",
    minHeight: "300px",
    transition: "transform 0.3s, box-shadow 0.3s", 
    boxShadow: isHovered ? "3px 3px 10px #d3d3d3" : "1px 1px 10px #d3d3d3", 
    border: "none",
  };

  // Styles for the common button
  const commonBtnStyle = {
    backgroundColor: "#ffa42c",
    border: "none",
    color: "black",
    position: "absolute",
    bottom: "20px",
    right: "85px",
    transition: "transform 0.3s",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };

  // Add product to cart handler
  const addProduct = () => {
    dispatch(addToCart(product));
    toast.success(`${product?.title.slice(0, 20)} is added to cart`, {
      autoClose: 1000,
    });
  };

  return (
    <div>
      <Card
        style={{ width: "18rem", textAlign: "center", ...productCardStyle }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card.Img
          onClick={() => navigate(`/products/${product.id}`)}
          variant="top"
          src={product?.image}
          style={{ ...cardImgStyle }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>${product?.price}</Card.Text>
          <Button style={{ ...commonBtnStyle }} onClick={addProduct}>
            ADD TO CART
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default memo(ProductCard);

