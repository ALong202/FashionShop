## BẢNG MỤC LỤC
* [Hướng dẫn setup project trên Visual Studio code](#SetupProjectinVisualStudioCode)
* [Quy định chung](#quydinhchung)
* [ ](#giangvien)
* [ Thành viên nhóm](#thanhvien)
* [ Đồ án môn học](#doan)

<a name="SetupProjectinVisualStudioCode">
# Setup project in Visual Studio Code

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

<a name="quydinhchung">
# Quy định chung:
1. Tab khi thụt lề: 4 spaces (chỉnh trong 'Tab Size' của Setting hoặc Spaces ở bảng properties bên dưới cùng bên trái của Visual Studio Code)
2. Remark code đầy đủ: tiếng Việt (có thể dùng keyword tiếng Anh)
3. Tên biến default nhưng các nội dung hiển thị 100% tiếng Việt có dấu.