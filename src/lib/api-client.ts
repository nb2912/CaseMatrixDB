interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

export const apiClient = {
  get: async <T>(): Promise<ApiResponse<T>> => {
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 300));
      return { data: [] as unknown as T, status: 200 };
    } catch {
      return { data: [] as unknown as T, status: 500, error: "Failed to fetch" };
    }
  },

  post: async <T>(_: string, body: unknown): Promise<ApiResponse<T>> => {
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 300));
      return { data: body as T, status: 201 };
    } catch {
      return { data: body as T, status: 500, error: "Failed to post" };
    }
  },
};
