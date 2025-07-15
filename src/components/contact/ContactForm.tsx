'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(1, 'お名前を入力してください').max(50, 'お名前は50文字以内で入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  subject: z.string().min(1, '件名を入力してください').max(100, '件名は100文字以内で入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください').max(1000, 'メッセージは1000文字以内で入力してください'),
})

type FormData = z.infer<typeof formSchema>

interface FormState {
  isSubmitting: boolean
  isSubmitted: boolean
  submitError: string | null
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    submitError: null
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  async function onSubmit(data: FormData) {
    setFormState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      submitError: null 
    }))
    
    try {
      // API送信のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 成功時
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        submitError: null
      })
      
      // フォームをリセット
      form.reset()
      
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        submitError: 'メッセージの送信に失敗しました。しばらく時間をおいて再度お試しください。'
      })
    }
  }

  // 成功メッセージ表示
  if (formState.isSubmitted) {
    return (
      <section className="py-24 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-green-900/30">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <Heading as="h2" size="2xl" className="mb-4">
              メッセージを送信しました
            </Heading>
            
            <Text size="lg" variant="muted" className="mb-8">
              お問い合わせありがとうございます。2営業日以内にご返信いたします。
            </Text>
            
            <Button
              onClick={() => setFormState({
                isSubmitting: false,
                isSubmitted: false,
                submitError: null
              })}
              variant="outline"
            >
              新しいメッセージを送信
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading as="h2" size="3xl" className="mb-4">
              お問い合わせ
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              ご質問やご相談がございましたら、お気軽にお問い合わせください。
              専門スタッフが迅速にご対応いたします。
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* お問い合わせ情報 */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 dark:bg-gray-800">
                <Heading as="h3" size="lg" className="mb-6">
                  お問い合わせ情報
                </Heading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-blue-900/30">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-medium dark:text-gray-100">メール</Text>
                      <Text size="sm" variant="muted">contact@yoursaas.com</Text>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-green-900/30">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-medium dark:text-gray-100">電話</Text>
                      <Text size="sm" variant="muted">03-1234-5678</Text>
                      <Text size="xs" variant="muted">平日 9:00-18:00</Text>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-purple-900/30">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-medium dark:text-gray-100">所在地</Text>
                      <Text size="sm" variant="muted">
                        〒100-0001<br />
                        東京都千代田区千代田1-1-1<br />
                        YourSaaSビル 5F
                      </Text>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Text size="sm" variant="muted" className="mb-4">
                    よくある質問もご確認ください
                  </Text>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/pricing#faq">FAQ を見る</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* お問い合わせフォーム */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* エラーメッセージ */}
                  {formState.submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <Text size="sm" className="text-red-700 dark:text-red-300">
                          {formState.submitError}
                        </Text>
                      </div>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>お名前 <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="山田 太郎" 
                            disabled={formState.isSubmitting}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="example@email.com" 
                            disabled={formState.isSubmitting}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>件名 <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="お問い合わせの件名を入力してください" 
                            disabled={formState.isSubmitting}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メッセージ <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="お問い合わせ内容を詳しくお聞かせください（10文字以上）"
                            className="resize-vertical"
                            rows={6}
                            disabled={formState.isSubmitting}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/1000文字
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formState.isSubmitting}
                    >
                      {formState.isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          送信中...
                        </div>
                      ) : (
                        'メッセージを送信'
                      )}
                    </Button>
                  </div>

                  <Text size="sm" variant="muted" className="text-center">
                    このフォームを送信することで、
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-300">
                      プライバシーポリシー
                    </a>
                    に同意したものとみなします。
                  </Text>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}