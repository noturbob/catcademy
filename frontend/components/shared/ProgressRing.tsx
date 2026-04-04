'use client'

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  label?: string
}

export function ProgressRing({
  progress,
  size = 100,
  strokeWidth = 4,
  label,
}: ProgressRingProps) {
  const normalizedRadius = size / 2 - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <svg height={size} width={size}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#6366f1"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: 'stroke-dashoffset 0.35s ease',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className="text-center">
        <p className="text-sm font-semibold">{Math.round(progress)}%</p>
        {label && <p className="text-xs text-gray-500">{label}</p>}
      </div>
    </div>
  )
}
