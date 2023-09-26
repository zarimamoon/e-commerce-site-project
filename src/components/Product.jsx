import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useParams, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import useFetch from '../api/productsAPI'; 

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch product data using useFetch hook
  const { data, error, loading } = useFetch(`/products/${id}`);

  // Fetch cart data from Redux store
  const cart = useSelector((state) => state.cart.cart);

  // Add product to cart handler
  const productHandler = () => {
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data?.title?.slice(0, 20)} is added to cart`, {
        autoClose: 1000,
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <h3>Error: Product not found.</h3>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={data?.image} alt={data?.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{data.category}</h4>
          <h1 className="display-5">{data.title}</h1>
          <p className="lead fw-bolder">
            Rating {data?.rating && data.rating.rate}{' '}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">$ {data?.price}</h3>
          <p className="lead">{data?.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={productHandler}
          >
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart ({cart && cart.length})
          </NavLink>
        </div>
      </div>
    </div>
  );
}