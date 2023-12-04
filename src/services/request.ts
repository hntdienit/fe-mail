import { envLib } from "@/libs/env";
import axios from "axios";

export const requestHasura = axios.create({
  baseURL: "https://guiding-quail-93.hasura.app/v1/graphql",
  withCredentials: true,
  headers: {
    "x-hasura-admin-secret": envLib.hasura.api,
  },
});
