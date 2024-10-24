import { AuthPayload } from "@app/auth/data/AuthPayload";

export interface CoreRequest<P=unknown, Q=unknown, B=unknown, C=unknown> {
  params: P;
  query: Q;
  body: B;
  cookies: C;
}

export interface WithBody<B> extends CoreRequest {
  body: B;
}

export interface WithQuery<Q> extends CoreRequest {
  query: Q;
}

export interface WithParams<P> extends CoreRequest {
  params: P;
}

export interface WithCookies<C> extends CoreRequest {
  cookies: C;
}

export interface WithAuth extends CoreRequest {
  user: AuthPayload,
}

export interface WithOptionalAuth extends CoreRequest {
  user?: AuthPayload,
}