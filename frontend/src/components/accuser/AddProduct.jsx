import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { PickerOverlay } from "filestack-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ setOpenAdd }) => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageProduct, setImageProduct] = useState([null]);
  const [uploadingImageProduct, setUploadingImageProduct] = useState(false);
  const [previewImageProduct, setPreviewImageProduct] = useState(false);

  const handlerAddProduct = async (e) => {
    e.preventDefault();

    if (!imageProduct) {
      return alert("Please select Product Image");
    }

    setUploadingImageProduct(true);
      const { data } = await axios.post("/api/products/add", {
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
    alert("You have successfully added Product!");
    console.log(data);
    setUploadingImageProduct(false);
      navigate("/account");
      setOpenAdd(false);
  };

  return (
    <div className="passwords">
      <form onSubmit={handlerAddProduct}>
      <button hidden id="image_upload_product" accept="image/png, image/jpeg" />
        <div className="close-form" onClick={() => setOpenAdd(false)}>
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
          <img
            src={
              previewImageProduct ||
              "https://res.cloudinary.com/fomqowfc/image/upload/v1655630421/universa_ocbphf.png"
            }
            alt=""
          />
          <label htmlFor="image_upload_product">
            <FontAwesomeIcon icon={faPlusCircle} />
          </label>
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
            <FontAwesomeIcon icon={faPlusCircle} />
            {uploadingImageProduct ? "Saving..." : "  Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
