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
import type { Dictionary } from '@/lib/i18n'

interface ContactFormProps {
  dict: Dictionary
  locale: string
}

interface FormState {
  isSubmitting: boolean
  isSubmitted: boolean
  submitError: string | null
}

export function ContactForm({ dict, locale }: ContactFormProps) {
  const formSchema = z.object({
    name: z.string().min(1, dict.pages.contact.form.name.required).max(50, dict.pages.contact.form.name.maxLength),
    email: z.string().email(dict.pages.contact.form.email.invalid),
    subject: z.string().min(1, dict.pages.contact.form.subject.required).max(100, dict.pages.contact.form.subject.maxLength),
    message: z.string().min(10, dict.pages.contact.form.message.minLength).max(1000, dict.pages.contact.form.message.maxLength),
  })

  type FormData = z.infer<typeof formSchema>
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
        submitError: dict.pages.contact.form.submitError
      })
    }
  }

  // 成功メッセージ表示
  if (formState.isSubmitted) {
    return (
      <section className="py-24 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-[rgb(var(--icon-bg-tertiary))] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <Heading as="h2" size="2xl" className="mb-4">
              {dict.pages.contact.form.success.title}
            </Heading>
            
            <Text size="lg" variant="muted" className="mb-8">
              {dict.pages.contact.form.success.description}
            </Text>
            
            <Button
              onClick={() => setFormState({
                isSubmitting: false,
                isSubmitted: false,
                submitError: null
              })}
              variant="outline"
            >
              {dict.pages.contact.form.success.newMessage}
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
              {dict.pages.contact.form.title}
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              {dict.pages.contact.form.subtitle}
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* お問い合わせ情報 */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 dark:bg-gray-800">
                <Heading as="h3" size="lg" className="mb-6">
                  {dict.pages.contact.info.title}
                </Heading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[rgb(var(--icon-bg-secondary))] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-medium dark:text-gray-100">{dict.pages.contact.info.email.label}</Text>
                      <Text size="sm" variant="muted">{dict.pages.contact.info.email.value}</Text>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-green-900/30">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-medium dark:text-gray-100">{dict.pages.contact.info.phone.label}</Text>
                      <Text size="sm" variant="muted">{dict.pages.contact.info.phone.value}</Text>
                      <Text size="xs" variant="muted">{dict.pages.contact.info.phone.hours}</Text>
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
                      <Text className="font-medium dark:text-gray-100">{dict.pages.contact.info.location.label}</Text>
                      <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: dict.pages.contact.info.location.address.replace(/\\n/g, '<br />') }} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Text size="sm" variant="muted" className="mb-4">
                    {dict.pages.contact.info.faq.text}
                  </Text>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/${locale}/pricing#faq`}>{dict.pages.contact.info.faq.button}</a>
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
                        <FormLabel>{dict.pages.contact.form.name.label} <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={dict.pages.contact.form.name.placeholder} 
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
                        <FormLabel>{dict.pages.contact.form.email.label} <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder={dict.pages.contact.form.email.placeholder} 
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
                        <FormLabel>{dict.pages.contact.form.subject.label} <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={dict.pages.contact.form.subject.placeholder} 
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
                        <FormLabel>{dict.pages.contact.form.message.label} <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={dict.pages.contact.form.message.placeholder}
                            className="resize-vertical"
                            rows={6}
                            disabled={formState.isSubmitting}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/1000{dict.pages.contact.form.message.charCount}
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
                          {dict.pages.contact.form.submitting}
                        </div>
                      ) : (
                        dict.pages.contact.form.submit
                      )}
                    </Button>
                  </div>

                  <Text size="sm" variant="muted" className="text-center">
                    {dict.pages.contact.form.privacyNotice}
                    <a href={`/${locale}/privacy`} className="text-blue-600 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-300">
                      {dict.footer.privacyPolicy}
                    </a>
                    {locale === 'jp' ? 'に同意したものとみなします。' : '.'}
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