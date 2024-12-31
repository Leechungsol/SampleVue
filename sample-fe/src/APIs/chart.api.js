import { axiosInstance } from "@/configs/query.config";

const base = "chart";

/**
 * Provides APIs for interacting with chart data.
 */
export const apiChart = {
  /**
   * Retrieves a list of all available charts.
   */
  getCharts: async () => {
    const { data } = await axiosInstance.get(`${base}`);
    return data;
  },

  /**
   * Retrieves the chart data for a specific flower key.
   */
  getChartByFlowerKey: async (params) => {
    const { data } = await axiosInstance.get(`${base}/${params.flowerKey}`, {
      params,
    });
    return data;
  },
};
