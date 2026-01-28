import React from 'react';
import { cn } from '@/app/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}) => {
    const baseStyles = 'font-display font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-neon text-dark-bg-primary shadow-neon-md hover:shadow-neon-lg transform hover:scale-105',
        secondary: 'bg-transparent border-2 border-secondary-electric text-secondary-electric hover:bg-secondary-electric hover:text-dark-bg-primary',
        ghost: 'bg-transparent text-dark-text-primary hover:bg-dark-bg-tertiary',
        accent: 'bg-accent-orange text-white shadow-lg hover:shadow-xl transform hover:scale-105'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-8 py-4 text-lg',
        lg: 'px-10 py-5 text-xl'
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};
