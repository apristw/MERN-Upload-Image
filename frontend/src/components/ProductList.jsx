import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productID) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productID}`);
      getProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <button
        className="button is-success mb-5"
        onClick={() => navigate("/add")}
      >
        Add New
      </button>
      <div className="columns is-multiline">
        {products.map((product, index) => {
          return (
            <div className="column is-one-quarter" key={index}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={product.url} alt="Placeholder" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{product.name}</p>
                    </div>
                  </div>
                </div>
                <footer className="card-footer">
                  <Link to={`edit/${product.id}`} className="card-footer-item">
                    Edit
                  </Link>
                  <a
                    onClick={() => deleteProduct(product.id)}
                    className="card-footer-item"
                  >
                    Delete
                  </a>
                </footer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
