import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorize = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component={"h1"} gutterBottom>
        404 - Page Not Found
        <Button variant="contained" component={Link} to="/overview">
          {" "}
          Go to Homepage
        </Button>
      </Typography>
    </Container>
  );
};

export default Unauthorize;
