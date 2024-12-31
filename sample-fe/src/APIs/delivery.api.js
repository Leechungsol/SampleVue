import { axiosInstance } from "@/configs/query.config";

const base = "delivery";

/**
 * Provides APIs for managing delivery-related data.
 */
export const apiDelivery = {
  /**
   * Retrieves a list of deliveries based on the provided parameters.
   */
  getDeliveries: async (params) => {
    const { data } = await axiosInstance.get(`${base}`, {
      params,
    });
    return data;
  },

  /**
   * Retrieves a delivery by its explain key and the associated process data.
   */
  getDeliveryByExplainKey: async (params) => {
    const { data } = await axiosInstance.get(
      `${base}/${params.explainKey}/process`,
      {
        params,
      },
    );
    return data;
  },
};
