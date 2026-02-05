import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * ボタンバリアント定義（dayopt-appと同期）
 *
 * ## バリアント設計（Material Design 3 準拠）
 *
 * | variant     | 用途                                         | 例                           |
 * |-------------|----------------------------------------------|------------------------------|
 * | primary     | 主要CTA、画面で最も重要なアクション          | 保存、送信、作成、購入       |
 * | outline     | 副次アクション、primaryとペアで使用          | キャンセル、戻る、詳細       |
 * | ghost       | アイコンボタン、ツールバー、軽量な操作       | 閉じる、メニュー、設定       |
 * | text        | テキストリンク風、インライン操作             | 詳細を見る、もっと見る       |
 * | destructive | 破壊的アクション、確認ダイアログ内           | 削除、解除、退会             |
 *
 * ## サイズ設計（8pxグリッド準拠）
 *
 * | size    | 高さ  | 用途                                         |
 * |---------|-------|----------------------------------------------|
 * | sm      | 24px  | コンパクトUI、テーブル内、ドロップダウン     |
 * | default | 32px  | 標準的なアクション、ほとんどの場面           |
 * | lg      | 40px  | 主要なCTA、フォーム送信、ランディング        |
 */
const buttonVariants = cva(
  [
    // 基本レイアウト
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-bold',
    // トランジション
    'transition-colors',
    // フォーカス状態（アクセシビリティ）
    'outline-none',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    // 無効状態（aria-disabled推奨、disabled属性も対応）
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    // バリデーションエラー状態
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  ].join(' '),
  {
    variants: {
      variant: {
        // 主要CTA - 最も強調されるボタン
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover active:bg-primary-hover',
        // 副次アクション - ボーダー付きの控えめなボタン
        outline: [
          'border border-border bg-container text-foreground shadow-sm',
          'hover:bg-state-hover active:bg-state-hover',
        ].join(' '),
        // アイコンボタン・ツールバー - 背景なし、ホバーで背景出現
        ghost: 'text-foreground hover:bg-state-hover active:bg-state-hover',
        // テキストリンク風 - 下線スタイル
        text: 'text-primary underline-offset-4 hover:underline',
        // 破壊的アクション - 削除、解除など
        destructive: [
          'bg-destructive text-white shadow-sm',
          'hover:bg-destructive-hover active:bg-destructive-hover',
          'focus-visible:outline-destructive',
        ].join(' '),
      },
      size: {
        // sm: 24px高さ、12pxパディング
        sm: [
          'h-6 px-4 text-xs',
          "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:shrink-0",
        ].join(' '),
        // default: 32px高さ、16pxパディング
        default: [
          'h-8 px-4 text-sm',
          "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        ].join(' '),
        // lg: 40px高さ、24pxパディング
        lg: [
          'h-10 px-6 text-base',
          "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0",
        ].join(' '),
        // アイコンボタン: 正方形
        'icon-sm': [
          'size-6',
          "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:shrink-0",
        ].join(' '),
        icon: [
          'size-8',
          "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        ].join(' '),
        'icon-lg': [
          'size-10',
          "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0",
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /** 子要素にスタイルを委譲する（Linkなどで使用） */
  asChild?: boolean;
  /** ローディング状態 */
  isLoading?: boolean;
  /** ローディング中に表示するテキスト */
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      onClick,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props['aria-disabled'] || isLoading) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const content = isLoading ? (
      <>
        <Loader2 className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
        {loadingText ?? children}
      </>
    ) : (
      children
    );

    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={asChild ? onClick : handleClick}
        disabled={isLoading || disabled}
        aria-busy={isLoading || undefined}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
