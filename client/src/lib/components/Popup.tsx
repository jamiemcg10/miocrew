import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { forwardRef, ReactElement, ReactNode, Ref } from 'react'
import Dialog from '@mui/material/Dialog'
import Zoom from '@mui/material/Zoom'
import { TransitionProps } from '@mui/material/transitions'

interface PopupProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  backgroundColor?: string
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />
})

export default function Popup({ open, onClose, backgroundColor, children }: PopupProps) {
  return (
    <Dialog
      slots={{ transition: Transition }}
      open={open}
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute'
      }}
      slotProps={{
        paper: {
          sx: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            maxWidth: 'none',
            ...(backgroundColor && { backgroundColor: backgroundColor })
          }
        }
      }}
      onClose={() => onClose()}>
      <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => onClose()}>
        <CloseRoundedIcon />
      </IconButton>
      <div className="m-12">{children}</div>
    </Dialog>
  )
}
