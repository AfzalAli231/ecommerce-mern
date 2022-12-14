import { faPlusCircle, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { PickerOverlay } from "filestack-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProduct = ({ setOpenEdit, pro }) => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [name, setName] = useState(pro.name);
  const [slug, setSlug] = useState(pro.slug);
  const [category, setCategory] = useState(pro.category);
  const [description, setDescription] = useState(pro.description);
  const [price, setPrice] = useState(pro.price);
  const [imageProduct, setImageProduct] = useState([]);
  const [uploadingImageProduct, setUploadingImageProduct] = useState(false);
  const [previewImageProduct, setPreviewImageProduct] = useState(pro.image);


  const handlerUpdateProduct = async (e) => {
    e.preventDefault();
    //if is not set new images, if exists image
    
    if (!imageProduct) {
      return alert("Please select Product Image");
    }
    
    setUploadingImageProduct(true);
    const { data } = await axios.put("/api/products/update", {
      id: pro._id,
      name,
      slug,
      category,
      description,
      price,
      image: imageProduct.filesUploaded[0].url,
      sellerId: userInfo._id,
      seller: userInfo.name,
      sellerImage: userInfo.image,
    });
        console.log(data);
        alert("You have successfully updated Product!");
        navigate("/account");
        setOpenEdit(false);
        setUploadingImageProduct(false);
    };

  return (
    <div>
      <div className="passwords">
        <form onSubmit={handlerUpdateProduct}>
          <div className="close-form" onClick={() => setOpenEdit(false)}>
            X
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="slug">Slug</label>
            <input
              required
              type="text"
              id="slug"
              onChange={(e) => setSlug(e.target.value)}
              value={slug}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              required
              type="text"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              required
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              required
              type="text"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className="form-group form-image product">
            <img src={previewImageProduct} alt="" />
            <label htmlFor="image_update_product">
              <FontAwesomeIcon icon={faPlusCircle} />
            </label>
            <button
              hidden
              id="image_update_product"
              accept="image/png, image/jpeg"
            />
            {uploadingImageProduct && (
              <PickerOverlay
                apikey={"AelGnTFPhTAeX5eRdK89oz"}
                onSuccess={(res) => {
                  setImageProduct(res);
                  setPreviewImageProduct(res.filesUploaded[0].url);
                }}
                onUploadDone={(res) => {
                  setImageProduct(res);
                  setPreviewImageProduct(res.filesUploaded[0].url);
                }}
              />
            )}
          </div>
          <div className="form-btn">
            <button type="submit">
              <FontAwesomeIcon icon={faRefresh} />
              {uploadingImageProduct ? "Changing..." : "Edit Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
