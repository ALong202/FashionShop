import axios from "axios";

class ZaloPayApi {

  createPayment(data) {
    return axios.post("http://localhost:3001/zalopay/payment", data)
  }

}

export default new ZaloPayApi();