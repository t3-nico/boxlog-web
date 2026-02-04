import {
  Calendar,
  Check,
  ChevronRight,
  Clipboard,
  Clock,
  Eye,
  Info,
  TestTube,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';

interface UpcomingRelease {
  version: string;
  expectedDate: string;
  status: 'planning' | 'development' | 'testing' | 'review';
  description: string;
  features: string[];
  progress: number;
}

interface UpcomingReleasesProps {
  upcomingReleases?: UpcomingRelease[];
}

export function UpcomingReleases({ upcomingReleases = [] }: UpcomingReleasesProps = {}) {
  if (upcomingReleases.length === 0) {
    return null;
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border">
      {/* Header */}
      <div className="border-border border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
            <svg
              className="text-info h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-foreground text-lg font-semibold">今後のリリース予定</h3>
            <p className="text-muted-foreground text-sm">開発中の新機能とリリース予定日</p>
          </div>
        </div>
      </div>

      {/* Upcoming Releases List */}
      <div className="divide-border divide-y">
        {upcomingReleases.map((release, index) => (
          <UpcomingReleaseItem key={release.version} release={release} isFirst={index === 0} />
        ))}
      </div>

      {/* Footer */}
      <div className="border-border bg-muted border-t px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">リリース予定は変更される場合があります</p>
          <Link
            href="/roadmap"
            className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
          >
            ロードマップを見る →
          </Link>
        </div>
      </div>
    </div>
  );
}

interface UpcomingReleaseItemProps {
  release: {
    version: string;
    expectedDate: string;
    features: string[];
    status: 'planning' | 'development' | 'testing' | 'review';
  };
  isFirst: boolean;
}

function UpcomingReleaseItem({ release, isFirst }: UpcomingReleaseItemProps) {
  const statusConfig = {
    planning: {
      label: '計画中',
      color: 'bg-muted text-muted-foreground',
      icon: Clipboard,
      progress: 10,
    },
    development: {
      label: '開発中',
      color: 'bg-muted text-info border border-info',
      icon: Wrench,
      progress: 50,
    },
    testing: {
      label: 'テスト中',
      color: 'bg-muted text-warning border border-warning',
      icon: TestTube,
      progress: 80,
    },
    review: {
      label: 'レビュー中',
      color: 'bg-muted text-primary border border-primary',
      icon: Eye,
      progress: 90,
    },
  };

  const config = statusConfig[release.status];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isOverdue = new Date(release.expectedDate) < new Date();

  return (
    <div className={`p-6 ${isFirst ? 'bg-muted' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        {/* Left Side */}
        <div className="min-w-0 flex-1">
          {/* Version and Status */}
          <div className="mb-3 flex items-center gap-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                isFirst ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {release.version}
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${config.color}`}
            >
              <config.icon className="h-3 w-3" />
              {config.label}
            </span>

            {isFirst && (
              <span className="bg-muted text-success border-success inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                <span className="bg-success mr-2 h-2 w-2 rounded-full"></span>
                Next Release
              </span>
            )}
          </div>

          {/* Expected Date */}
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span
              className={`text-sm ${isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}`}
            >
              予定日: {formatDate(release.expectedDate)}
              {isOverdue && ' (予定より遅れています)'}
            </span>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-foreground mb-2 text-sm font-medium">主な新機能</h4>
            <ul className="space-y-1">
              {release.features.map((feature, index) => (
                <li key={index} className="text-muted-foreground flex items-start gap-2 text-sm">
                  <span className="bg-muted-foreground mt-2 h-2 w-2 flex-shrink-0 rounded-full"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Progress */}
        <div className="w-24 flex-shrink-0">
          <div className="text-center">
            <div className="text-foreground mb-1 text-2xl font-bold">{config.progress}%</div>

            {/* Progress Bar */}
            <div className="bg-muted mb-2 h-2 w-full rounded-full">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  config.progress >= 80
                    ? 'bg-success'
                    : config.progress >= 50
                      ? 'bg-warning'
                      : 'bg-muted-foreground'
                }`}
                style={{ width: `${config.progress}%` }}
              ></div>
            </div>

            <div className="text-muted-foreground text-xs">進捗</div>
          </div>
        </div>
      </div>

      {/* Additional Info for First Item */}
      {isFirst && (
        <div className="border-border mt-4 border-t pt-4">
          <div className="text-primary flex items-center gap-2 text-sm">
            <Info className="h-4 w-4" />
            このリリースの詳細は開発ブログで随時更新されます
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for sidebar
export function UpcomingReleasesCompact({ upcomingReleases = [] }: UpcomingReleasesProps = {}) {
  const nextRelease = upcomingReleases[0];
  if (!nextRelease) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="border-primary from-state-active to-state-active rounded-xl border bg-gradient-to-br p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-lg">
          <Clock className="text-primary-foreground h-3 w-3" />
        </div>
        <h4 className="text-foreground text-sm font-semibold">次期リリース</h4>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-primary text-lg font-bold">{nextRelease.version}</span>
          <span className="text-muted-foreground text-xs">
            {formatDate(nextRelease.expectedDate)}
          </span>
        </div>

        <div className="text-muted-foreground text-sm">
          {nextRelease.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-start gap-1">
              <span className="bg-muted-foreground mt-2 h-1 w-1 flex-shrink-0 rounded-full"></span>
              <span className="text-xs">{feature}</span>
            </div>
          ))}
          {nextRelease.features.length > 2 && (
            <div className="text-primary mt-1 text-xs">
              +{nextRelease.features.length - 2} more features
            </div>
          )}
        </div>

        <Link
          href="/releases"
          className="text-primary hover:text-primary-hover mt-2 inline-flex items-center text-xs font-medium"
        >
          詳細を見る
          <ChevronRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

// Release Timeline Component
export function ReleaseTimeline() {
  return (
    <div className="border-border bg-card rounded-xl border p-6">
      <h3 className="text-foreground mb-6 text-lg font-semibold">リリースタイムライン</h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="bg-border absolute top-0 bottom-0 left-6 w-1"></div>

        <div className="space-y-8">
          {/* Current Release */}
          <div className="relative flex items-start gap-4">
            <div className="border-background bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 shadow-sm">
              <Check className="text-success h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-foreground text-sm font-semibold">v2.1.0</span>
                <span className="text-success text-xs font-medium">リリース済み</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Advanced Analytics & Team Collaboration
              </p>
              <p className="text-muted-foreground/70 mt-1 text-xs">2024年1月15日</p>
            </div>
          </div>

          {/* Upcoming Releases */}
          <div className="relative flex items-start gap-4">
            <div className="border-background bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 shadow-sm">
              <Clock className="text-info h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-foreground text-sm font-semibold">v2.2.0</span>
                <span className="text-info text-xs font-medium">開発中</span>
              </div>
              <p className="text-muted-foreground text-sm">
                AI-Powered Insights & Mobile Enhancements
              </p>
              <p className="text-muted-foreground/70 mt-1 text-xs">予定: 2024年2月15日</p>
            </div>
          </div>

          <div className="relative flex items-start gap-4">
            <div className="border-background bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 shadow-sm">
              <Clipboard className="text-muted-foreground h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-foreground text-sm font-semibold">v2.3.0</span>
                <span className="text-muted-foreground text-xs font-medium">計画中</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Advanced Security & Enterprise Features
              </p>
              <p className="text-muted-foreground/70 mt-1 text-xs">予定: 2024年3月20日</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
