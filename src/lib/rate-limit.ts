import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * レート制限設定
 *
 * Upstash Redis を使用したレート制限。
 * 環境変数が設定されていない場合はメモリベースのストアを使用（開発環境用）
 */

// Redis クライアント（本番環境）
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : undefined;

/**
 * コンタクトフォーム用レート制限
 *
 * - 同一IPから5分間に3回まで
 * - 本番環境では Redis、開発環境ではメモリベース
 */
export const contactRateLimit = new Ratelimit({
  redis: redis as Redis,
  limiter: Ratelimit.slidingWindow(3, '5 m'),
  analytics: true,
  prefix: 'ratelimit:contact',
});

/**
 * 検索API用レート制限
 *
 * - 同一IPから1分間に30回まで
 */
export const searchRateLimit = new Ratelimit({
  redis: redis as Redis,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
  analytics: true,
  prefix: 'ratelimit:search',
});

/**
 * タグAPI用レート制限
 *
 * - 同一IPから1分間に60回まで
 */
export const tagsRateLimit = new Ratelimit({
  redis: redis as Redis,
  limiter: Ratelimit.slidingWindow(60, '1 m'),
  analytics: true,
  prefix: 'ratelimit:tags',
});

/**
 * IP アドレスの取得
 *
 * Vercel の x-forwarded-for ヘッダーまたは x-real-ip から IP を取得
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    // x-forwarded-for は複数のIPをカンマ区切りで含む可能性がある
    // 最初のIPが実際のクライアントIP
    return forwardedFor.split(',')[0]?.trim() ?? '127.0.0.1';
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // フォールバック（ローカル開発環境）
  return '127.0.0.1';
}
