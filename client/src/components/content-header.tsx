interface ContentHeaderProps {
  title: string
  subtitle: string
}

export function ContentHeader({ title, subtitle }: ContentHeaderProps) {
  return (
    <div className='mb-2 flex items-center justify-between space-y-2'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        <span className='text-sm text-gray-500 font-light'>{subtitle}</span>
      </div>
    </div>
  )
}
