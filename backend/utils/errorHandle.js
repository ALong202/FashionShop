class ErrorHandle extends Error { //Định nghĩa một lớp ErrorHandle mở rộng từ lớp Error.
    constructor(message,statusCode){ //Định nghĩa phương thức khởi tạo (constructor) của lớp ErrorHandle với hai tham số là message và statusCode.
        super(message); //Gọi phương thức khởi tạo của lớp cơ bản Error với tham số message, thiết lập message cho đối tượng lỗi.
        this.statusCode = statusCode; //Thiết lập thuộc tính statusCode của đối tượng lỗi bằng giá trị của tham số statusCode.

        Error.captureStackTrace(this, this.constructor); //Bắt stack trace của lỗi, điều này giúp xác định vị trí mà lỗi được tạo ra trong mã nguồn.
    }
}
export default ErrorHandle; //Xuất lớp ErrorHandle để có thể sử dụng trong các module khác của ứng dụng.