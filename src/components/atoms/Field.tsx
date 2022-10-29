import React from 'react'
import { Input } from 'dracula-ui'

type Type =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

interface Props {
  value: number | string
  type?: Type
  step?: number | string | undefined
  enforceStep?: boolean | undefined
  [key: string]: any
}

export const Field = ({ id, value, onChange, type, step, enforceStep, ...props }: Props) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur()
  }

  if (type === 'number') {
    // Rounding after a comma or dot is added.
    if (enforceStep && step === '1' && value !== '' && typeof value === 'number') {
      value = Math.round(value).toString()
    }
  }

  return (
    <Input
      lang="en-150"
      size="sm"
      borderSize="sm"
      onKeyDown={onKeyDown}
      onChange={onChange}
      {...props}
      id={id}
      type={type}
      step={step}
      value={value}
    />
  )
}
