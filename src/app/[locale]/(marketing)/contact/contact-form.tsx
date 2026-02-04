'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@/i18n/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Paperclip, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const CATEGORY_OPTIONS = [
  'general',
  'technical',
  'billing',
  'partnership',
  'feedback',
  'other',
] as const;

function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, t('form.name.required')).max(50, t('form.name.maxLength')),
    email: z.string().min(1, t('form.email.invalid')).email(t('form.email.invalid')),
    category: z.string().min(1, t('form.category.required')),
    subject: z.string().min(1, t('form.subject.required')).max(100, t('form.subject.maxLength')),
    message: z.string().min(10, t('form.message.minLength')).max(1000, t('form.message.maxLength')),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

/** 必須ラベルコンポーネント（デジタル庁ガイドライン準拠） */
function RequiredBadge() {
  return <span className="text-destructive ml-2 text-sm font-normal">※必須</span>;
}

/** サポートテキストコンポーネント */
function SupportText({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <p id={id} className="text-muted-foreground text-sm">
      {children}
    </p>
  );
}

/** エラーテキストコンポーネント（デジタル庁ガイドライン準拠: ＊を冒頭に付与） */
function ErrorText({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <p id={id} className="text-destructive text-sm">
      ＊{children}
    </p>
  );
}

export function ContactForm() {
  const t = useTranslations('marketing.contact');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contactSchema = createContactSchema(t);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      category: '',
      subject: '',
      message: '',
    },
  });

  const messageValue = watch('message') || '';

  async function onSubmit(data: ContactFormValues) {
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(t('form.submitError'));
    }
  }

  const validateAndSetFile = useCallback(
    (file: File | null) => {
      setFileError(null);

      if (!file) {
        setAttachment(null);
        return;
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError(t('form.attachment.invalidType'));
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFileError(t('form.attachment.tooLarge'));
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      setAttachment(file);
    },
    [t],
  );

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    validateAndSetFile(file);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0] ?? null;
    validateAndSetFile(file);
  }

  function handleRemoveFile() {
    setAttachment(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleReset() {
    reset();
    setIsSubmitted(false);
    setSubmitError(null);
    setAttachment(null);
    setFileError(null);
    setIsDragOver(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  if (isSubmitted) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <div className="bg-muted mx-auto mb-6 flex size-16 items-center justify-center rounded-full">
          <CheckCircle className="text-success size-8" aria-hidden="true" />
        </div>
        <h3 className="text-foreground mb-2 text-xl font-semibold">{t('form.success.title')}</h3>
        <p className="text-muted-foreground mb-6">{t('form.success.description')}</p>
        <Button variant="outline" onClick={handleReset}>
          {t('form.success.newMessage')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        {/* お名前 */}
        <div className="space-y-2">
          <Label htmlFor="name">
            {t('form.name.label')}
            <RequiredBadge />
          </Label>
          <SupportText id="name-support">{t('form.name.support')}</SupportText>
          <Input
            id="name"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error name-support' : 'name-support'}
            {...register('name')}
          />
          {errors.name && <ErrorText id="name-error">{errors.name.message}</ErrorText>}
        </div>

        {/* メールアドレス */}
        <div className="space-y-2">
          <Label htmlFor="email">
            {t('form.email.label')}
            <RequiredBadge />
          </Label>
          <SupportText id="email-support">{t('form.email.support')}</SupportText>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error email-support' : 'email-support'}
            {...register('email')}
          />
          {errors.email && <ErrorText id="email-error">{errors.email.message}</ErrorText>}
        </div>
      </div>

      {/* 問い合わせ種別 */}
      <div className="space-y-2">
        <Label htmlFor="category">
          {t('form.category.label')}
          <RequiredBadge />
        </Label>
        <SupportText id="category-support">{t('form.category.support')}</SupportText>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="category"
                aria-required="true"
                aria-invalid={!!errors.category}
                aria-describedby={
                  errors.category ? 'category-error category-support' : 'category-support'
                }
              >
                <SelectValue placeholder={t('form.category.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {t(`form.category.options.${option}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && <ErrorText id="category-error">{errors.category.message}</ErrorText>}
      </div>

      {/* 件名 */}
      <div className="space-y-2">
        <Label htmlFor="subject">
          {t('form.subject.label')}
          <RequiredBadge />
        </Label>
        <SupportText id="subject-support">{t('form.subject.support')}</SupportText>
        <Input
          id="subject"
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error subject-support' : 'subject-support'}
          {...register('subject')}
        />
        {errors.subject && <ErrorText id="subject-error">{errors.subject.message}</ErrorText>}
      </div>

      {/* メッセージ */}
      <div className="space-y-2">
        <Label htmlFor="message">
          {t('form.message.label')}
          <RequiredBadge />
        </Label>
        <SupportText id="message-support">{t('form.message.support')}</SupportText>
        <Textarea
          id="message"
          className="min-h-[150px] resize-none"
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error message-support' : 'message-support'}
          {...register('message')}
        />
        <div className="flex items-center justify-between">
          {errors.message && <ErrorText id="message-error">{errors.message.message}</ErrorText>}
          <span className="text-muted-foreground ml-auto text-xs" aria-live="polite">
            {messageValue.length}/1000 {t('form.message.charCount')}
          </span>
        </div>
      </div>

      {/* ファイル添付（デジタル庁ガイドライン準拠） */}
      <div className="space-y-2">
        <Label htmlFor="attachment">{t('form.attachment.label')}</Label>
        <SupportText id="attachment-support">{t('form.attachment.support')}</SupportText>

        {/* 隠しファイル入力 */}
        <input
          ref={fileInputRef}
          id="attachment"
          type="file"
          accept=".png,.jpg,.jpeg,.gif,.pdf"
          onChange={handleFileChange}
          className="sr-only"
          aria-describedby={
            fileError ? 'attachment-error attachment-support' : 'attachment-support'
          }
        />

        {/* ドロップエリア（ボタンを包含する構造） */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-md border p-4 transition-colors ${
            isDragOver
              ? 'border-success bg-muted'
              : fileError
                ? 'border-destructive bg-input'
                : 'border-input bg-input'
          }`}
        >
          {/* ファイル選択ボタン */}
          <div className="mb-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="mr-2 size-4" aria-hidden="true" />
              {t('form.attachment.button')}
            </Button>
          </div>

          {/* ドラッグ&ドロップ案内テキスト */}
          <p className={`text-sm ${isDragOver ? 'text-success' : 'text-muted-foreground'}`}>
            {isDragOver ? t('form.attachment.dropzoneActive') : t('form.attachment.dropzone')}
          </p>
        </div>

        {/* 選択済みファイル表示 */}
        {attachment && (
          <div className="bg-muted border-border flex items-center gap-2 rounded-md border px-3 py-2">
            <Paperclip className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
            <span className="text-foreground min-w-0 flex-1 truncate text-sm">
              {attachment.name}
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-muted-foreground hover:text-destructive shrink-0 p-1 transition-colors"
              aria-label={t('form.attachment.remove')}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* ファイル未選択メッセージ */}
        {!attachment && !fileError && (
          <p className="text-muted-foreground text-sm">{t('form.attachment.noFile')}</p>
        )}

        {fileError && <ErrorText id="attachment-error">{fileError}</ErrorText>}
      </div>

      {/* 送信エラー */}
      {submitError && (
        <div className="bg-muted text-destructive rounded-md p-3 text-sm" role="alert">
          ＊{submitError}
        </div>
      )}

      {/* 送信ボタン */}
      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </Button>

        <p className="text-muted-foreground text-center text-xs">
          {t('form.privacyNotice')}{' '}
          <Link href="/legal/privacy" className="text-primary hover:underline">
            {t('form.privacyLink')}
          </Link>
        </p>
      </div>
    </form>
  );
}
