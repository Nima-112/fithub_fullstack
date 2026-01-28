import React from 'react';
import { cn } from '@/app/lib/utils';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'gradient' | 'dark';
    containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section: React.FC<SectionProps> = ({
    children,
    className,
    variant = 'default',
    containerSize = 'lg'
}) => {
    const variants = {
        default: 'bg-dark-bg-secondary',
        gradient: 'bg-gradient-to-r from-primary-neon/10 via-secondary-electric/10 to-accent-orange/10',
        dark: 'bg-dark-bg-primary'
    };

    const containerSizes = {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1400px]',
        full: 'max-w-full'
    };

    return (
        <section className={cn('py-20', variants[variant], className)}>
            <div className={cn(containerSizes[containerSize], 'mx-auto px-4 sm:px-6 lg:px-8')}>
                {children}
            </div>
        </section>
    );
};

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    accent?: string;
    centered?: boolean;
    className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    accent,
    centered = true,
    className
}) => {
    return (
        <div className={cn(centered && 'text-center', 'mb-16', className)}>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
                {accent && <span className="text-primary-neon">{accent}</span>}{' '}
                {title}
            </h2>
            {subtitle && (
                <p className="text-dark-text-secondary text-lg max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
};
