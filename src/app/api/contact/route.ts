import { apiError, apiSuccess, ErrorCode } from '@/lib/api-response';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  category: z.string().min(1),
  subject: z.string().min(1).max(100),
  message: z.string().min(10).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_CONTACT_REPO || 't3-nico/boxlog-web';

    if (!githubToken) {
      return apiError('Server configuration error', 500, { code: ErrorCode.CONFIG_ERROR });
    }

    const categoryLabels: Record<string, string> = {
      general: '一般的なお問い合わせ',
      technical: '技術的なお問い合わせ',
      billing: '請求・お支払い',
      partnership: '提携・パートナーシップ',
      feedback: 'フィードバック',
      other: 'その他',
    };

    const issueBody = `## お問い合わせ内容

**送信者:** ${data.name}
**メールアドレス:** ${data.email}
**カテゴリ:** ${categoryLabels[data.category] || data.category}

---

${data.message}

---

*このissueはコンタクトフォームから自動作成されました。*
`;

    const response = await fetch(`https://api.github.com/repos/${githubRepo}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `token ${githubToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        title: `[Contact] ${data.subject}`,
        body: issueBody,
        labels: ['contact', 'triage'],
      }),
    });

    if (!response.ok) {
      return apiError('Failed to submit contact request', 500, {
        code: ErrorCode.EXTERNAL_SERVICE_ERROR,
      });
    }

    const issueData = await response.json();

    return apiSuccess({
      success: true,
      issueNumber: issueData.number,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError('Validation failed', 400, {
        code: ErrorCode.VALIDATION_ERROR,
        details: error.issues,
      });
    }

    return apiError('Internal server error', 500, { code: ErrorCode.INTERNAL_ERROR });
  }
}
