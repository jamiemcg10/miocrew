import Avatar from '@mui/material/Avatar'

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
        <Avatar
          alt={user.firstName}
          sx={{
            color: 'var(--foreground)',
            backgroundColor: user.color,
            border: '4px solid var(--foreground)',
            height: 48,
            width: 48
          }}>
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </Avatar>
        <span className="font-bold">Hi, {user.firstName}!</span>
      </div>
      <span>You have {n} upcoming trips!</span>
    </div>
  )
}
