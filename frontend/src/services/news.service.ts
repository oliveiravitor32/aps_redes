const API_URL = "https://1323-177-81-179-109.ngrok-free.app";

class NewsService {
  async getAllNews(): Promise<any> {
    const response = await fetch(`${API_URL}/news`);

    return response.json();
  }
}

export const newsService = new NewsService();
