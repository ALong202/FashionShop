import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

const Sorters = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || 'price');
  const [initialized, setInitialized] = useState(false); // Thêm trạng thái initialized

  useEffect(() => {
    if (initialized) { // Chỉ cập nhật URL nếu người dùng đã chọn một lựa chọn sắp xếp
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('sort', sort); // Cập nhật chỉ tham số 'sort'
      navigate({ search: newSearchParams.toString() }); // Cập nhật URL với đối tượng newSearchParams
    }
  }, [sort, navigate, initialized, searchParams]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setInitialized(true); // Cập nhật trạng thái initialized khi người dùng chọn một lựa chọn sắp xếp
  };

  
  return (
    <div>
      <label htmlFor="sortOrder">Sắp xếp theo: </label>
      <select id="sortOrder" onChange={handleSortChange}>
        <option value="price">Price (Low to High)</option>
        <option value="-price">Price (High to Low)</option>
        <option value="ratings">Ratings (Low to High)</option>
        <option value="-ratings">Ratings (High to Low)</option>
      </select>
    </div>
  )
}

export default Sorters