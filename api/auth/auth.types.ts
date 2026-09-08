export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
};

export type ProblemDetails = {
  title: string;
  status: number;
  detail: string;
};

export type ValidationProblemDetails = ProblemDetails & {
  errors: Record<string, string[]>;
};