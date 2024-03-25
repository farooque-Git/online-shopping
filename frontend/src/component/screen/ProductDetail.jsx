import { Grid, Typography, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = ({ match }) => {
  const { id } = useParams();
  // const product = Product.find((prod) => String(prod._id) === id);
  //  above code is fetching from local storage

  // fetch data from backend

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      // same issue with Axios 404 like products sso use try catch
      //   const { data } = await axios.get(`/Products/${match.params.id}`);
      //   setProduct(data);
      // };
      try {
        const { data } = await axios.get(`/Products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [match]);

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        marginTop: "30px",
        marginLeft: "55px",
        padding: "25px",
        color: "black",
      }}
    >
      <Grid item md={6}>
        <Box sx={{ border: 1 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: "auto",
              height: "auto",
            }}
          />
        </Box>
      </Grid>

      <Grid item md={3}>
        <Box component="div" sx={{ padding: "15px" }}>
          <Typography variant="h5">{product.name}</Typography>
          <br />
          <Typography variant="h5">{product.price}</Typography>
          <br />
          <Typography variant="body1">{product.description}</Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Button variant="contained" color="success">
          Add to Cart
        </Button>
        <br />
        <Typography
          component="div"
          sx={{ color: product.countInStock > 0 ? "blue" : "red" }}
        >
          Status: {product.countInStock > 0 ? "In stock" : "Out of Stock"}{" "}
        </Typography>
        <h5>Stock Left:{product.countInStock} pcs</h5>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
