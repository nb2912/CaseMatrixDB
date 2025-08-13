const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

export const apiClient = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 300));
      return { data: [] as unknown as T, status: 200 };
    } catch (error) {
      return { data: [] as unknown as T, status: 500, error: "Failed to fetch" };
    }
  },

  post: async <T>(url: string, body: any): Promise<ApiResponse<T>> => {
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 300));
      return { data: body as T, status: 201 };
    } catch (error) {
      return { data: body as T, status: 500, error: "Failed to post" };
    }
  },
};
