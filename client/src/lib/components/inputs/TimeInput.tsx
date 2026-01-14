import { TimeInput, TimeInputProps } from '@heroui/date-input'

const classNames = {
  label:
    'group-focus-within:text-[#1976d2] dark:group-focus-within:text-(--lt-blue) group-data-[required=true]:after:text-inherit',
  inputWrapper:
    'border-[rgba(0,0,0,0.23)] dark:border-[rgba(255,255,255,0.23)] border-1 hover:border-[rgba(0,0,0,0.49)] dark:hover:border-white dark:focus-within:hover:border-(--lt-blue) focus-within:hover:border-[#1976d2] focus-within:hover:border-2 focus-within:border-[#1976d2] dark:focus-within:border-(--lt-blue) focus-within:border-2'
}

export default function _TimeInput({
  className,
  label,
  variant = 'bordered',
  value,
  onChange
}: TimeInputProps) {
  return (
    <TimeInput
      className={className}
      label={label}
      variant={variant}
      classNames={classNames}
      value={value}
      onChange={onChange}
    />
  )
}
