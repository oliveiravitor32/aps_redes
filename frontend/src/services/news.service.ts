const API_URL = "http://192.168.0.17:8080";

class NewsService {
  async getAllNews(): Promise<any> {
    const response = await fetch(`${API_URL}/news`);

    return response.json();
  }
}

export const newsService = new NewsService();
