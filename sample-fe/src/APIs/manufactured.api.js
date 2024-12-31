import { axiosInstance } from "@/configs/query.config";

const base = "manufactured";

/**
 * Provides APIs for managing manufactured products, including inventory history, receiving and delivery, warehousing, and shipment.
 */
export const apiManufactured = {
  /**
   * Retrieves the inventory history for manufactured products.
   */
  getInventoryHistory: async (params) => {
    const { data } = await axiosInstance.get(`${base}/inventoryHistory`, {
      params,
    });
    return data;
  },

  /**
   * Retrieves the receiving information for manufactured products.
   */
  getReceivingProduct: async (params) => {
    const { data } = await axiosInstance.get(`${base}/receivingProduct`, {
      params,
    });
    return data;
  },

  /**
   * Retrieves the delivery information for manufactured products.
   */
  getDeliveryProduct: async (params) => {
    const { data } = await axiosInstance.get(`${base}/deliveryProduct`, {
      params,
    });
    return data;
  },

  /**
   * Creates a new warehousing entry for manufactured products.
   */
  createWarehousing: async (params) => {
    const { data } = await axiosInstance.post(
      `${base}/warehousing/create`,
      params,
    );
    return data;
  },

  /**
   * Updates an existing warehousing entry for manufactured products.
   */
  updateWarehousing: async (params) => {
    const { data } = await axiosInstance.put(
      `${base}/warehousing/update/${params.warehousingKey}`,
      params,
    );
    return data;
  },

  /**
   * Creates a new shipment for manufactured products.
   */
  createShipment: async (params) => {
    const { data } = await axiosInstance.post(
      `${base}/shipment/create`,
      params,
    );
    return data;
  },

  /**
   * Updates an existing shipment for manufactured products.
   */
  updateShipment: async (params) => {
    const { data } = await axiosInstance.put(
      `${base}/shipment/update/${params.shipmentKey}`,
      params,
    );
    return data;
  },
};
