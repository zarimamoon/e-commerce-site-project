import React, { useState, useEffect } from "react";
import { Container, Button, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../api/status";
import { fetchProducts } from "../redux/productSlice";
import { setSearchProduct, setCategory } from "../redux/productFilterSlice";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { BiSearch } from "react-icons/bi";
import '../App.scss';

const Products = () => {
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();

  const { products, status } = useSelector((state) => state.products);
  const { searchedProduct, category } = useSelector(
    (state) => state.productFilter
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // Define the categories array
  const categories = [
    {
      value: "all",
      name: "All",
    },
    {
      value: "jewelery",
      name: "Jewelry",
    },
    {
      value: "electronics",
      name: "Electronics",
    },
    {
      value: "men's clothing",
      name: "Men's Clothing",
    },
    {
      value: "women's clothing",
      name: "Women's Clothing",
    },
  ];

  let productsData;

  if (searchedProduct) {
    productsData = products?.filter((item) =>
      item.title.toLowerCase().includes(searchedProduct.toLowerCase())
    );
  } else if (category.length > 0) {
    if (category.toLowerCase() === "all") {
      productsData = products;
    } else {
      productsData = products?.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }
  } else {
    productsData = products;
  }

  if (status === STATUS.LOADING) {
    return <Loader />;
  }

  if (status !== STATUS.LOADING && status === STATUS.ERROR) {
    return <h2>{status}</h2>;
  }

  return (
    <div id="product-list">
      <Container>
        <Row className="mb-3">
          <Col md={12} className="text-center">
            <h3>Shop by Collection</h3>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={10} xs={10} className="text-center">
            {showSearch && (
              <InputGroup>
                <FormControl
                  type="text"
                  value={searchedProduct}
                  onChange={(e) => dispatch(setSearchProduct(e.target.value))}
                  placeholder="Search Product"
                />
                <Button
                  variant="dark"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <BiSearch size={25} />
                </Button>
              </InputGroup>
            )}
          </Col>
          <Col md={10} xs={12} className="text-center mt-1 mt-md-5">
            <div className="justify-content-center justify-content-md-between">
              {categories.map((option) => (
                <Button
                key={option.value}
                  variant="outline-dark"
                  className="me-2 mb-2"
                  onClick={() => dispatch(setCategory(option.value))}
                >
                  {option.name}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          {productsData?.map((product) => (
            <Col key={product?.id} md={4} sm={12} xs={14} className="mb-4">
              <div className="product-card-container">
                <ProductCard product={product} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Products;