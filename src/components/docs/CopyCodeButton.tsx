'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CopyCodeButtonProps {
  code: string;
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // コピー失敗時はUIで「Copied!」が表示されないため対応不要
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="bg-surface-container text-muted-foreground hover:bg-surface-container-high hover:text-foreground h-auto rounded px-2 py-1 text-xs"
      onClick={handleCopy}
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}
