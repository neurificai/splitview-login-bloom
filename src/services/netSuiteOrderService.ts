import axios from 'axios';
import { encryptAES } from '../utils/hash';
const NS_API_URL = import.meta.env.VITE_APP_API_URL;
const SCRIPT_ID = import.meta.env.VITE_APP_ORDER_LIST_SCRIPT_ID;
const FLEET_API_URL = import.meta.env.VITE_APP_FLEET_API_URL;

interface paramsReq {
  poc_id: number;
  company_id: number;
}

export const getOrderList = async ({ poc_id, company_id }: paramsReq) => {
  const payload = {
    poc_id: poc_id,
    company_id: company_id,
    sci: encryptAES(SCRIPT_ID),
    dpi: 1,
    order_by_dir: 'DESC',
    order_by_column: 'order_date'
  };

  try {
    const response = await axios.post(`${NS_API_URL}/netsuite-api/call-api-on-netSuite`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = response.data;
    if (response.status === 200 && result.success) {
      return {
        success: true,
        nsdata: result,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result.message || "API Response failed. Please check Order List API Call.",
      };
    }
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Order List API failed.",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

interface paramsReqDetails {
  so_id: string;
}

export const getOrderDetails = async ({ so_id }: paramsReqDetails) => {
  const payload = {
    so_id: so_id,
    sci: encryptAES(SCRIPT_ID),
    dpi: 1,
    order_by_dir: 'ASC',
    method: "GET"
  };

  try {
    const response = await axios.post(`${NS_API_URL}/netsuite-api/call-api-on-netSuite`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = response.data;
    if (response.status === 200 && result.success) {
      return {
        success: true,
        data: result,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result.message || "API Response failed. Please check Order List API Call.",
      };
    }
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Order List API failed.",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

export const fetchInstallationImages = async (ordNumber: string, woNumber: any, subord: boolean) => {
  var OrderNumber = ordNumber;
  if (subord) {
    OrderNumber = OrderNumber + '-' + woNumber;
  }
  // OrderNumber = 'AVSO1928';
  OrderNumber = 'ALA62';
  var payload = {
    order_number: OrderNumber
  }
  try {
    const response = await axios.post(`${FLEET_API_URL}/api-set/fetch-orders-installation-images`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const result = response.data;
    if (response.status === 200) {
      return result;
    } else {
      return {
        success: false,
        exception_message: result.message || "API Response failed. Please check API Call.",
      };
    }
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        exception_message: error.response.data.message || "Installation Images API failed.",
      };
    } else {
      return {
        success: false,
        exception_message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};
