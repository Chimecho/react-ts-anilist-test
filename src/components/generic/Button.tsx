interface ButtonProps {
  children: React.ReactNode,
  disabled?: boolean,
  className?: string,
  onClick?: () => void
}

export default function Button({ children, disabled, onClick, className }: ButtonProps) {
  return (
    <button className={`flex items-center justify-center p-2 border rounded-sm w-fit ${className} ${disabled ? 'border-gray-700 opacity-70 pointer-events-none' : 'cursor-pointer hover:bg-neutral-900 border-gray-600'}`} onClick={() => onClick?.()}>
      {children}
    </button>
  )
}
