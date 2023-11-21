import { getProductData } from "./dataService.js";

export const getData = async () => {
    const data = await getProductData();
    if (data?.error) {
        return data.error.message;
    }
    return data;
};