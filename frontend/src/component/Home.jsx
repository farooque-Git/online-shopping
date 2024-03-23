import Footer from "./Footer";
import Header from "./Header";
import ProductScreen from "./screen/ProductScreen";
import { Grid } from "@mui/material";
import Products from "../Product";

const Home = () => {
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
