import Logo from './Logo';

const footerLinks = [
    { href: '#configurator', label: 'Interactive Configurator' },
    { href: '#sectors', label: 'Deployment Sectors' },
    { href: '#custom-skus', label: 'Custom SKUs' },
    { href: '#integration', label: 'End-to-End Integration' },
    { href: '#inquire', label: 'Project Inquiry' },
];

const mainSiteLinks = [
    { href: 'https://aimodels.ca', label: 'AIM Home (aimodels.ca)' },
    { href: 'https://aimodels.ca/services', label: 'AI & ML Services' },
    { href: 'https://aimodels.ca/gallery', label: 'Field Install Gallery' },
    { href: 'https://aimodels.ca/about', label: 'About AIModels Tech' },
    { href: 'https://aimodels.ca/contact', label: 'Direct Contact' },
];

export default function Footer() {
    return (
        <footer className="border-t border-aim-200 bg-aim-900 text-aim-300">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3">
                            <Logo height={32} light />
                            <span className="h-5 w-px bg-aim-700" />
                            <span className="text-lg font-semibold tracking-tight text-white">
                                EdgeForge
                            </span>
                        </div>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-aim-400">
                            EdgeForge is the custom ruggedized Edge AI enclosure platform by AIModels Tech Inc.
                            Engineered in Canada for weather-exposed industrial, maritime, agricultural, and
                            autonomous field deployments.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-aim-200">
                            EdgeForge Platform
                        </h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-aim-400 transition hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-aim-200">
                            AIModels Tech
                        </h3>
                        <ul className="mt-4 space-y-2">
                            {mainSiteLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-aim-400 transition hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 space-y-1 text-sm text-aim-400">
                            <p>
                                <a href="mailto:contact@aimodels.ca" className="transition hover:text-white">
                                    contact@aimodels.ca
                                </a>
                            </p>
                            <p>
                                <a href="tel:+17787894655" className="transition hover:text-white">
                                    +1 778 789 4655
                                </a>
                            </p>
                            <p className="text-xs text-aim-500">Greater Vancouver, BC, Canada</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-aim-800 pt-8 text-sm text-aim-500 sm:flex-row">
                    <p>&copy; {new Date().getFullYear()} AIModels Tech Inc. All rights reserved.</p>
                    <p>
                        <a href="https://aimodels.ca" className="transition hover:text-aim-300">
                            aimodels.ca
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
