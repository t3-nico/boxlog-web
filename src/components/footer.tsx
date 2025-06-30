export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4">
      <div className="container mx-auto text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} MySite. All rights reserved.
      </div>
    </footer>
  )
}
