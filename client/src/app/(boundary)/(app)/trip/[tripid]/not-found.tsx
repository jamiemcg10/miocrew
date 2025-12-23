import { itemsCenterSx, wFitSx } from '@/lib/styles/sx'
import NoLuggageTwoToneIcon from '@mui/icons-material/NoLuggageTwoTone'
import Button from '@mui/material/Button'

const iconSx = { fontSize: 120 }

export default function NotFound() {
  return (
    <div className="flex flex-col p-16 space-y-4" style={itemsCenterSx}>
      <div className="text-3xl">{"Sorry, we can't find that trip"}</div>
      <NoLuggageTwoToneIcon sx={iconSx} />
      <Button href="/dashboard" sx={wFitSx}>
        Return to Dashboard
      </Button>
    </div>
  )
}
