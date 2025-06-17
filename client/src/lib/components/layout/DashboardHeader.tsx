export default function DashboardHeader() {
  // stub data
  const name = 'Jamie' // from user
  const bgColor = 'orangered' // from user
  const n = 4
  //

  return (
    <div className="flex justify-around py-4 items-end bg-[#ffffff2b]">
      <div className="flex items-end space-x-4 sm:space-x-8">
        <div
          className="flex items-center justify-center rounded-full w-12 h-12 border-4 border-white text-2xl"
          style={{ backgroundColor: bgColor }}>
          J
        </div>
        <span className="font-bold">Hi, {name}!</span>
      </div>
      <span>You have {n} upcoming trips!</span>
    </div>
  )
}
