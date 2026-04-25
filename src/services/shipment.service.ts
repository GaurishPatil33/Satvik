import { IShipment } from "../types/shipment-types";
import { api } from "./api";

export const getAllShipments = async (): Promise<IShipment[]> => {
    const res = await api.get("/shipments");
    return res.data;
};
