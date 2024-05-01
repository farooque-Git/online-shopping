import {
  Grid,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import { useNavigate, useParams } from "react-router-dom";

// import axios from "axios";

const ProductDetail = ({ match }) => {
  // const { id } = useParams();
  // const product = Product.find((prod) => String(prod._id) === id);
  //  above code is fetching from local storage

  // fetch data from backend

  // const [product, setProduct] = useState([]);

  // DATA WILL FETCH BY REACT REDUX
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    // const fetchProduct = async () => {
    // same issue with Axios 404 like products sso use try catch
    //   const { data } = await axios.get(`/Products/${match.params.id}`);
    //   setProduct(data);
    // };

    // FETCH DATA BY STATE MANAGEMENT
    //   try {
    //     const { data } = await axios.get(`/api/Products/${id}`);
    //     setProduct(data);
    //   } catch (error) {
    //     console.error("Error fetching product:", error);
    //   }
    // };
    // fetchProduct();

    // FETCH DATA BY REDUX

    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

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
        <Box display="flex" justifyContent="center" sx={{ border: 0 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: "500px",
              height: "auto",
              padding: "25px",
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
        <Button variant="contained" color="success" onClick={addToCartHandler}>
          Add to Cart
        </Button>

        {/* Qty [0,1,2,3,4] */}
        <List>
          {product.countInStock > 0 && (
            <ListItem>
              <ListItemText
                primary={<Typography variant="h6">Qty</Typography>}
              />
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box mr={2}>
                    {" "}
                    {/* Add margin to create space */}
                    <FormControl variant="outlined">
                      <Select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        label="Quantity"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          )}
        </List>

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
