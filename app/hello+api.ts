const INTERNALS = Symbol('internal response');

export class ExpoResponse<Body = unknown> extends Response {
  [INTERNALS]: {
    Body?: Body;
  };

  constructor(body?: BodyInit | null, init: ResponseInit = {}) {
    super(body, init);

    this[INTERNALS] = {};
  }

  static json<JsonBody>(
    body: JsonBody,
    init?: ResponseInit,
  ): ExpoResponse<JsonBody> {
    const response: Response = Response.json(body, init);
    return new ExpoResponse(response.body, response);
  }
}

export function GET(): ExpoResponse<{
  message: string;
}> {
  return ExpoResponse.json({ message: 'hello world' });
}
