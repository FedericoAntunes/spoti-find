import axios, { AxiosResponse } from 'axios'
import { UserIp } from '../types/userIp'

const instance = axios.create({
  baseURL: import.meta.env.VITE_IP_BASE_URL,
})

const responseBody = (response: AxiosResponse) => response.data

const ipRequests = {
  get: (url: string) => instance.get(url).then(responseBody),
}

export const IpCall = {
  getIp: (): Promise<UserIp> => ipRequests.get('/?format=json'),
}
