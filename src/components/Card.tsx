interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, padding = 'md', className = '', ...props }: CardProps) {
  const baseStyles = 'bg-white rounded-xl border border-gray-200 shadow-sm';
  
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`${baseStyles} ${paddingStyles[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
}
