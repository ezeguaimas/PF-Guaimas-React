import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StyledBadge from "@mui/material/Badge";

function CartWidget() {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="primary" fontSize="20px">
        <ShoppingCartIcon style={{ fontSize: "8vh", color: "darkred" }} />
      </StyledBadge>
    </IconButton>
  );
}

export default CartWidget;
