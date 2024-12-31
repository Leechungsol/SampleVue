import { axiosInstance } from "@/configs/query.config";

const base = "unshipped";

/**
 * Provides an API for fetching unshipped items.
 */
export const apiUnshipped = {
  /**
   * Fetches a list of unshipped items based on the provided parameters.
   */
  getUnshippeds: async (params) => {
    const { data } = await axiosInstance.get(`${base}`, {
      params,
    });
    return data;
  },
};
