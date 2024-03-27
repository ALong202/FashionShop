## BẢNG MỤC LỤC

* [Hướng dẫn setup project trên Visual Studio code](#SetupProjectinVisualStudioCode)
* [Quy định chung](#quydinhchung)
* [Thành viên nhóm](#thanhvien)
<!-- * [ ](#giangvien) -->
<!-- * [ Đồ án môn học](#doan) -->

## Setup project in Visual Studio Code

<a name="SetupProjectinVisualStudioCode"></a>
Project được cài cài đặt tại `D:/FashionShop`:

1. **Open a Terminal or Command Prompt**:
   * Trên Windows, mở Command Prompt bằng tổ hợp phím `Win + R`, gõ `cmd`, và nhấn Enter.
   * Lựa chọn khác, có thể sử dụng PowerShell.

2. **Navigate to your project directory**:
   Sử dụng lệnh `cd` để thay đổi đường dẫn đến project folder:

   ```bash
   cd D:/FashionShop
   ```

3. **Install dependencies**:
   Sử dụng lệnh sau để cài the dependencies được liệt kê trong `package.json` file:

   ```bash
   npm install
   ```

4. **Configure environment variables (Skip)**:
   Nếu project sử dụng environment variables lưu ở trong một `.env` file, đảm bảo rằng tạo một `.env` file trong project directory (`D:/FashionShop`)  và theit61 lập các environment variables cần thiết.

5. **Run your project**:
   Nếu `package.json` file chứa một `"start"` script để chạy ứng dụng, sử dụng lệnh sau:

   ```bash
   npm start
   ```

   Nếu bạn có script khác để chạy ứng dụng, thay `"start"` với appropriate script name.

6. **Testing (skip)**:
   Để run tests, thực thi test script được định nghĩa in your `package.json`:

   ```bash
   npm test
   ```

7. **Install FRONTEND dependencies**:
   Thực thi các lệnh sau trong git bash:

   ```bash
   cd /d/FashionShop/frontend
   npm install
   ```

8. **Extension**:
   Các thư viện cần cài đặt:
   * Auto Rename Tag
   * Bootstrap 5 Quick snippets
   * ES7+ React/Redux/React-Native/JS snippets
   * HTML CSS Support
   * Live Server
   * markdownlint
   * Prettier - Code formatter

## Quy định chung

<a name="quydinhchung"></a>

1. Tab khi thụt lề: 2 spaces (chỉnh trong 'Tab Size' của Setting hoặc Spaces ở thanh properties dưới cùng bên trái của Visual Studio Code)
2. Remark code đầy đủ: tiếng Việt (có thể dùng keyword tiếng Anh)
3. * Tên biến (bao gồm cả thuộc tính database trong MongoDB) sẽ được format ở dạng tiếng Anh.
   * Các nội dung có hiển thị ra màn hình 100% tiếng Việt có dấu.

## THÀNH VIÊN NHÓM

<a name="thanhvien"></a>
| STT    | MSSV          | Họ và Tên              | Github                                               | Email                   |
| ------ |:-------------:| ----------------------:|-----------------------------------------------------:|-------------------------:
| 1      | 22540008      | Trần Quang Hùng        |[ricardotran92](https://github.com/ricardotran92)     |<22540008@gm.uit.edu.vn>   |
| 2      | 22540001      | Nguyễn Ngọc Ánh        |[DR12719](https://github.com/DR12719)                 |<22540001@gm.uit.edu.vn>   |
| 3      | 22540012      | Phạm Tiến Nam          |[ALong202](https://github.com/ALong202)               |<22540012@gm.uit.edu.vn>   |
| 4      | 22540017      | Phạm Minh Quốc         |[pmquoc-uit](https://github.com/pmquoc-uit)           |<22540017@gm.uit.edu.vn>   |
