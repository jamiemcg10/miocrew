import { DatePicker, DatePickerProps } from '@heroui/date-picker'

const classNames = {
  label:
    'group-focus-within:text-[#1976d2] dark:group-focus-within:text-(--lt-blue) group-data-[required=true]:after:text-inherit',
  inputWrapper:
    'border-[rgba(0,0,0,0.23)] dark:border-[rgba(255,255,255,0.23)] border-1 ' +
    'hover:border-[rgba(0,0,0,0.49)] dark:hover:border-white ' +
    'dark:focus-within:hover:border-(--lt-blue) focus-within:hover:border-[#1976d2] focus-within:hover:border-2 focus-within:border-[#1976d2] dark:focus-within:border-(--lt-blue) focus-within:border-2 ' +
    'group-data-[invalid=true]:border-danger dark:group-data-[invalid=true]:border-danger',
  segment: 'data-[invalid=true]:data-[editable=true]:data-[placeholder=true]:text-danger'
}

export default function DateInput({
  className,
  label,
  variant = 'bordered',
  size = 'md',
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  showMonthAndYearPickers = false,
  value,
  onChange,
  isDateUnavailable
}: DatePickerProps) {
  return (
    <DatePicker
      className={className}
      label={label}
      variant={variant}
      size={size}
      classNames={classNames}
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      value={value}
      onChange={onChange}
      isDateUnavailable={isDateUnavailable}
      showMonthAndYearPickers={showMonthAndYearPickers}
    />
  )
}
