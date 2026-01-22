import { NumberInput, NumberInputProps } from '@heroui/number-input'

interface _NumberInputProps extends NumberInputProps {
  ariaLabel?: string
}

export default function _NumberInput({
  label,
  ariaLabel,
  size = 'md',
  hideStepper = true,
  variant = 'flat',
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  value,
  defaultValue,
  startContent,
  classNames,
  minValue,
  formatOptions,
  onValueChange,
  placeholder
}: _NumberInputProps) {
  const combinedClassNames = {
    base: classNames?.base || '',
    label:
      'group-focus-within:text-[#1976d2] dark:group-focus-within:text-(--lt-blue) group-data-[required=true]:after:text-inherit',
    inputWrapper:
      (classNames?.innerWrapper || '') +
      (variant == 'bordered' || variant == 'faded'
        ? ' border-[rgba(0,0,0,0.23)] dark:border-[rgba(255,255,255,0.23)] border-1 hover:border-[rgba(0,0,0,0.49)] dark:hover:border-white dark:focus-within:hover:border-(--lt-blue) focus-within:hover:border-[#1976d2] focus-within:hover:border-2 focus-within:border-[#1976d2] dark:focus-within:border-(--lt-blue) focus-within:border-2'
        : '')
  }

  return (
    <NumberInput
      label={label}
      aria-label={ariaLabel}
      variant={variant}
      size={size}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      minValue={minValue}
      formatOptions={formatOptions}
      startContent={startContent}
      hideStepper={hideStepper}
      classNames={combinedClassNames}
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      onValueChange={onValueChange}
    />
  )
}
