import { axiosInstance } from "@/configs/query.config";

const base = "specification";

/**
 * Provides APIs for managing specifications.
 */
export const apiSpecification = {
  /**
   * Retrieves a list of specifications.
   */
  getSpecifications: async (params) => {
    const { data } = await axiosInstance.get(`${base}`, { params });
    return data;
  },

  /**
   * Retrieves the details of a specification.
   */
  getDetail: async (params) => {
    const { data } = await axiosInstance.get(
      `${base}/detail/${params.explainKey}`,
      { params },
    );
    return data;
  },

  /**
   * Retrieves a specification by its `explainKey`.
   */
  getSpecificationByExplainKey: async (params) => {
    const { data } = await axiosInstance.get(`${base}/${params.explainKey}`, {
      params,
    });
    return data;
  },

  /**
   * Retrieves the files associated with a specification.
   */
  getFilesByExplainKey: async (params) => {
    const { data } = await axiosInstance.get(
      `${base}/${params.explainKey}/files`,
      { params },
    );
    return data;
  },
};
