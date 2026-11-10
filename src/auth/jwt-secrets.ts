export function getAccessTokenSecret(): string {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_TOKEN_SECRET must be set');
  }
  return secret;
}

export function getRefreshTokenSecret(): string {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_TOKEN_SECRET must be set');
  }
  return secret;
}