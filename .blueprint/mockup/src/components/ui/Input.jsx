import React from 'react'

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-[18px] ${className}`}>
      {label && (
        <label className="block text-caption font-semibold text-ink-2 mb-1.5 tracking-[0.01em]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full py-[11px] px-3.5 font-sans text-body-sm border-[1.5px] rounded-sm bg-white text-ink-2 outline-none transition-all duration-150
          ${error ? 'border-error/40 bg-error-soft' : 'border-border-strong'}
          focus:border-[rgba(109,103,255,0.45)] focus:shadow-[0_0_0_4px_rgba(109,103,255,0.10)]
          placeholder:text-disabled
          disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
      />
      {hint && <p className="text-[11px] text-muted mt-1.5">{hint}</p>}
      {error && <p className="text-[11px] text-error mt-1.5">{error}</p>}
    </div>
  )
}

export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  className = '',
  rows = 3,
  ...props
}) => {
  return (
    <div className={`mb-[18px] ${className}`}>
      {label && (
        <label className="block text-caption font-semibold text-ink-2 mb-1.5 tracking-[0.01em]">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full py-3.5 px-3.5 font-sans text-body-sm border-[1.5px] border-border-strong rounded-sm bg-white text-ink-2 outline-none transition-all duration-150 resize-y min-h-[80px]
          focus:border-[rgba(109,103,255,0.45)] focus:shadow-[0_0_0_4px_rgba(109,103,255,0.10)]
          placeholder:text-disabled"
        {...props}
      />
    </div>
  )
}

export const Select = ({
  label,
  options = [],
  value,
  onChange,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-[18px] ${className}`}>
      {label && (
        <label className="block text-caption font-semibold text-ink-2 mb-1.5 tracking-[0.01em]">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full py-[11px] px-3.5 pr-9 font-sans text-body-sm border-[1.5px] border-border-strong rounded-sm bg-white text-ink-2 outline-none transition-all duration-150 appearance-none
          bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201l5%205%205-5%27%20stroke=%27%23adb5bd%27%20stroke-width=%271.5%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')]
          bg-no-repeat bg-[right_12px_center] bg-[length:12px]
          focus:border-[rgba(109,103,255,0.45)] focus:shadow-[0_0_0_4px_rgba(109,103,255,0.10)]
          disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      >
        {options.map((opt) => (
          <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Input
