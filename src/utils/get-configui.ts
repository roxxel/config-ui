import type { Context } from "hono";
import type { Variables } from "../config-ui";

export const getConfigUI = async (c: Context<{ Variables: Variables }, any, any>) => {
    return c.get("configUI");
}
