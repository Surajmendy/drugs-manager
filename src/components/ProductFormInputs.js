import React from "react";
import { TextField } from "@mui/material";

const productFormInputs = ({
  productTitle,
  productPrice,
  handleProductTitleChange,
  handleProductPriceChange,
}) => {
  return (
    <div>
      <TextField
      variant="filled"
      required
      color="success"
        label="Product Title"
        type="text"
        name="productTitle"
        className="mph-textfield"
        id="productTitle"
        defaultValue={productTitle || ""}
        onChange={handleProductTitleChange}
      />
      <TextField
      color="success"
      variant="filled"
        type='number'
        required
        className="mph-textfield"
        label="Product Price"
        id="productPrice"
        defaultValue={productPrice || ""}
        onChange={handleProductPriceChange}
      />
    </div>
  );
};

export default productFormInputs;
