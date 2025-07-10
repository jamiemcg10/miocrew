import { appColors } from '@/lib/utils/appColors'

export default function PieChart() {
  const results = [
    { response: 'In Napa in a hotel', frequency: 2 },
    { response: 'In Napa in an AirBnB', frequency: 4 },
    { response: 'In Sonoma in a hotel', frequency: 1 },
    { response: 'In Sonoma in an AirBnB', frequency: 3 },
    { response: "In Sacramento at Katie's house (free)", frequency: 2 }
  ]

  const totalResponses = results.reduce((acc, c) => acc + c.frequency, 0)
  const maxFreq = Math.max(...(results.map((r) => r.frequency) as number[]))

  const mappedResults = results.map((result) => {
    return {
      ...result,
      pct: result.frequency / totalResponses
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
    <div className="flex flex-col items-center sm:max-w-4/5">
      <div
        className="w-92 h-auto rounded-full aspect-square max-w-full mb-8"
        style={{ background: `${gradientStr}` }}></div>
      <legend className="flex flex-col sm:flex-row flex-wrap justify-center space-x-4 sm:max-w-4/5">
        {mappedResults.map((result, i) => {
          return (
            <div className="flex items-center space-x-2 shrink-0" key={i}>
              <div
                className="w-4 h-4 rounded-xs shrink-0"
                style={{ backgroundColor: appColors[19 - i] }}></div>
              <div
                className={result.frequency === maxFreq ? 'font-bold' : 'font-light'}
                title={`${(result.frequency / totalResponses) * 100}%`}>
                {result.response} - {Math.round(result.pct * 100)}%
              </div>
            </div>
          )
        })}
      </legend>
    </div>
  )
}
