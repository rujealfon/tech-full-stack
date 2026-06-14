import { serveStatic } from "@hono/node-server/serve-static";
import { notFound, onError } from "stoker/middlewares";

import type { AppOpenAPI } from "./types";

import { BASE_PATH } from "./constants";
import createRouter from "./create-router";

export default function createApp() {
  const app = createRouter()
    .use("*", (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }
      // Serve built frontend assets; in dev Vite handles this separately
      return serveStatic({ root: "./public" })(c, next);
    })
    .basePath(BASE_PATH) as AppOpenAPI;

  app
    .notFound(notFound)
    .onError(onError);

  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
