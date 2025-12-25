import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // 基本スタイル（Inputと統一）
          'border-input bg-input flex min-h-[80px] w-full rounded-md border px-4 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
          // テキスト
          'placeholder:text-muted-foreground',
          // フォーカス（Inputと統一）
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          // 無効状態
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
