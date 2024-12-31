import { axiosInstance } from "@/configs/query.config";

const base = "list";

/**
 * Provides a set of API functions for fetching various types of data related to a list.
 */
export const apiList = {
  /**
   * Fetches product data.
   */
  getProduct: async () => {
    const { data } = await axiosInstance.get(`${base}/product`);
    return data;
  },

  /**
   * Fetches parts type data.
   */
  getPartsType: async () => {
    const { data } = await axiosInstance.get(`${base}/partsType`);
    return data;
  },

  /**
   * Fetches parts color data.
   */
  getPartsColor: async () => {
    const { data } = await axiosInstance.get(`${base}/partsColor`);
    return data;
  },

  /**
   * Fetches parts use data.
   */
  getPartsUse: async () => {
    const { data } = await axiosInstance.get(`${base}/partsUse`);
    return data;
  },

  /**
   * Fetches component classification data.
   */
  getCompClassify: async () => {
    const { data } = await axiosInstance.get(`${base}/compClassify`);
    return data;
  },

  /**
   * Fetches process data.
   */
  getProcess: async () => {
    const { data } = await axiosInstance.get(`${base}/process`);
    return data;
  },

  /**
   * Fetches machine data.
   */
  getMachine: async () => {
    const { data } = await axiosInstance.get(`${base}/machine`);
    return data;
  },

  /**
   * Fetches company data.
   */
  getCompany: async () => {
    const { data } = await axiosInstance.get(`${base}/company`);
    return data;
  },
};
