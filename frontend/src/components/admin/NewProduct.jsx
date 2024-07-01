import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productsApi";
import { PRODUCT_CATEGORIES, PRODUCT_SUBCATEGORIES, PRODUCT_SUBSUBCATEGORIES } from "../../constants/constants";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productID: "",
    name: "",
    price: "",
    description: "",
    category: {
      name: "",
      subCategory: "",
      subSubCategory: "",
    },
    variants: [{ color: "", size: "", stock: "" }],
    seller: "",
  });

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      navigate("/admin/products");
    }

    if (isSuccess) {
      toast.success("Sản phẩm đã được tạo");
    }
  }, [error, isSuccess]);

  const { productID, name, price, description, category, stock, seller } = product;

  const onChange = (e) => {
    if (e.target.name.startsWith("variants")) {
      const [_, field, variantIndex] = e.target.name.split('.');
      const updatedVariants = [...product.variants];
      updatedVariants[variantIndex][field] = e.target.value;
      setProduct({ ...product, variants: updatedVariants });
    } else if (e.target.name.includes("category")) {
      const categoryField = e.target.name.split('.')[1];
      setProduct({ ...product, category: { ...product.category, [categoryField]: e.target.value } });
    } else {
    setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { color: "", size: "", stock: "" }],
    });
  };

  function removeVariant(index) {
    // Tạo một mảng mới không bao gồm biến thể với chỉ số được cung cấp
    const newVariants = product.variants.filter((_, variantIndex) => variantIndex !== index);
    // Cập nhật trạng thái của sản phẩm với mảng biến thể mới
    setProduct({ ...product, variants: newVariants });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <AdminLayout>
      <MetaData title={"Tạo Sản phẩm mới"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">New Product</h2>
            <div className="row">
              <div className="mb-3 col-3">
                <label htmlFor="productID_field" className="form-label">Product ID</label>
                <input
                  type="text"
                  id="productID_field"
                  className="form-control"
                  name="productID"
                  value={productID}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col-9">
                <label htmlFor="name_field" className="form-label">
                  {" "}
                  Name{" "}
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="row">
              <div className="m b-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Seller Name{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="seller"
                  value={seller}
                  onChange={onChange}
                />
              </div>


              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  {" "}
                  Price{" "}
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  {" "}
                  Category{" "}
                </label>
                <select
                  className="form-select"
                  id="category_field"
                  name="category.name"
                  value={category.name}
                  onChange={onChange}
                >
                  <option value="">Chọn danh mục</option>
                  {PRODUCT_CATEGORIES?.map((categoryName) => (
                    <option key={categoryName} value={categoryName}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* SubCategory Selection */}
              <div className="mb-3 col">
                <label htmlFor="subCategory_field" className="form-label">SubCategory</label>
                <select
                  className="form-select"
                  id="subCategory_field"
                  name="category.subCategory"
                  value={category.subCategory}
                  onChange={onChange}
                  disabled={!category.name}
                >
                  <option value="">Chọn danh mục phụ L2</option>
                  {category.name && PRODUCT_SUBCATEGORIES[category.name].map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>

              {/*  SubSubCategory Selection */}
              <div className="mb-3 col">
                <label htmlFor="subSubCategory_field" className="form-label">SubSubCategory</label>
                <select
                  className="form-select"
                  id="subSubCategory_field"
                  name="category.subSubCategory"
                  value={category.subSubCategory}
                  onChange={onChange}
                  disabled={!category.subCategory}
                >
                  <option value="">Chọn danh mục phụ L3</option>
                  {category.subCategory && PRODUCT_SUBSUBCATEGORIES[category.subCategory].map((subSubCategory) => (
                    <option key={subSubCategory} value={subSubCategory}>
                      {subSubCategory}
                    </option>
                  ))}
                </select>
              </div>

              
            </div>
            
            {/* Variants form fields */}
            {product.variants.map((variant, index) => (
              <div key={index} className="row align-items-end">
                <div className="mb-3 col">
                  <label htmlFor={`color_field_${index}`} className="form-label">Color</label>
                  <select
                    // type="text"
                    id={`color_field_${index}`}
                    className="form-control"
                    name={`variants.color.${index}`}
                    value={variant.color}
                    onChange={(e) => onChange(e, index)}
                    title="Các màu sắc được chấp nhận: Trắng, Đen, Đỏ, Xanh, Vàng, Hồng, Cam, Xám, Nâu, Sọc, Họa tiết"
                  >
                    <option value="">Chọn màu</option>
                    {["Trắng", "Đen", "Đỏ", "Xanh", "Vàng", "Hồng", "Cam", "Xám", "Nâu", "Sọc", "Họa tiết"].map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col">
                  <label htmlFor={`size_field_${index}`} className="form-label">Size</label>
                  <select
                    // type="text"
                    id={`size_field_${index}`}
                    className="form-control"
                    name={`variants.size.${index}`}
                    value={variant.size}
                    onChange={(e) => onChange(e, index)}
                    title="Các kích cỡ được chấp nhận: S, M, L, F"
                  >
                    <option value="">Chọn kích cỡ</option>
                    {["S", "M", "L", "F"].map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col">
                  <label htmlFor={`stock_field_${index}`} className="form-label">Stock</label>
                  <input
                    type="number"
                    id={`stock_field_${index}`}
                    className="form-control"
                    name={`variants.stock.${index}`}
                    value={variant.stock}
                    onChange={(e) => onChange(e, index)}
                  />
                </div>
                <div className="mb-3 col-auto">
                  <button type="button" className="btn btn-danger" onClick={() => removeVariant(index)}>Xoá</button>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary mb-3" onClick={addVariant}>Add Variant</button>


            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Đang tạo..." : "TẠO"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
