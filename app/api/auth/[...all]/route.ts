import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { GET: BaseGET, POST: BasePOST } = toNextJsHandler(auth.handler);

// Wrap handlers with error logging
export const GET = async (request: Request, context: any) => {
  try {
    return await BaseGET(request, context);
  } catch (error) {
    console.error("[Auth GET Error]", error);
    throw error;
  }
};

export const POST = async (request: Request, context: any) => {
  try {
    return await BasePOST(request, context);
  } catch (error) {
    console.error("[Auth POST Error]", error);
    throw error;
  }
};
