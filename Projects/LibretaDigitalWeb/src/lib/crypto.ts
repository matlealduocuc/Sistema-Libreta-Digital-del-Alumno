import { HmacSHA256 } from "crypto-js";

export function hashSha256(string: string) {
  const clave = "123456";
  return HmacSHA256(string, clave).toString();
}
