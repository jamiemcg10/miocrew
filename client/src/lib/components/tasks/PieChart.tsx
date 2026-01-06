import { PollTaskOption } from '@/lib/types'
import { appColors } from '@/lib/utils/colors/appColors'

interface PieChartProps {
  results: PollTaskOption[]
}

export default function PieChart({ results }: PieChartProps) {
  const totalResponses = results.reduce((acc, c) => acc + (c.votes || 0), 0)
  const maxFreq = Math.max(...(results.map((r) => r.votes) as number[]))

  const mappedResults = results.map((result) => {
    return {
      ...result,
      pct: (result.votes || 0) / totalResponses
    }
  })

  const gradient: string[] = []
  let lastStop = 0
  mappedResults.forEach((result, i) => {
    const currentStop = Math.round(360 * result.pct) + lastStop
    gradient.push(`${appColors[19 - i]} ${lastStop ? lastStop + 'deg' : ''} ${currentStop}deg`)
    lastStop = currentStop
  })

  const gradientStr = `conic-gradient(${gradient.join(', ')})`

  return (
    <div className="flex flex-col grow self-center items-center sm:max-w-4/5">
      <div
        className="grow rounded-full aspect-square max-w-full mb-8"
        style={{ background: `${gradientStr}` }}></div>
      <legend className="flex flex-col sm:flex-row flex-wrap justify-center space-x-4 sm:max-w-4/5">
        {mappedResults.map((result, i) => {
          return (
            <div className="flex items-center space-x-2 shrink-0" key={i}>
              <div
                className="w-4 h-4 rounded-xs shrink-0"
                style={{ backgroundColor: appColors[19 - i] }}></div>
              <div
                className={result.votes === maxFreq ? 'font-bold' : 'font-light'}
                title={`${((result.votes || 0) / totalResponses) * 100}%`}>
                {result.label} - {Math.round(result.pct * 100)}%
              </div>
            </div>
          )
        })}
      </legend>
    </div>
  )
}
