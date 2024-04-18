import React, { useState } from "react"
import { useNavigate } from "react-router-dom";



const Search = () => {
  const [keyword, setkeyword] = useState("");
  const [category, setCategory] = useState(""); //
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else if (category.trim()) {
      navigate(`/?category=${category}`);
    } else {
      navigate(`/`);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder="Nhập tên sản phẩm ..."
          name="keyword"
          value={keyword}
          onChange={(e) => setkeyword(e.target.value)}
        />
        {/* <input
          type="text"
          id="category_field"
          className="form-control"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /> */}
        <select
          id="category_field"
          className="form-control category_field"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            if (e.target.value) {
              navigate(`/?category=${e.target.value}`);
            }
          }}
        >
          <option value="">Chọn danh mục</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          {/* <option value="Trẻ em">Trẻ em</option> */}
          // Thêm các option khác tại đây
        </select>

        <button id="search_btn" className="btn" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  )
}

export default Search
