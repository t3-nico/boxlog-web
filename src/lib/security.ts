// Input validation and sanitization utilities

export class SecurityValidator {
  // Email validation
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
  }

  // URL validation
  static isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      return ['http:', 'https:'].includes(urlObj.protocol)
    } catch {
      return false
    }
  }

  // Basic HTML sanitization (remove script tags and dangerous attributes)
  static sanitizeHtml(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
  }

  // SQL injection prevention (basic)
  static sanitizeSqlInput(input: string): string {
    return input
      .replace(/'/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '')
  }

  // XSS prevention
  static escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, (m) => map[m])
  }

  // File upload validation
  static validateFileUpload(file: File, options: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
    allowedExtensions?: string[]
  } = {}): { valid: boolean; error?: string } {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    } = options

    if (file.size > maxSize) {
      return { valid: false, error: `File size exceeds ${maxSize / 1024 / 1024}MB limit` }
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not allowed' }
    }

    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!allowedExtensions.includes(extension)) {
      return { valid: false, error: 'File extension not allowed' }
    }

    return { valid: true }
  }

  // Rate limiting check (basic implementation)
  static checkRateLimit(key: string, limit: number, windowMs: number): boolean {
    if (typeof window === 'undefined') return true // Server-side, implement with Redis/database
    
    const now = Date.now()
    const windowStart = now - windowMs
    const stored = localStorage.getItem(`rate_limit_${key}`)
    
    if (!stored) {
      localStorage.setItem(`rate_limit_${key}`, JSON.stringify([now]))
      return true
    }
    
    try {
      const requests = JSON.parse(stored).filter((time: number) => time > windowStart)
      
      if (requests.length >= limit) {
        return false
      }
      
      requests.push(now)
      localStorage.setItem(`rate_limit_${key}`, JSON.stringify(requests))
      return true
    } catch {
      return true
    }
  }

  // CSRF token validation (client-side)
  static generateCSRFToken(): string {
    if (typeof window === 'undefined') return ''
    
    const token = crypto.randomUUID()
    sessionStorage.setItem('csrf_token', token)
    return token
  }

  static validateCSRFToken(token: string): boolean {
    if (typeof window === 'undefined') return false
    
    const storedToken = sessionStorage.getItem('csrf_token')
    return storedToken === token
  }

  // Password strength validation
  static validatePasswordStrength(password: string): {
    isValid: boolean
    score: number
    feedback: string[]
  } {
    const feedback: string[] = []
    let score = 0

    if (password.length < 8) {
      feedback.push('Password must be at least 8 characters long')
    } else {
      score += 1
    }

    if (!/[a-z]/.test(password)) {
      feedback.push('Password must contain at least one lowercase letter')
    } else {
      score += 1
    }

    if (!/[A-Z]/.test(password)) {
      feedback.push('Password must contain at least one uppercase letter')
    } else {
      score += 1
    }

    if (!/\d/.test(password)) {
      feedback.push('Password must contain at least one number')
    } else {
      score += 1
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
      feedback.push('Password must contain at least one special character')
    } else {
      score += 1
    }

    return {
      isValid: score >= 4,
      score,
      feedback
    }
  }
}

// Security hooks for React components
export function useSecurityHeaders() {
  if (typeof window !== 'undefined') {
    // Client-side security measures
    
    // Disable right-click in production (optional)
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', (e) => e.preventDefault())
    }
    
    // Disable F12 and other developer shortcuts in production (optional)
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U')) {
          e.preventDefault()
        }
      })
    }
  }
}

export default SecurityValidator