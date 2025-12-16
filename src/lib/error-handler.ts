/**
 * Comprehensive error handling and logging utilities
 * Provides centralized error management with different severity levels
 */

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Error categories
export enum ErrorCategory {
  NETWORK = 'network',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  BUSINESS_LOGIC = 'business_logic',
  SYSTEM = 'system',
  USER_INPUT = 'user_input',
  EXTERNAL_API = 'external_api',
  DATABASE = 'database',
  PERFORMANCE = 'performance',
}

// Error context interface
export interface ErrorContext {
  userId?: string
  sessionId?: string
  url?: string
  userAgent?: string
  timestamp?: string
  component?: string
  action?: string
  metadata?: Record<string, any>
}

// Custom error class
export class AppError extends Error {
  public readonly severity: ErrorSeverity
  public readonly category: ErrorCategory
  public readonly context: ErrorContext
  public readonly code: string
  public readonly isOperational: boolean

  constructor(
    message: string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    category: ErrorCategory = ErrorCategory.SYSTEM,
    code?: string,
    context: ErrorContext = {},
    isOperational: boolean = true
  ) {
    super(message)

    this.name = 'AppError'
    this.severity = severity
    this.category = category
    this.context = {
      ...context,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent:
        typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    }
    this.code = code || this.generateErrorCode()
    this.isOperational = isOperational

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }

  private generateErrorCode(): string {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return `${this.category.toUpperCase()}_${timestamp}_${random}`
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      severity: this.severity,
      category: this.category,
      code: this.code,
      context: this.context,
      stack: this.stack,
      isOperational: this.isOperational,
    }
  }
}

// Error logger interface
interface ErrorLogger {
  log(error: AppError | Error): void
  flush?(): Promise<void>
}

// Console logger implementation
class ConsoleLogger implements ErrorLogger {
  log(error: AppError | Error): void {
    if (error instanceof AppError) {
      const emoji = this.getSeverityEmoji(error.severity)
      console.group(
        `${emoji} ${error.category.toUpperCase()} Error [${error.code}]`
      )
      console.error('Message:', error.message)
      console.error('Context:', error.context)
      if (error.stack) {
        console.error('Stack:', error.stack)
      }
      console.groupEnd()
    } else {
      console.error('Error:', error.message)
      if (error.stack) {
        console.error('Stack:', error.stack)
      }
    }
  }

  private getSeverityEmoji(severity: ErrorSeverity): string {
    switch (severity) {
      case ErrorSeverity.LOW:
        return '💡'
      case ErrorSeverity.MEDIUM:
        return '⚠️'
      case ErrorSeverity.HIGH:
        return '❌'
      case ErrorSeverity.CRITICAL:
        return '🚨'
      default:
        return '❓'
    }
  }
}

// Local storage logger for client-side persistence
class LocalStorageLogger implements ErrorLogger {
  private readonly maxErrors = 100
  private readonly storageKey = 'app_error_logs'

  log(error: AppError | Error): void {
    if (typeof window === 'undefined') return

    try {
      const errors = this.getStoredErrors()
      const errorLog = {
        timestamp: new Date().toISOString(),
        error:
          error instanceof AppError
            ? error.toJSON()
            : {
                name: error.name,
                message: error.message,
                stack: error.stack,
              },
      }

      errors.unshift(errorLog)

      // Keep only the most recent errors
      if (errors.length > this.maxErrors) {
        errors.splice(this.maxErrors)
      }

      localStorage.setItem(this.storageKey, JSON.stringify(errors))
    } catch (storageError) {
      console.warn('Failed to store error logs:', storageError)
    }
  }

  private getStoredErrors(): any[] {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  getErrorLogs(): any[] {
    return this.getStoredErrors()
  }

  clearErrorLogs(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey)
    }
  }
}

// Remote logger for production error tracking
class RemoteLogger implements ErrorLogger {
  private readonly endpoint: string
  private readonly maxRetries: number = 3
  private readonly retryDelay: number = 1000

  constructor(endpoint: string = '/api/errors') {
    this.endpoint = endpoint
  }

  async log(error: AppError | Error): Promise<void> {
    if (typeof window === 'undefined') return

    const errorData = {
      timestamp: new Date().toISOString(),
      error:
        error instanceof AppError
          ? error.toJSON()
          : {
              name: error.name,
              message: error.message,
              stack: error.stack,
            },
      url: window.location.href,
      userAgent: window.navigator.userAgent,
    }

    await this.sendWithRetry(errorData, 0)
  }

  private async sendWithRetry(data: any, attempt: number): Promise<void> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      if (attempt < this.maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.retryDelay * (attempt + 1))
        )
        return this.sendWithRetry(data, attempt + 1)
      } else {
        console.error(
          'Failed to send error log after',
          this.maxRetries,
          'attempts:',
          error
        )
      }
    }
  }
}

