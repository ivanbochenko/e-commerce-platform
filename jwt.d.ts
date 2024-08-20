import { JWTPayloadSpec } from "@elysiajs/jwt";

declare module "jwt" {
  export interface JWTPayloadSpec extends JWTPayloadSpec {
    id: string;
  }
}