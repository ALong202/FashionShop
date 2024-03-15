## BẢNG MỤC LỤC
* [Hướng dẫn setup project trên Visual Studio code](#SetupProjectinVisualStudioCode)
* [Quy định chung](#quydinhchung)
* [ Thành viên nhóm](#thanhvien)
<!-- * [ ](#giangvien) -->
<!-- * [ Đồ án môn học](#doan) -->

## Setup project in Visual Studio Code
<a name="SetupProjectinVisualStudioCode"></a>
Project folder is located at `D:/FashionShop`:

1. **Open a Terminal or Command Prompt**: 
   - On Windows, open the Command Prompt by pressing `Win + R`, typing `cmd`, and pressing Enter.
   - Alternatively, you can use PowerShell.

2. **Navigate to your project directory**:
   Use the `cd` command to change the directory to project folder:

   ```bash
   cd D:/FashionShop
   ```

3. **Install dependencies**:
   Run the following command to install the dependencies listed in your `package.json` file:

   ```bash
   npm install
   ```

4. **Configure environment variables**:
   If project uses environment variables stored in a `.env` file, make sure to create a `.env` file in project directory (`D:/FashionShop`) and set the necessary environment variables.

5. **Run your project**:
   If `package.json` file contains a `"start"` script to run your application, use the following command:

   ```bash
   npm start
   ```

   If you have a different script for running your application, replace `"start"` with the appropriate script name.

6. **Testing**:
   If you want to run tests, execute the test script defined in your `package.json`:

   ```bash
   npm test
   ```

By following these steps, project should be up and running on your new computer. If you encounter any issues during the process, double-check that Node.js and npm are properly installed and that there are no errors during the dependency installation phase.

## Quy định chung:
<a name="quydinhchung"></a>

1. Tab khi thụt lề: 4 spaces (chỉnh trong 'Tab Size' của Setting hoặc Spaces ở thanh properties dưới cùng bên trái của Visual Studio Code)
2. Remark code đầy đủ: tiếng Việt (có thể dùng keyword tiếng Anh)
3. Tên biến để default nhưng các nội dung hiển thị ra màn hình 100% tiếng Việt có dấu.

## THÀNH VIÊN NHÓM
<a name="thanhvien"></a>
| STT    | MSSV          | Họ và Tên              | Github                                               | Email                   |
| ------ |:-------------:| ----------------------:|-----------------------------------------------------:|-------------------------:
| 1      | 22540008      | Trần Quang Hùng        |[ricardotran92](https://github.com/ricardotran92)     |22540008@gm.uit.edu.vn   |
| 2      | 22540001      | Nguyễn Ngọc Ánh        |[DR12719](https://github.com/DR12719)                 |22540001@gm.uit.edu.vn   |
| 3      | 22540012      | Phạm Tiến Nam          |[ALong202](https://github.com/ALong202)               |22540012@gm.uit.edu.vn   |
| 4      | 22540017      | Phạm Minh Quốc         |[pmquoc-uit](https://github.com/pmquoc-uit)           |22540017@gm.uit.edu.vn   |
