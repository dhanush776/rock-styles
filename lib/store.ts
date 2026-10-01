"use client";
import type {CartItem,Product} from "@/types";
const CART="rock_styles_cart"; const WISH="rock_styles_wishlist";
export function readCart():CartItem[]{try{return JSON.parse(localStorage.getItem(CART)||"[]")}catch{return[]}}
export function writeCart(v:CartItem[]){localStorage.setItem(CART,JSON.stringify(v));window.dispatchEvent(new Event("rock-cart"));}
export function addCart(p:Product,size="M",qty=1){const c=readCart();const i=c.findIndex(x=>x.id===p.id&&x.size===size);if(i>=0)c[i].qty+=qty;else c.push({...p,qty,size});writeCart(c);}
export function removeCart(id:string,size:string){writeCart(readCart().filter(x=>!(x.id===id&&x.size===size)))}
export function setCartQty(id:string,size:string,qty:number){const c=readCart().map(x=>x.id===id&&x.size===size?{...x,qty}:x).filter(x=>x.qty>0);writeCart(c)}
export function readWish():string[]{try{return JSON.parse(localStorage.getItem(WISH)||"[]")}catch{return[]}}
export function toggleWish(id:string){const w=readWish();const n=w.includes(id)?w.filter(x=>x!==id):[...w,id];localStorage.setItem(WISH,JSON.stringify(n));window.dispatchEvent(new Event("rock-wish"));return n}
export function money(n:number){return `₹${n.toLocaleString("en-IN")}`}
