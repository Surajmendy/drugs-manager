import "./App.css";
import Button from "@mui/material/Button";
import SingleProduct from "./components/SingleProductCard";
import { Grid, Container, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CardActions from "@mui/material/CardActions";
import { useState } from "react";
import ProductFormInputs from "./components/ProductFormInputs";
function App() {

  // states
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setPopperOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(null);


  // method handlers
  const handleProductTitleChange = (event) => {
    setProductTitle(event.target.value);
  };
  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const showPopperHandler = (newPlacement) => (event) => {
    setProductTitle("");
    setProductPrice("");
    setAnchorEl(event.currentTarget);
    setPopperOpen(true);
    setPlacement(newPlacement);
  };

  // method to edit product
  const handleAddProduct = () => {
   console.log('added')
  };

  const handleClosePopper = () => {
    setPopperOpen(false);
  };

  // product form view
  const productFormView = () => (
    <div>
      <Card
        sx={{ maxWidth: 345 }}
        variant="outlined"
        className="mph-edit-form-card"
      >
        <CardContent>
          <Typography
            className="mph-edit-form-title"
            variant="h6"
            component="div"
          >
            Edit product
          </Typography>
          <ProductFormInputs
            productTitle={productTitle}
            productPrice={productPrice}
            handleProductTitleChange={handleProductTitleChange}
            handleProductPriceChange={handleProductPriceChange}
          />
        </CardContent>
        <CardActions className="delete-product-dialog-actions">
          <Button
            variant="text"
            color="success"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddProduct}
          >
            Add
          </Button>
          <Button
            variant="text"
            color="warning"
            startIcon={<CancelIcon />}
            onClick={handleClosePopper}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
  return (
    <div className="App">
      <Container fixed>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="page-title"
        >
          Products
          <Tooltip title="add new product" arrow>
            <IconButton
              color="primary"
              aria-label="add product"
              component="span"
              size="large"
              onClick={showPopperHandler("bottom")}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <div>
          <Grid container spacing={2} className="container-grid">
           <p>content</p>
          </Grid>
        </div>
      </Container>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>{productFormView()}</Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default App;
