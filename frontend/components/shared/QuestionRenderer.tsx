'use client'

interface QuestionRendererProps {
  content: string
  className?: string
}

export function QuestionRenderer({ content, className = '' }: QuestionRendererProps) {
  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return (
      <div
        className={`prose prose-sm max-w-none ${className}`}
        dangerouslySetInnerHTML={{
          __html: text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br/>'),
        }}
      />
    )
  }

  return renderContent(content)
}
