import Footer from "./Footer";
import ProductScreen from "./screen/ProductScreen";
import { Grid, CircularProgress } from "@mui/material";
// import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // USING REDUX FRO STATE MANEGEMENT FROM ACTION
  // const [Products, setProducts] = useState([]);
  useEffect(() => {
    // AXIOS 404 error so use try catch to hit the endpoint
    // const fetchProducts = async () => {
    //   //calling asonymous function as data for response
    //   const { data } = await axios.get(`/Product`);
    //   setProducts(data);
    // };

    dispatch(listProducts());
  }, [dispatch]);

  // USING REDUX FOR FETCHING PRODUCT FROM ACTION
  // const fetchProducts = async () => {
  //   try {
  //     const { data } = await axios.get("/api/products"); // Corrected endpoint
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  return (
    <div>
      {/* <Header /> */}

      <>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <Grid container spacing={2} sx={{ padding: "15px" }}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={8} lg={3} key={product._id}>
                <ProductScreen product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </>
      <Footer />
    </div>
  );
};

export default Home;
