import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import "./itemdetail.css";
import Button from "../Button/Button";
import { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import { getSingleItem } from "../../services/firestore";
import Flex from "../Flex/Flex";
import { Card, Typography } from "@mui/material";

function ItemDetailContainer() {
  const [product, setProduct] = useState([]);
  let { productid } = useParams();

  const { addItem, getCountInCart } = useContext(cartContext);

  useEffect(() => {
    getSingleItem(productid).then((respuesta) => {
      setProduct(respuesta);
      console.log(respuesta);
    });
  }, [productid]);

  function onAddToCart(count) {
    addItem(product, count);
  }

  const countInCart = getCountInCart(product.id);
  console.log(countInCart);

  return (
    <Flex>
      <Card
        sx={{ maxMinWidth: 400, minWidth: 400 }}
        style={{ margin: "5", padding: "3" }}
      >
        <Typography
          className="item-card_header"
          gutterBottom
          variant="h5"
          component="div"
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          {product.category}
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={product.img}
            alt={product.title}
            style={{ maxWidth: "180px", maxHeight: "180px" }}
          />
        </div>

        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          {product.title}
          <br />
          {product.subcategory}
          <br />
          {product.contenido}Ml
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          style={{ textAlign: "center" }}
        >
          ${product.precio}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to={`/product/${product.id - 1}`}>
            <Button>Anterior</Button>
          </Link>

          <Link to={`/product/${product.id + 1}`}>
            <Button>Siguiente</Button>
          </Link>
        </div>
        <ItemCount
          stock={product.stock - countInCart}
          onAddToCart={onAddToCart}
        />
      </Card>
    </Flex>
  );
}

export default ItemDetailContainer;
