import SwaggerParser from "swagger-parser";

interface IParseOpenApi {
  path: string
}

type OpenApiMethodDetails = {
  summary?: string;
  description?: string;
  operationId?: string;
  tags?: string[];
  parameters?: any[];
  requestBody?: any;
  responses?: any;
  [key: string]: any;
};

interface IMethods {
  path: string,
  details: OpenApiMethodDetails
}


export const parseOpenApi = async (args: IParseOpenApi): Promise<{
  url: string,
  getMethods: IMethods[],
  postMethods: IMethods[]
}> => {
  const { path } = args;

  const getMethods: IMethods[] = [];
  const postMethods: IMethods[] = [];

  try {
    const api = await SwaggerParser.parse(path);

    //@ts-ignore 
    const url = api.servers[0].url;

    if (!api.paths) return {
      url,
      getMethods,
      postMethods
    }

    for (const [path, methods] of Object.entries(api.paths)) {
      for (const [method, details] of Object.entries(methods as Record<string, OpenApiMethodDetails>)) {
        if (method.toLowerCase() === 'get') {
          getMethods.push({ path, details });
        }
        if (method.toLowerCase() === 'post') {
          postMethods.push({ path, details });
        }
      }
    }

    return {
      url,
      getMethods,
      postMethods
    };

  } catch (error) {
    console.log(error);
    return {
      url: '',
      getMethods: [],
      postMethods: []
    }
  }

}

