export default function DashboardHeader() {
  // stub data
  const user = {
    firstName: 'Jamie', // from user
    lastName: 'Smart',
    color: 'orangered' // from user
  }

  const n = 4
  //

  return (
    <div className="flex justify-around py-4 items-center bg-[#cee2f5] dark:bg-white/20">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div
          className="flex items-center justify-center rounded-full w-12 h-12 border-4 border-white text-2xl"
          style={{ backgroundColor: user.color }}>
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </div>
        <span className="font-bold">Hi, {user.firstName}!</span>
      </div>
      <span>You have {n} upcoming trips!</span>
    </div>
  )
}
