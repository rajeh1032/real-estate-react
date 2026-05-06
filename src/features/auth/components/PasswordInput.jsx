import { useState } from 'react'

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

export function PasswordInput({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  showStrength = false 
}) {
  const [showPassword, setShowPassword] = useState(false)

  const getStrength = (val) => {
    let score = 0
    if (val.length >= 8) score++
    if (/[A-Z]/.test(val)) score++
    if (/[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++
    
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"]
    const widths = ["w-1/4", "w-2/4", "w-3/4", "w-full"]
    const labels = ["Weak", "Fair", "Good", "Strong"]
    const textColors = ["text-red-500", "text-orange-500", "text-yellow-500", "text-green-500"]
    
    return {
      widthClass: val.length ? widths[score - 1] || "w-[10%]" : "w-0",
      colorClass: val.length ? colors[score - 1] || "bg-red-500" : "bg-transparent",
      label: val.length ? labels[score - 1] || "Weak" : "",
      textColor: val.length ? textColors[score - 1] || "text-red-500" : "",
    }
  }

  const strength = showStrength ? getStrength(value) : null

  return (
    <div className="relative">
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-11 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
      >
        <EyeIcon open={showPassword} />
      </button>
      
      {showStrength && strength && (
        <>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${strength.colorClass} ${strength.widthClass}`}
            />
          </div>
          {strength.label && (
            <span className={`mt-1 block text-[11px] font-medium ${strength.textColor}`}>
              {strength.label}
            </span>
          )}
        </>
      )}
    </div>
  )
}
