import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Button, CardActionArea, CardActions, Divider } from "@mui/material";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import moment from "moment";
import ProductFormInputs from "../components/ProductFormInputs";
const SingleProductCard = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [placement, setPlacement] = useState();
  const [selectedProductId, setSelectedProductInState] = useState(null);
  const [showDeleteBool, updateShowDeleteBool] = useState(false);
  let [selectedProductata, setSelectedProductataInState] = useState({});
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(null);

  const handleProductTitleChange = (event) => {
    setProductTitle(event.target.value);
  };
  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const showPopperHandler = (newPlacement, selectedData, type) => (event) => {
    if (type === "delete") {
      updateShowDeleteBool(true);
    } else {
      const latestPrice = 10.99
      updateShowDeleteBool(false);
      setProductTitle(selectedData.name);
      setProductPrice(latestPrice);
    }
    setAnchorEl(event.currentTarget);
    setOpenPopper(true);
    setPlacement(newPlacement);
    setSelectedProductInState(selectedData.id);
    setSelectedProductataInState(selectedData);
  };

  // method to delete product
  const handleDeleteProduct = () => {
    console.log('deleted')
  };
  // method to edit product
  const handleEditProduct = () => {
    console.log('editted')
  };
  const handleClosePopper = () => {
    setOpenPopper(false);
  };

  const getLatestPrice = (prices) => {
    console.log('price..')
  };

  // product form View
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
            startIcon={<CheckCircleOutlineIcon />}
            onClick={handleEditProduct}
          >
            Save
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
  // delete dialog View
  const deleteDialogView = () => (
    <div>
      <Card
        sx={{ maxWidth: 345 }}
        variant="outlined"
        className="delete-confirmation-dialog"
      >
        <CardContent>
          <Typography className="delete-dialog-text">
            Are you sure you want to delete this product?
          </Typography>
        </CardContent>
        <CardActions className="delete-product-dialog-actions">
          <Button
            variant="text"
            color="success"
            startIcon={<CheckCircleOutlineIcon />}
            onClick={handleDeleteProduct}
          >
            Yes
          </Button>
          <Button
            variant="text"
            color="warning"
            startIcon={<CancelIcon />}
            onClick={handleClosePopper}
          >
            No
          </Button>
        </CardActions>
      </Card>
    </div>
  );

  return (
    <div>
      <Card
        sx={{ maxWidth: 345 }}
        variant="outlined"
        className="single-product-card"
      >
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="single-product-card-name"
            >
              {data.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="single-product-card-price"
            >
              ${getLatestPrice(data.prices)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions>
          <Button
            variant="text"
            color="warning"
            startIcon={<DeleteIcon />}
            onClick={showPopperHandler("bottom", data, "delete")}
          >
            Delete
          </Button>
          <Button
            variant="text"
            startIcon={<EditIcon />}
            onClick={showPopperHandler("bottom", data, "edit")}
          >
            Edit
          </Button>
        </CardActions>
      </Card>

      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              {showDeleteBool ? deleteDialogView() : productFormView()}
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default SingleProductCard;
