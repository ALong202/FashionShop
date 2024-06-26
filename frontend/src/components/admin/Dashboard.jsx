import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesChart from "../charts/SalesChart";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1)); // setDate(1): để mặc định ban đầu là ngày 1 của tháng hiện tại
  const [endDate, setEndDate] = useState(new Date());

  const submitHandler = () => {
    console.log("====================================");
    console.log("Print out console the chosen start & end date:\n", new Date(startDate).toISOString());
    console.log(endDate.toISOString());
    console.log("====================================");
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Từ ngày</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">Đến ngày</label>
          <DatePicker
          dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>
        <button 
          className="btn fetch-btn ms-4 mt-3 px-5"
          onClick={submitHandler}
        >
          Lọc</button>
      </div>

      <div className="row pr-4 my-5">
        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Doanh số
                <br />
                <b>0.00đ</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-primary o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Đơn hàng
                <br />
                <b>0</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SalesChart />

      <div className="mb-5"></div>
    </AdminLayout>
  );
};

export default Dashboard;
