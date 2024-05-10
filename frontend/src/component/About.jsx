import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ padding: "10px", margin: "20px" }}>
          Online Shopping technology drives path-breaking, customer-focused
          innovation that makes high quality products accessible to Indian
          shoppers, besides making the online shopping experience convenient,
          intuitive and seamless.
        </h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{ marginTop: "20px" }}
        >
          GO BACK!
        </Button>
      </div>
    </>
  );
};

export default About;
