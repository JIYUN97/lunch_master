import jwt from 'jsonwebtoken';
import config from 'config';

/*
 * privateKey는 JWT 서명할때 (만들 때, 발행할 때) 사용함
 * publicKey는 JWT를 복호화 할 때 사용
 *
 * privateKey는 서버만 가지고 있고
 * publicKey는 누구든 가지고 있을 수 있음 하지만 숨기는게 좋음
 */

export async function signJwt(
  object: Record<string, string>,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions,
): Promise<string> {
  const privateKey = config.get<string>(keyName);
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256', // public key private key를 사용하기 위해서
  });
}

export function verifyJwt<T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
): T | null {
  const publicKey = config.get<string>(keyName);
  try {
    return jwt.verify(token, publicKey) as T;
  } catch (e) {
    return null;
  }
}
