import { jwtDecode } from "jwt-decode";
import type { JwtData } from "../Types";
import { getRolesFromJwt } from "../utils";
import { useAccessToken } from "./useAccessToken";

export function useAccount() {
  const { accessToken } = useAccessToken(false);

  const data = accessToken ? jwtDecode<JwtData>(accessToken) : null;
  const roles = getRolesFromJwt(data);
  const isAdmin = roles.includes("Admin");

  return {
    data,
    roles,
    isAdmin,
  };
}
