"server only";
import { cookies } from "next/headers";

export async function serverGetAuth(): Promise<string> {
  const cookie = cookies();
  const admintestAuthorization =
    cookie.get("admintestAuthorization")?.value ?? "";
  return admintestAuthorization;
}

export default serverGetAuth;
