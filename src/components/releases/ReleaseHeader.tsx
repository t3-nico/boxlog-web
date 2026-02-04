import Image from 'next/image';
import Link from 'next/link';
import { ShareButton } from './ShareButton';

// Local type definitions and utilities
interface ReleaseFrontMatter {
  version: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  breaking: boolean;
  featured: boolean;
  prerelease?: boolean;
  author?: string;
  authorAvatar?: string;
  coverImage?: string;
}

function isPrerelease(version: string): boolean {
  return (
    version.includes('beta') ||
    version.includes('alpha') ||
    version.includes('rc') ||
    version.includes('pre')
  );
}

function getVersionType(version: string): 'major' | 'minor' | 'patch' | 'prerelease' {
  if (isPrerelease(version)) {
    return 'prerelease';
  }

  const cleanVersion = version.replace(/^v/, '');
  const parts = cleanVersion.split('.').map(Number);

  if ((parts[2] ?? 0) > 0) return 'patch';
  if ((parts[1] ?? 0) > 0) return 'minor';
  return 'major';
}

interface ReleaseHeaderProps {
  frontMatter: ReleaseFrontMatter;
  version: string;
}

export function ReleaseHeader({ frontMatter }: ReleaseHeaderProps) {
  const versionType = getVersionType(frontMatter.version);

  const versionBadgeStyles = {
    major: 'bg-muted text-destructive border-destructive',
    minor: 'bg-muted text-info border-info',
    patch: 'bg-muted text-success border-success',
    prerelease: 'bg-muted text-warning border-warning',
  };

  const versionLabels = {
    major: 'Major Release',
    minor: 'Minor Release',
    patch: 'Patch Release',
    prerelease: 'Prerelease',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <header className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="from-overlay via-background to-container absolute inset-0 bg-gradient-to-br">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="text-muted-foreground flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <Link href="/releases" className="hover:text-foreground transition-colors">
                Release Notes
              </Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-foreground font-medium">v{frontMatter.version}</li>
          </ol>
        </nav>

        {/* Version Badge and Type */}
        <div className="mb-6 flex items-center gap-4">
          <span
            className={`inline-flex items-center rounded-full border-2 px-4 py-2 text-lg font-bold ${versionBadgeStyles[versionType]}`}
          >
            v{frontMatter.version}
          </span>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              {versionLabels[versionType]}
            </span>

            {frontMatter.prerelease && (
              <span className="bg-muted text-warning border-warning inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
                🚧 Beta
              </span>
            )}
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-5xl">
          {frontMatter.title}
        </h1>

        <p className="text-muted-foreground mb-8 max-w-3xl text-xl leading-relaxed">
          {frontMatter.description}
        </p>

        {/* Meta Information */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-6">
          {/* Release Date */}
          <div className="flex items-center gap-2">
            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
              <svg
                className="text-info h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <div className="text-foreground text-sm font-medium">Release Date</div>
              <div className="text-sm">
                {formatDate(frontMatter.date)} {formatTime(frontMatter.date)}
              </div>
            </div>
          </div>

          {/* Author */}
          {frontMatter.author && (
            <div className="flex items-center gap-2">
              <div className="bg-muted flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg">
                {frontMatter.authorAvatar ? (
                  <Image
                    src={frontMatter.authorAvatar}
                    alt={frontMatter.author || 'Author avatar'}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    className="text-muted-foreground h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <div className="text-foreground text-sm font-medium">Release Manager</div>
                <div className="text-sm">{frontMatter.author}</div>
              </div>
            </div>
          )}

          {/* Version Statistics */}
          <div className="flex items-center gap-2">
            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
              <svg
                className="text-success h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <div className="text-foreground text-sm font-medium">Version Type</div>
              <div className="text-sm capitalize">{versionType} Update</div>
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="mt-8 flex flex-wrap gap-4">
          {frontMatter.featured && (
            <span className="bg-muted text-primary border-primary inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured Release
            </span>
          )}

          {frontMatter.breaking && (
            <span className="bg-muted text-destructive border-destructive inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              Breaking Changes
            </span>
          )}

          {versionType === 'major' && (
            <span className="bg-muted text-warning border-warning inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Major Update
            </span>
          )}
        </div>

        {/* Tags */}
        {frontMatter.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-muted-foreground mb-3 text-sm font-medium">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {frontMatter.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/releases/tag/${encodeURIComponent(tag)}`}
                  className="border-border bg-card text-foreground hover:border-foreground hover:bg-muted inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#changes"
            className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View Changes
          </a>

          <Link
            href="/releases"
            className="border-border text-foreground hover:bg-muted inline-flex items-center justify-center rounded-lg border px-6 py-3 font-medium transition-colors"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Releases
          </Link>

          <ShareButton title={frontMatter.title} version={frontMatter.version} />
        </div>
      </div>
    </header>
  );
}
