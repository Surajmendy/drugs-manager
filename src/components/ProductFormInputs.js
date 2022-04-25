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
        label="Product Title"
        type="text"
        name="productTitle"
        className="mph-textfield"
        id="productTitle"
        defaultValue={productTitle || ""}
        onChange={handleProductTitleChange}
      />
      <TextField
        className="mph-textfield"
        label="Product Price"
        id="productPrice"
        defaultValue={productPrice || 0}
        onChange={handleProductPriceChange}
      />
    </div>
  );
};

export default productFormInputs;
