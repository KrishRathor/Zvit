import { parseOpenApi } from "./parser";

const { url, getMethods, postMethods } = await parseOpenApi({
  path: './src/openapi.yaml'
})


