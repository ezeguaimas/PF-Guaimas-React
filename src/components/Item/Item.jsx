import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import "./item.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import Flex from "../Flex/Flex";

export default function Item(props) {
  const styleImg = {
    maxWidth: "250px",
    maxHeight: "250px",
    filter: props.stock === 0 ? "grayscale(0.9)" : "",
  };

  return (
    <Flex>
      <Card
        sx={{ maxMinWidth: 345, minWidth: 345 }}
        style={{ margin: "5", padding: "3" }}
      >
        <CardActionArea>
          <Typography
            className="item-card_header"
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            {props.category}
          </Typography>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={props.img} alt={props.title} style={styleImg} />
          </div>

          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ textAlign: "center" }}
            >
              {props.title}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              style={{ textAlign: "center" }}
            >
              ${props.precio}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ display: "flex", justifyContent: "center" }}>
          <Link to={`/product/${props.id}`}>
            <Button>Ver detalle</Button>
          </Link>
        </CardActions>
      </Card>
    </Flex>
  );
}
