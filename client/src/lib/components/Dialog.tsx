import _Dialog from '@mui/material/Dialog'
import { Dispatch, forwardRef, ReactElement, ReactNode, Ref, SetStateAction } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Zoom from '@mui/material/Zoom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

interface DialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />
})

export default function Dialog({ open, setOpen, children }: DialogProps) {
  function onClose() {
    setOpen(false)
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <_Dialog
      open={open}
      fullScreen={fullScreen}
      slots={{ transition: Transition }}
      slotProps={{
        paper: { sx: { '@media (min-width: 560px)': { width: '50%' } } }
      }}
      onClose={onClose}>
      <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={onClose}>
        <CloseRoundedIcon />
      </IconButton>
      {children}
    </_Dialog>
  )
}
