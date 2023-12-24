export type Address = { address: string; city: string };
export type PresentDeliveryList<T> = {[K in keyof T]: Address};
