import axios from 'axios';

//change this to your local machine ip
//windows: ipconfig, ipv4 address
//linux: ifconfig, inet address
const ip = '192.168.0.199';
const conn = `http://${ip}:5554`;

//get API url from .env.local
export const api = axios.create({ baseURL: conn });
