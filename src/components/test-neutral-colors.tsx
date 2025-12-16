'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTheme } from 'next-themes'

export function TestNeutralColors() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="p-8 space-y-8 bg-bg-primary min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Neutral Color System Test
        </h1>

        <div className="mb-6">
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="outline"
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Button Test */}
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>
                Testing all button variants with neutral colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button variant="default">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </div>
            </CardContent>
          </Card>

          {/* Input Test */}
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>
                Testing input fields with neutral colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter your text here..." />
              <Input value="Filled input" readOnly />
              <Input placeholder="Disabled input" disabled />
            </CardContent>
          </Card>

          {/* Color Palette Test */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Neutral Color Palette</CardTitle>
              <CardDescription>
                Visual representation of the neutral color system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {[
                  0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000,
                ].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`h-12 w-full rounded border border-border-primary mb-1`}
                      style={{
                        backgroundColor: `var(--color-neutral-${shade}, #${shade === 0 ? 'ffffff' : shade === 1000 ? '000000' : 'cccccc'})`,
                      }}
                    />
                    <span className="text-xs text-text-secondary">{shade}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Background Test */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Background Hierarchy</CardTitle>
              <CardDescription>
                Testing background color hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-bg-primary border border-border-primary p-4 rounded">
                  <p className="text-text-primary">Primary Background</p>
                </div>
                <div className="bg-bg-secondary border border-border-primary p-4 rounded">
                  <p className="text-text-primary">Secondary Background</p>
                </div>
                <div className="bg-bg-tertiary border border-border-primary p-4 rounded">
                  <p className="text-text-primary">Tertiary Background</p>
                </div>
                <div className="bg-bg-elevated border border-border-primary p-4 rounded shadow-sm">
                  <p className="text-text-primary">
                    Elevated Background (Card/Modal)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
