import axios, { AxiosRequestConfig } from 'axios'
import { youtubeApiKey } from '@/config/keys'

export const YoutubeSearch = async (keyword: string, nextPageToken?: string) => {
  const config: AxiosRequestConfig = {
    url: 'https://www.googleapis.com/youtube/v3/search',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
      type: 'channel',
      part: 'id,snippet',
      q: keyword,
      maxResults: 50,
      pageToken: nextPageToken,
      key: youtubeApiKey,  // 取得したAPIキーを設定
      order: 'rating',
    }
  }
  // @ts-ignore
  const { data } = await axios(config);
  return data
};

export const YoutubeChannel = async (channelIds: string[], nextPageToken?: string) => {
  // @ts-ignore
  const id: string = channelIds.join(',')
  const config: AxiosRequestConfig = {
    url: 'https://www.googleapis.com/youtube/v3/channels',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
      part: 'statistics',
      id: id,
      maxResults: 50,
      pageToken: nextPageToken,
      key: youtubeApiKey,  // 取得したAPIキーを設定
    }
  }
  // @ts-ignore
  const { data } = await axios(config);
  return data
};
