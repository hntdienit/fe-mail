import { env } from "process";

export const envLib = {
  imageAttachment: {
    pdf: env.PDF || "",
    xml: env.XML || "",
  },
  hasura: {
    api: env.HASURA_API
  }
};
