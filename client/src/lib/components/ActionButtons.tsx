import IconButton from '@mui/material/IconButton'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'

interface ActionButtonsProps {
  onEdit: () => void
  onDelete: () => void
}

export default function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation()
          onEdit()
        }}>
        <EditRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        color="error"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}>
        <DeleteRoundedIcon fontSize="small" />
      </IconButton>
    </>
  )
}
