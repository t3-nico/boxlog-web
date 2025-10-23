import { TestNeutralColors } from '@/components/test-neutral-colors'
import { AccessibilityValidation } from '@/components/accessibility-validation'

export default function TestColorsPage() {
  return (
    <div className="space-y-8">
      <TestNeutralColors />
      <div className="border-t border-border-primary pt-8">
        <AccessibilityValidation />
      </div>
    </div>
  )
}