import { axiosInstance } from "@/configs/query.config";

const base = "company";

/**
 * Provides APIs for managing companies, including fetching company data, creating and updating companies, and uploading company images.
 */
export const apiCompany = {
  /**
   * Fetches a list of companies based on the provided parameters.
   */
  getCompanies: async (params) => {
    const { data } = await axiosInstance.get(`${base}`, {
      params,
    });
    return data;
  },

  /**
   * Fetches the image for a specific company based on the provided company key.
   */
  getImageByCompKey: async (params) => {
    const { data } = await axiosInstance.get(
      `${base}/${params.compKey}/image`,
      {
        params,
        skipToast: true,
      },
    );
    return data;
  },

  /**
   * Creates a new company with the provided parameters.
   */
  createCompany: async (params) => {
    const { data } = await axiosInstance.post(`${base}/create`, params);
    return data;
  },

  /**
   * Updates an existing company with the provided parameters.
   */
  updateCompany: async (params) => {
    const { data } = await axiosInstance.put(
      `${base}/update/${params.compKey}`,
      params,
    );
    return data;
  },

  /**
   * Performs a batch insert of multiple companies with the provided parameters.
   */
  batchInsertCompanies: async (params) => {
    const { data } = await axiosInstance.post(`${base}/batch-insert`, params);
    return data;
  },

  /**
   * Uploads an image for a company.
   */
  uploadImage: async (params) => {
    const { data } = await axiosInstance.post(`${base}/upload-image`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
