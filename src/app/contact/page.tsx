import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <section className="space-y-4 max-w-md">
      <h2 className="text-2xl font-bold">Contact Us</h2>
      <form className="space-y-4">
        <Input type="text" placeholder="Your Name" required />
        <Textarea placeholder="Your Message" rows={4} required />
        <Button type="submit">Send</Button>
      </form>
    </section>
  )
}
