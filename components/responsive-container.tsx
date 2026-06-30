interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: ResponsiveContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function ModuleContainer({ children, className = "" }: ResponsiveContainerProps) {
  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function FormContainer({ children, className = "" }: ResponsiveContainerProps) {
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {children}
    </div>
  );
}
