interface ButtonProps {
  children: React.ReactNode,
  disabled?: Boolean,
  onClick?: Function
}

export default function Button(props: ButtonProps) {
  const { children, disabled, onClick } = props

  return (
    <button className={`flex items-center justify-center p-2 border rounded-sm min-w-20 w-fit ${disabled ? 'border-gray-700 opacity-70 pointer-events-none' : 'cursor-pointer hover:bg-neutral-900 border-gray-600'}`} onClick={() => onClick?.()}>
      {children}
    </button>
  )
}
