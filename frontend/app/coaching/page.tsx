'use client';

import { Section, SectionHeader } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Check, Dumbbell, Users, TrendingUp } from 'lucide-react';

export default function CoachingPage() {
    const plans = [
        {
            name: 'Basic',
            price: 299,
            period: 'month',
            description: 'Perfect for beginners starting their fitness journey',
            features: [
                '3 personalized workouts per week',
                'Basic nutrition guidelines',
                'Email support',
                'Progress tracking',
                'Mobile app access'
            ],
            highlighted: false
        },
        {
            name: 'Pro',
            price: 599,
            period: 'month',
            description: 'For serious athletes ready to transform',
            features: [
                '5 personalized workouts per week',
                'Custom meal plans',
                'Priority email & chat support',
                'Weekly progress reviews',
                'Video form checks',
                'Supplement recommendations',
                'Mobile app access'
            ],
            highlighted: true
        },
        {
            name: 'Elite',
            price: 999,
            period: 'month',
            description: 'Ultimate coaching experience with 1-on-1 support',
            features: [
                'Daily personalized workouts',
                'Fully customized meal plans',
                '24/7 coach access',
                'Bi-weekly video calls',
                'Advanced analytics',
                'Supplement stack',
                'Private community access',
                'Mobile app access'
            ],
            highlighted: false
        }
    ];

    const coaches = [
        {
            name: 'Sarah Martinez',
            specialty: 'Strength & Conditioning',
            experience: '8 years',
            clients: '200+',
            image: 'https://ui-avatars.com/api/?name=Sarah+Martinez&background=39FF14&color=0A0E27&size=200'
        },
        {
            name: 'Michael Chen',
            specialty: 'Weight Loss & Nutrition',
            experience: '10 years',
            clients: '350+',
            image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=00D9FF&color=0A0E27&size=200'
        },
        {
            name: 'Emma Johnson',
            specialty: 'Athletic Performance',
            experience: '6 years',
            clients: '150+',
            image: 'https://ui-avatars.com/api/?name=Emma+Johnson&background=FF6B35&color=ffffff&size=200'
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <Section variant="dark" containerSize="lg">
                <div className="text-center max-w-4xl mx-auto py-12">
                    <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6">
                        <span className="bg-gradient-to-r from-primary-neon via-secondary-electric to-accent-orange bg-clip-text text-transparent">
                            Expert Coaching
                        </span>
                        <br />
                        <span className="text-white">Transformative Results</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-dark-text-secondary mb-8">
                        Personalized fitness and nutrition coaching to help you reach your goals faster
                    </p>
                </div>
            </Section>

            {/* Plans Section */}
            <Section variant="default">
                <SectionHeader
                    accent="Choose"
                    title="Your Plan"
                    subtitle="Flexible coaching options tailored to your needs"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-dark-bg-tertiary rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-2 ${plan.highlighted
                                    ? 'border-primary-neon shadow-neon-lg'
                                    : 'border-dark-border hover:border-secondary-electric'
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-neon text-dark-bg-primary font-bold text-sm rounded-full">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                                <p className="text-dark-text-secondary text-sm mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className="font-display font-bold text-4xl text-primary-neon">
                                        {plan.price} MAD
                                    </span>
                                    <span className="text-dark-text-secondary">/ {plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-primary-neon flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-dark-text-primary">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.highlighted ? 'primary' : 'secondary'}
                                size="md"
                                className="w-full"
                            >
                                Get Started
                            </Button>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Coaches Section */}
            <Section variant="gradient">
                <SectionHeader
                    accent="Meet Your"
                    title="Coaches"
                    subtitle="Certified professionals dedicated to your success"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {coaches.map((coach) => (
                        <div
                            key={coach.name}
                            className="bg-dark-bg-secondary rounded-2xl p-6 border border-dark-border hover:border-primary-neon transition-all duration-300"
                        >
                            <img
                                src={coach.image}
                                alt={coach.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <div className="text-center">
                                <h3 className="font-display font-bold text-xl mb-1">{coach.name}</h3>
                                <p className="text-primary-neon text-sm mb-2">{coach.specialty}</p>
                                <div className="flex justify-center gap-4 text-sm text-dark-text-secondary">
                                    <span>🎓 {coach.experience}</span>
                                    <span>👥 {coach.clients}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Features Section */}
            <Section variant="dark">
                <SectionHeader
                    accent="What You"
                    title="Get"
                    subtitle="Everything you need to succeed"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Dumbbell,
                            title: 'Custom Workouts',
                            description: 'Personalized training programs tailored to your goals, fitness level, and available equipment'
                        },
                        {
                            icon: Users,
                            title: 'Expert Support',
                            description: 'Direct access to certified coaches who guide you every step of the way'
                        },
                        {
                            icon: TrendingUp,
                            title: 'Track Progress',
                            description: 'Advanced analytics and regular check-ins to monitor your transformation journey'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-dark-bg-secondary rounded-2xl p-8 border border-dark-border text-center hover:border-primary-neon transition-all duration-300"
                        >
                            <feature.icon className="w-12 h-12 text-primary-neon mx-auto mb-4" />
                            <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
                            <p className="text-dark-text-secondary">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* CTA Section */}
            <Section variant="gradient">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
                        Ready to Transform?
                    </h2>
                    <p className="text-xl text-dark-text-secondary mb-8">
                        Join hundreds of satisfied clients who have achieved their fitness goals with FitHub coaching
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="accent" size="lg">
                            Start Free Trial
                        </Button>
                        <Button variant="secondary" size="lg">
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </Section>
        </>
    );
}
