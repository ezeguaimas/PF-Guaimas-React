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
      console.log(respuesta)
    });
  }, [productid]);

  function onAddToCart(count) {
    addItem(product, count);
  }

  const countInCart = getCountInCart(product.id);
  console.log(countInCart);

  return (
    <Flex>
      <Card sx={{ maxMinWidth: 400, minWidth: 400 }} style={{ margin: "5", padding: "3" }}>
        <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "center", textTransform: "uppercase" }}>
          {product.tipo}
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={product.img} alt={product.title} style={{ maxWidth: "180px", maxHeight: "180px" }} />
        </div>

        <Typography gutterBottom variant="h6" component="div" style={{ textAlign: "center", textTransform: "uppercase" }}>
          {product.title}
          <br />
          {product.subcategory}
          <br />
          {product.contenido}Ml
        </Typography>
        <Typography variant="h6" color="text.secondary" style={{ textAlign: "center" }}>
          ${product.precio}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to={`/product/${product.id - 1}`}>
            <Button
            // disabled={ProductosJSON.findIndex((item) => item.id === product.id) === 0}
            >
              Anterior
            </Button>
          </Link>

          <Link to={`/product/${product.id + 1}`}>
            <Button
            // disabled={docsData.findIndex((item) => item.id === product.id) === docsData.length - 1}
            >
              Siguiente
            </Button>
          </Link>
        </div>
        <ItemCount stock={product.stock - countInCart} onAddToCart={onAddToCart} />
      </Card>
    </Flex>

    // //--------------------------------------------------------------------------------------
    // /* <ItemDetail> */
    // <div className="card-detail_main">
    //   <div className="card-detail_img">
    //     <img src={product.img} alt={product.marca} />
    //   </div>
    //   <div className="card-detail_detail">
    //     <h1>{product.marca}</h1>
    //     <h2 className="priceTag">$ {product.precio}</h2>
    //     <small>{product.tipo}</small>
    //   </div>

    //   {/* Rendering condicional */}
    //   {/* si addedToCart === true? <ItemCount> : <>ir al carrito<> */}
    //   <ItemCount
    //     stock={product.stock - countInCart}
    //     onAddToCart={onAddToCart}
    //   />

    //   <Link to={`/detalle/${product.id - 1}`}>
    //     <Button>Anterior</Button>
    //   </Link>
    //   <Link to={`/detalle/${product.id + 1}`}>
    //     <Button>Siguiente</Button>
    //   </Link>
    // </div>
    // //--------------------------------------------------------------------------------------
  );
}

export default ItemDetailContainer;