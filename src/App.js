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
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'


import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ProductFormInputs from "./components/ProductFormInputs";
import LoadingComponent from "./components/LoadingComponent"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductFromApi, loadProductFromStorage } from './services/index'
import {fetchInitialProduct,addProduct } from './store/reducers/productReducer'
import * as schema from './store/schema/productSchema'
import { normalize } from "normalizr";

function App() {

  // react states variables
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setPopperOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  
  // redux variables
  const dispatch = useDispatch()
  const productsInformation = useSelector(store => store.productsInfo);
  const products = productsInformation?.entities?.products
  const productPrices = productsInformation?.entities?.prices

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
    if (productTitle === "" || productPrice === ""){
      setShowErrorAlert(true)
      return
    }
    const newPrice = {
      "id": Object.keys(productPrices).length + 1,
      "price": productPrice,
      "date": moment().format()
  }
  const productData = {
      id:Object.keys(products).length + 1,
      name: productTitle,
      price: newPrice
  }
  // dispatch edit product
  dispatch(addProduct(productData))
  handleClosePopper()
  };
// close popper
  const handleClosePopper = () => {
    setPopperOpen(false);
  };

  // 
  const handleCloseAlert = () => {
    setShowErrorAlert(false)
  }

  // fetch data from API
  const fetchProductsFromServer = () => {
    // fetch persisted data from local store
    const persistedData = loadProductFromStorage()
    if(persistedData === undefined){
      // fetch from api if localstore is undefined
     fetchProductFromApi().then((response) => {
      // normalize the response and dispatch to store
      dispatch(fetchInitialProduct(normalize(response.data.products, schema.arrayOfProducts)))
      setIsLoading(false)
     })
    } else{
      dispatch(fetchInitialProduct(persistedData.productsInfo))
      setIsLoading(false)
    }
    }

// get product list from object
const productList = [];
for (const id in products) {
    console.log(id)
      const productItem = products[id];
      productList.push(
        productItem
      );
}


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

  useEffect (() => {
    fetchProductsFromServer()
  }, [])
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
           <>
             {
               isLoading ? <LoadingComponent/> : productList?.map((singleProduct) => (
                <Grid item key={singleProduct.id}>
    <SingleProduct data={singleProduct}/>
    </Grid>
               )
               )
             }
           </>
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
      <Snackbar open={showErrorAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          You cannot submit an empty form.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
