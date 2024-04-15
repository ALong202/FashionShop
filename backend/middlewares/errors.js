
/**
 *  Đây là một middleware xử lý lỗi. Nó nhận vào các tham số err, req, res, và next.
    Nếu err không tồn tại, nó sẽ sử dụng một mã trạng thái mặc định là 500 (Lỗi máy chủ nội bộ) và một thông báo mặc định là "Lỗi máy chủ nội bộ".
    Nếu err tồn tại, nó sẽ sử dụng statusCode và message từ lỗi đó.
    Sau đó, nó sẽ gửi một phản hồi JSON chứa thông báo lỗi và mã trạng thái tương ứng về cho client.
 */
export default (err,req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Lỗi máy chủ nội bộ",
    };
    res.status(error.statusCode).json({
        message: error.message,
        error:err,
        stack: err?.stack,
    });
};