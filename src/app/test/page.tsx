import { Container, Heading, Text, Button } from '@/components/ui'

export default function TestPage() {
  return (
    <Container className="py-16">
      <div className="text-center space-y-4">
        <Heading as="h1" size="3xl">
          テストページ
        </Heading>
        <Text>
          このページが表示されれば、基本コンポーネントは動作しています。
        </Text>
        <div className="space-x-4">
          <Button>Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>
      </div>
    </Container>
  )
}