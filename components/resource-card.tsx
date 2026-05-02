import { Resource, ResourceLang, ResourceType } from '@/lib/types'

const languageBadges: Record<ResourceLang, { color: string; label: string }> = {
  hindi: { color: '#EF4444', label: '🔴 Hindi' },
  'indian-english': { color: '#F97316', label: '🟠 Indian English' },
  english: { color: '#E5E7EB', label: '⚪ English' },
  docs: { color: '#A78BFA', label: '🟣 Docs' },
}

const resourceTypeLabels: Record<ResourceType, string> = {
  video: 'Video',
  article: 'Article',
  interactive: 'Interactive',
  documentation: 'Documentation',
}

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const langBadge = languageBadges[resource.language]

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] hover:border-[#2E2E3E] transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
              style={{ backgroundColor: langBadge.color }}
            >
              {langBadge.label}
            </span>
            <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-[#1E1E2E] text-gray-300">
              {resourceTypeLabels[resource.type]}
            </span>
          </div>
          <h4 className="font-semibold text-white truncate">{resource.title}</h4>
          {resource.duration && (
            <p className="text-xs text-gray-500 mt-1">{resource.duration}</p>
          )}
          {resource.note && (
            <p className="text-xs text-gray-400 mt-2">{resource.note}</p>
          )}
        </div>
        <span className="text-lg flex-shrink-0">↗</span>
      </div>
    </a>
  )
}
