import axios, { AxiosRequestConfig } from 'axios'
import { youtubeApiKey } from '@/config'

export const YoutubeSearch = async (keyword: string) => {
  try {
    const config: AxiosRequestConfig = {
      url: 'https://www.googleapis.com/youtube/v3/search',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      params: {
        part: 'snippet',
        q: keyword,
        maxResults: 50,
        key: youtubeApiKey,  // 取得したAPIキーを設定
      }
    }
    const res = await axios(config);
    console.log(res.data.items);
    return res.data.items;
  } catch (error) {
    throw (error);
  }
};

YoutubeSearch('エンジニア').finally()
