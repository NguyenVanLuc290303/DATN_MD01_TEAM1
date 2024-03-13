// write api use to app


import { Children } from "react";

var ip_address = "192.168.1.8";



export const API_ADD_USERS = `http://${ip_address}:3000/api-taikhoan`;

export const API_CATEGORY_PRODUCT = `http://${ip_address}:3000/api-theloai`;

export const API_PRODUCT = `http://${ip_address}:3000/api-sanpham`;

export const API_PRODUCT_TOP8 = `http://${ip_address}:3000/api-sanpham/top8`;

export const API_GET_TO_LOVE = `http://${ip_address}:3000/api-sanpham/SPL`;

export const API_ADD_TO_LOVE = `http://${ip_address}:3000/api-sanpham/SPL`;

export const API_COLOR_PRODUCT = `http://${ip_address}:3000/api-mausanpham`;

export const API_NOTIFICATION = `http://${ip_address}:3000/api-thongbao`;

export const API_CHAT = `http://${ip_address}:3000/api-tinnhan`;

export const API_ORDER = `http://${ip_address}:3000/api-donhang`;




