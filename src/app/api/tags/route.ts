import { apiError, apiSuccess, ErrorCode } from '@/lib/api-response';
import { getAllTags } from '@/lib/tags-server';

export async function GET() {
  try {
    const tags = await getAllTags();
    return apiSuccess(tags);
  } catch {
    return apiError('Failed to fetch tags', 500, { code: ErrorCode.INTERNAL_ERROR });
  }
}
