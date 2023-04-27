import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StyledBadge from "@mui/material/Badge";
import { useContext } from "react";

import { cartContext } from "../context/cartContext";

function CartWidget() {
  const { cart } = useContext(cartContext);

  const totalCount = cart.reduce((total, item) => total + item.count, 0);

  return (
    <IconButton aria-label="cart">
      <StyledBadge
        badgeContent={totalCount}
        color="primary"
        fontSize="2rem"
        width="40px"
        height="40px"
      >
        <ShoppingCartIcon style={{ fontSize: "8vh", color: "darkred" }} />
      </StyledBadge>
    </IconButton>
  );
}

export default CartWidget;
