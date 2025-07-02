import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Dispatch, forwardRef, ReactElement, Ref, SetStateAction } from 'react'
import { TripEvent } from '@/lib/types'
import Dialog from '@mui/material/Dialog'
import Zoom from '@mui/material/Zoom'
import { TransitionProps } from '@mui/material/transitions'
import dayjs from 'dayjs'
import { dateFormatter } from '@/lib/utils/dateFormatter'

interface ActiveEventProps {
  activeEvent: TripEvent | null
  setActiveEvent: Dispatch<SetStateAction<TripEvent | null>>
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />
})

export default function ActiveEvent({ activeEvent, setActiveEvent }: ActiveEventProps) {
  const startTime = dayjs(activeEvent?.startTime).format('h:mm A')
  const endTime = dayjs(activeEvent?.endTime).format('h:mm A')

  const endsOnDifferentDay = dayjs(activeEvent?.endTime).isAfter(activeEvent?.startTime, 'day')

  return (
    <Dialog
      slots={{ transition: Transition }}
      open={!!activeEvent}
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
            backgroundColor: activeEvent?.color
          }
        }
      }}
      onClose={() => setActiveEvent(null)}>
      <IconButton
        sx={{ position: 'absolute', right: 8, top: 8 }}
        onClick={() => setActiveEvent(null)}>
        <CloseRoundedIcon />
      </IconButton>
      <div className="m-12">
        <div className="font-bold text-2xl">{activeEvent?.name}</div>
        <div>{dateFormatter.format(activeEvent?.startTime)}</div>
        <div>
          {startTime}
          {activeEvent?.endTime ? <> - {endTime}</> : null}
          {endsOnDifferentDay ? <> (Next day)</> : null}
        </div>

        <div className="font-bold">{activeEvent?.location}</div>
        <div className="mt-8">{activeEvent?.description}</div>
      </div>
    </Dialog>
  )
}
