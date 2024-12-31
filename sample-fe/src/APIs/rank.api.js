import { axiosInstance } from "@/configs/query.config";

const base = "rank";

/**
 * Provides an API for retrieving rank web mapping data.
 */
export const apiRank = {
  /**
   * Retrieves the rank web mapping data.
   */
  getRankWebMapping: async () => {
    const { data } = await axiosInstance.get(`${base}/web-mapping`);
    return data;
  },
};
