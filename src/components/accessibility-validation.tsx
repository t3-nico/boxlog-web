"use client"

import * as React from "react"
import { useAccessibilityValidation, validateNeutralColorCombinations, VERIFIED_COMBINATIONS } from "@/lib/accessibility"
import { cn } from "@/lib/utils"

interface AccessibilityValidationProps {
  className?: string
}

export function AccessibilityValidation({ className }: AccessibilityValidationProps) {
  const { validateContrast, validateAll } = useAccessibilityValidation()
  const [validationResults, setValidationResults] = React.useState<ReturnType<typeof validateNeutralColorCombinations>>([])

  React.useEffect(() => {
    setValidationResults(validateAll())
  }, [validateAll])

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'AAA':
        return 'text-semantic-success-text bg-semantic-success-background'
      case 'AA':
        return 'text-semantic-success-text bg-semantic-success-background'
      case 'AA_LARGE':
        return 'text-semantic-warning-text bg-semantic-warning-background'
      case 'FAIL':
        return 'text-semantic-error-text bg-semantic-error-background'
      default:
        return 'text-text-secondary bg-bg-secondary'
    }
  }

  return (
    <div className={cn("space-y-6 p-6", className)}>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-text-primary">
          アクセシビリティ検証結果
        </h2>
        <p className="text-sm text-text-secondary">
          WCAG 2.1 AA準拠のコントラスト比検証
        </p>
      </div>

      {/* Pre-verified combinations showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">
          ✅ 検証済み推奨組み合わせ
        </h3>
        
        {/* Light mode examples */}
        <div className="space-y-2">
          <h4 className="text-md font-medium text-text-secondary">Light Mode</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(VERIFIED_COMBINATIONS.LIGHT).map(([key, combination]) => (
              <div
                key={key}
                className="p-4 rounded-lg border border-border-primary"
                style={{ 
                  backgroundColor: combination.bg,
                  color: combination.text 
                }}
              >
                <div className="font-medium">
                  {key.replace(/_/g, ' ')}
                </div>
                <div className="text-sm opacity-75">
                  コントラスト比: {combination.ratio}:1
                </div>
                <div className="text-xs mt-1">
                  {combination.bg} / {combination.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark mode examples */}
        <div className="space-y-2">
          <h4 className="text-md font-medium text-text-secondary">Dark Mode</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(VERIFIED_COMBINATIONS.DARK).map(([key, combination]) => (
              <div
                key={key}
                className="p-4 rounded-lg border border-border-primary"
                style={{ 
                  backgroundColor: combination.bg,
                  color: combination.text 
                }}
              >
                <div className="font-medium">
                  {key.replace(/_/g, ' ')}
                </div>
                <div className="text-sm opacity-75">
                  コントラスト比: {combination.ratio}:1
                </div>
                <div className="text-xs mt-1">
                  {combination.bg} / {combination.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic validation results */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">
          📊 全組み合わせ検証結果
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border-primary rounded-lg">
            <thead>
              <tr className="bg-bg-secondary">
                <th className="border border-border-primary p-3 text-left text-text-primary font-medium">
                  組み合わせ名
                </th>
                <th className="border border-border-primary p-3 text-left text-text-primary font-medium">
                  プレビュー
                </th>
                <th className="border border-border-primary p-3 text-left text-text-primary font-medium">
                  コントラスト比
                </th>
                <th className="border border-border-primary p-3 text-left text-text-primary font-medium">
                  グレード
                </th>
                <th className="border border-border-primary p-3 text-left text-text-primary font-medium">
                  推奨
                </th>
              </tr>
            </thead>
            <tbody>
              {validationResults.map((result, index) => (
                <tr key={index} className="hover:bg-bg-secondary/50">
                  <td className="border border-border-primary p-3 text-text-primary">
                    {result.name}
                  </td>
                  <td className="border border-border-primary p-3">
                    <div
                      className="px-3 py-2 rounded text-sm font-medium"
                      style={{
                        backgroundColor: result.background,
                        color: result.text
                      }}
                    >
                      サンプルテキスト
                    </div>
                  </td>
                  <td className="border border-border-primary p-3 text-text-primary font-mono">
                    {result.ratio}:1
                  </td>
                  <td className="border border-border-primary p-3">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      getGradeColor(result.grade.grade)
                    )}>
                      {result.grade.grade}
                    </span>
                  </td>
                  <td className="border border-border-primary p-3">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      result.recommended 
                        ? "text-semantic-success-text bg-semantic-success-background"
                        : "text-semantic-error-text bg-semantic-error-background"
                    )}>
                      {result.recommended ? "✓ 推奨" : "✗ 非推奨"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidelines summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">
          📋 アクセシビリティガイドライン
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border-primary bg-bg-secondary">
            <h4 className="font-medium text-text-primary mb-2">通常テキスト</h4>
            <p className="text-sm text-text-secondary mb-1">16px以下</p>
            <p className="text-lg font-semibold text-text-primary">4.5:1以上</p>
          </div>
          
          <div className="p-4 rounded-lg border border-border-primary bg-bg-secondary">
            <h4 className="font-medium text-text-primary mb-2">大きいテキスト</h4>
            <p className="text-sm text-text-secondary mb-1">18px以上または14px以上太字</p>
            <p className="text-lg font-semibold text-text-primary">3.0:1以上</p>
          </div>
          
          <div className="p-4 rounded-lg border border-border-primary bg-bg-secondary">    
            <h4 className="font-medium text-text-primary mb-2">UIコンポーネント</h4>
            <p className="text-sm text-text-secondary mb-1">ボタン・アイコン等</p>
            <p className="text-lg font-semibold text-text-primary">3.0:1以上</p>
          </div>
        </div>
      </div>
    </div>
  )
}