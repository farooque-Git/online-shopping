import Footer from "./Footer";
import ProductScreen from "./screen/ProductScreen";
import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    // AXIOS 404 error so use try catch to hit the endpoint
    // const fetchProducts = async () => {
    //   //calling asonymous function as data for response
    //   const { data } = await axios.get(`/Product`);
    //   setProducts(data);
    // };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products"); // Corrected endpoint
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      {/* <Header /> */}
      <>
        <Grid container spacing={2}>
          {Products.map((product) => (
            <Grid item xs={12} sm={6} md={8} lg={3} key={product._id}>
              <ProductScreen product={product} />
            </Grid>
          ))}
        </Grid>
      </>
      <Footer />
    </div>
  );
};

export default Home;
