import { Container, Heading, Text, Button } from '@/components/ui'
import { ctaData } from '@/lib/features-data'

export function FeaturesCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Heading as="h2" size="4xl" className="text-white mb-6">
            {ctaData.title}
          </Heading>
          
          <Text size="xl" className="text-blue-100 mb-4 max-w-2xl mx-auto">
            {ctaData.subtitle}
          </Text>
          
          <Text size="lg" className="text-blue-200 mb-12 max-w-xl mx-auto">
            {ctaData.description}
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
              asChild
            >
              <a href={ctaData.primaryButton.href}>
                {ctaData.primaryButton.text}
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur"
              asChild
            >
              <a href={ctaData.secondaryButton.href}>
                {ctaData.secondaryButton.text}
              </a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200 text-sm">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10k+</div>
              <div className="text-blue-200 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200 text-sm">Expert Support</div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImdyaWQiIG9wYWNpdHk9IjAuMSI+CjxwYXRoIGQ9Ik0wIDQwVjBIMUwwIDQwWiIgZmlsbD0id2hpdGUiLz4KPHA+'})] opacity-20"></div>
    </section>
  )
}