// Main error handler class
export class ErrorHandler {
  private loggers: ErrorLogger[] = []
  private isProduction: boolean = false

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'
    this.setupDefaultLoggers()
    this.setupGlobalErrorHandlers()
  }

  private setupDefaultLoggers(): void {
    // Always add console logger for development
    if (!this.isProduction) {
      this.addLogger(new ConsoleLogger())
    }

    // Add local storage logger for client-side
    if (typeof window !== 'undefined') {
      this.addLogger(new LocalStorageLogger())
    }

    // Add remote logger for production
    if (this.isProduction) {
      this.addLogger(new RemoteLogger())
    }
  }

  private setupGlobalErrorHandlers(): void {
    if (typeof window === 'undefined') return

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = new AppError(
        event.reason?.message || 'Unhandled Promise Rejection',
        ErrorSeverity.HIGH,
        ErrorCategory.SYSTEM,
        undefined,
        {
          component: 'Global',
          action: 'unhandledrejection',
          metadata: { reason: event.reason },
        }
      )
      this.handleError(error)
    })

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      const error = new AppError(
        event.message || 'Uncaught Error',
        ErrorSeverity.HIGH,
        ErrorCategory.SYSTEM,
        undefined,
        {
          component: 'Global',
          action: 'error',
          metadata: {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
          },
        }
      )
      this.handleError(error)
    })
  }

  addLogger(logger: ErrorLogger): void {
    this.loggers.push(logger)
  }

  handleError(error: Error | AppError): void {
    // Convert regular errors to AppError if needed
    const appError =
      error instanceof AppError
        ? error
        : new AppError(
            error.message,
            ErrorSeverity.MEDIUM,
            ErrorCategory.SYSTEM,
            undefined,
            {},
            false
          )

    // Log to all registered loggers
    this.loggers.forEach((logger) => {
      try {
        logger.log(appError)
      } catch (loggerError) {
        console.error('Logger error:', loggerError)
      }
    })

    // Handle critical errors
    if (appError.severity === ErrorSeverity.CRITICAL) {
      this.handleCriticalError(appError)
    }
  }

  private handleCriticalError(error: AppError): void {
    // For critical errors, we might want to:
    // 1. Show user-friendly error page
    // 2. Attempt recovery
    // 3. Send immediate alerts

    if (typeof window !== 'undefined') {
      // Show user notification for critical errors
      const message = 'A critical error occurred. Please refresh the page.'
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Application Error', { body: message })
      } else {
        alert(message)
      }
    }
  }

  // Utility methods for creating specific error types
  createValidationError(
    message: string,
    field?: string,
    context?: ErrorContext
  ): AppError {
    return new AppError(
      message,
      ErrorSeverity.LOW,
      ErrorCategory.VALIDATION,
      undefined,
      { ...context, metadata: { ...context?.metadata, field } }
    )
  }

  createNetworkError(
    message: string,
    url?: string,
    context?: ErrorContext
  ): AppError {
    return new AppError(
      message,
      ErrorSeverity.MEDIUM,
      ErrorCategory.NETWORK,
      undefined,
      { ...context, url }
    )
  }

  createAuthenticationError(message: string, context?: ErrorContext): AppError {
    return new AppError(
      message,
      ErrorSeverity.HIGH,
      ErrorCategory.AUTHENTICATION,
      undefined,
      context
    )
  }

  createBusinessLogicError(message: string, context?: ErrorContext): AppError {
    return new AppError(
      message,
      ErrorSeverity.MEDIUM,
      ErrorCategory.BUSINESS_LOGIC,
      undefined,
      context
    )
  }

  // Performance monitoring
  measurePerformance<T>(
    operation: () => T,
    operationName: string,
    threshold: number = 1000
  ): T {
    const start = performance.now()

    try {
      const result = operation()

      // Check if it's a Promise
      if (result instanceof Promise) {
        return result.then(
          (value) => {
            this.checkPerformanceThreshold(start, operationName, threshold)
            return value
          },
          (error) => {
            this.checkPerformanceThreshold(start, operationName, threshold)
            throw error
          }
        ) as T
      } else {
        this.checkPerformanceThreshold(start, operationName, threshold)
        return result
      }
    } catch (error) {
      this.checkPerformanceThreshold(start, operationName, threshold)
      throw error
    }
  }

  private checkPerformanceThreshold(
    start: number,
    operationName: string,
    threshold: number
  ): void {
    const duration = performance.now() - start

    if (duration > threshold) {
      const error = new AppError(
        `Operation "${operationName}" took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`,
        ErrorSeverity.LOW,
        ErrorCategory.PERFORMANCE,
        undefined,
        { metadata: { operationName, duration, threshold } }
      )
      this.handleError(error)
    }
  }

  // Async error wrapper
  async withErrorHandling<T>(
    operation: () => Promise<T>,
    context?: ErrorContext
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      const appError =
        error instanceof AppError
          ? error
          : new AppError(
              error instanceof Error ? error.message : 'Unknown error',
              ErrorSeverity.MEDIUM,
              ErrorCategory.SYSTEM,
              undefined,
              context
            )

      this.handleError(appError)
      throw appError
    }
  }
}

// Create singleton instance
const errorHandler = new ErrorHandler()

// Export utility functions
export const handleError = (error: Error | AppError) =>
  errorHandler.handleError(error)
export const createValidationError = (
  message: string,
  field?: string,
  context?: ErrorContext
) => errorHandler.createValidationError(message, field, context)
export const createNetworkError = (
  message: string,
  url?: string,
  context?: ErrorContext
) => errorHandler.createNetworkError(message, url, context)
export const createAuthenticationError = (
  message: string,
  context?: ErrorContext
) => errorHandler.createAuthenticationError(message, context)
export const createBusinessLogicError = (
  message: string,
  context?: ErrorContext
) => errorHandler.createBusinessLogicError(message, context)
export const measurePerformance = <T>(
  operation: () => T,
  operationName: string,
  threshold?: number
) => errorHandler.measurePerformance(operation, operationName, threshold)
export const withErrorHandling = <T>(
  operation: () => Promise<T>,
  context?: ErrorContext
) => errorHandler.withErrorHandling(operation, context)

export default errorHandler
