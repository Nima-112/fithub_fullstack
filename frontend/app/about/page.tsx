'use client';

import { Section, SectionHeader } from '../components/ui/Section';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
    const stats = [
        { label: 'Active Members', value: '10,000+', icon: Users },
        { label: 'Products', value: '265+', icon: Award },
        { label: 'Success Stories', value: '500+', icon: TrendingUp },
        { label: 'Years Experience', value: '5+', icon: Target },
    ];

    const values = [
        {
            icon: '💪',
            title: 'Quality First',
            description: 'We partner with trusted brands like KALENJI, KIPRUN, and DOMYOS to bring you premium fitness equipment'
        },
        {
            icon: '🎯',
            title: 'Your Success',
            description: 'Your fitness journey is our mission. We provide personalized coaching and support every step of the way'
        },
        {
            icon: '🤝',
            title: 'Community Driven',
            description: 'Join a thriving community of fitness enthusiasts who motivate and inspire each other'
        },
        {
            icon: '🚀',
            title: 'Innovation',
            description: 'Leveraging technology and ML to provide personalized product recommendations and workout plans'
        }
    ];

    const team = [
        {
            name: 'Rassil',
            role: 'Founder & CEO',
            image: 'https://ui-avatars.com/api/?name=Rassil&background=39FF14&color=0A0E27&size=200',
            bio: 'Passionate about fitness and technology'
        },
        {
            name: 'Team Member',
            role: 'Head of Coaching',
            image: 'https://ui-avatars.com/api/?name=Coach&background=00D9FF&color=0A0E27&size=200',
            bio: 'Certified fitness expert with 10+ years experience'
        },
        {
            name: 'Team Member',
            role: 'Product Manager',
            image: 'https://ui-avatars.com/api/?name=Product&background=FF6B35&color=ffffff&size=200',
            bio: 'Curating the best fitness equipment for you'
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <Section variant="dark" containerSize="lg">
                <div className="text-center max-w-4xl mx-auto py-12">
                    <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6">
                        <span className="bg-gradient-to-r from-primary-neon via-secondary-electric to-accent-orange bg-clip-text text-transparent">
                            About FitHub
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-dark-text-secondary mb-8">
                        Empowering your fitness journey with premium equipment and expert coaching since 2019
                    </p>
                </div>
            </Section>

            {/* Stats Section */}
            <Section variant="gradient">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <stat.icon className="w-12 h-12 text-primary-neon mx-auto mb-4" />
                            <div className="font-display font-bold text-4xl text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-dark-text-secondary">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Mission Section */}
            <Section variant="default">
                <SectionHeader
                    accent="Our"
                    title="Mission"
                    subtitle="Transforming lives through fitness"
                />
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-dark-text-secondary mb-6">
                        At FitHub, we believe that everyone deserves access to quality fitness equipment and expert guidance.
                        Our mission is to make fitness accessible, enjoyable, and effective for people of all levels.
                    </p>
                    <p className="text-lg text-dark-text-secondary">
                        We combine cutting-edge technology with human expertise to provide personalized recommendations,
                        coaching plans, and a supportive community that helps you reach your goals.
                    </p>
                </div>
            </Section>

            {/* Values Section */}
            <Section variant="dark">
                <SectionHeader
                    accent="Our"
                    title="Values"
                    subtitle="What drives us every day"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="bg-dark-bg-secondary rounded-2xl p-6 border border-dark-border hover:border-primary-neon transition-all duration-300 text-center"
                        >
                            <div className="text-5xl mb-4">{value.icon}</div>
                            <h3 className="font-display font-bold text-xl mb-3 text-white">
                                {value.title}
                            </h3>
                            <p className="text-dark-text-secondary text-sm">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Team Section */}
            <Section variant="default">
                <SectionHeader
                    accent="Meet The"
                    title="Team"
                    subtitle="Passionate people behind FitHub"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-dark-bg-tertiary rounded-2xl p-6 border border-dark-border hover:border-primary-neon transition-all duration-300 text-center"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-display font-bold text-xl mb-1 text-white">
                                {member.name}
                            </h3>
                            <p className="text-primary-neon text-sm mb-3">{member.role}</p>
                            <p className="text-dark-text-secondary text-sm">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Story Section */}
            <Section variant="gradient">
                <SectionHeader
                    accent="Our"
                    title="Story"
                    subtitle="How FitHub was born"
                />
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-6 text-dark-text-secondary">
                        <p className="text-lg">
                            FitHub started in 2019 with a simple idea: make quality fitness equipment and expert coaching
                            accessible to everyone. Our founder, passionate about both fitness and technology, noticed that
                            many people struggled to find the right equipment and guidance for their fitness journey.
                        </p>
                        <p className="text-lg">
                            We partnered with leading brands like Decathlon, KALENJI, and KIPRUN to curate a selection of
                            premium equipment. But we didn't stop there – we built a platform that uses machine learning
                            to provide personalized product recommendations based on your goals and preferences.
                        </p>
                        <p className="text-lg">
                            Today, FitHub serves thousands of fitness enthusiasts with our e-commerce platform and
                            personalized coaching services. We're proud to be part of your fitness transformation!
                        </p>
                    </div>
                </div>
            </Section>
        </>
    );
}
