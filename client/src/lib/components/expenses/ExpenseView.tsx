import { Expense } from '@/lib/types'
import Popup from '../Popup'

interface ExpenseViewProps {
  activeExpense: Expense | null
  onClose: () => void
}

export default function ExpenseView({ activeExpense, onClose }: ExpenseViewProps) {
  return (
    <Popup open={!!activeExpense} onClose={() => onClose()}>
      <>
        <div className="flex text-2xl items-center space-x-2">{activeExpense?.name}</div>
        Expense
      </>
    </Popup>
  )
}
