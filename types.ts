export type Product={id:string;name:string;price:number;oldPrice?:number;image:string;images?:string[];category:string;stock:number;description:string;active:boolean;createdAt?:number;badge?:string;trending?:boolean};
export type CartItem=Product & {qty:number;size:string};
export type OrderItem={name:string;qty:number;price:number;size:string;image?:string};
export type Order={id:string;customerName:string;phone:string;email?:string;address:string;city?:string;district?:string;pincode?:string;items:OrderItem[];total:number;status:string;createdAt:number};
