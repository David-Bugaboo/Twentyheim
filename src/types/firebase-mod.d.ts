import type { Auth } from "firebase/auth";



declare module "../../../firebase" {
  export const auth: Auth;
  export function loginWithGoogle(): Promise<any>;
  export function logout(): Promise<void>;
}


