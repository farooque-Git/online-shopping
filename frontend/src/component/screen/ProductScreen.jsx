import { Card, CardContent, Grid, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const ProductScreen = ({ product }) => {
  return (
    <Grid>
      <Card
        sx={{
          marginTop: 3,
          marginLeft: 3,
          marginBottom: 3,
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 10)",
          padding: "15px",
          color: "black",
          height: "400px",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Link to={`/product/${product._id}`}>
          <CardMedia
            component="img"
            height="200px"
            width="auto"
            image={product.image}
            alt={product.name}
          ></CardMedia>
        </Link>
        <CardContent variant="body2">
          <Link to={`/product/${product._id}`}>
            <Typography variant="h6" component="div">
              {product.name}
            </Typography>
          </Link>
          <Typography
            component="div"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {product.price}
          </Typography>
          <Typography
            component="div"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {product.rating} / {product.numReviews} reviews
          </Typography>
          {/* <Typography component="div" variant="paragraph">
            {product.description}
          </Typography> */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductScreen;
