/*
Hàm điều khiển (controller functions) cho các file routes và xác định route
Các điều khiển và các logic cho tài nguyên sản phẩm (product resource)
*/
export const getProducts = async (req, res) => {
  res.status(200).json({
    message: "Tất cả sản phẩm",
  });
};
