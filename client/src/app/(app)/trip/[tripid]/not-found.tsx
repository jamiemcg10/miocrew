import NoLuggageTwoToneIcon from '@mui/icons-material/NoLuggageTwoTone'
import Button from '@mui/material/Button'

export default function NotFound() {
  return (
    <div className="flex flex-col p-16 space-y-4" style={{ alignItems: 'center' }}>
      <div className="text-3xl">{"Sorry, we can't find that trip"}</div>
      <NoLuggageTwoToneIcon sx={{ fontSize: 120 }} />
      <Button href="dashboard" sx={{ width: 'fit-content' }}>
        Return to Dashboard
      </Button>
    </div>
  )
}
