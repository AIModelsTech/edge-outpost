import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';

const navLinks = [
    { href: '#configurator', label: 'Enclosure Builder' },
    { href: '#sectors', label: 'Sectors & Use Cases' },
    { href: '#custom-skus', label: 'Custom SKUs' },
    { href: '#integration', label: 'End-to-End Integration' },
    { href: '#inquire', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-aim-200/80 bg-aim-50/90 backdrop-blur-md">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="inline-flex shrink-0 items-center gap-3">
                        <Logo height={32} />
                        <span className="h-5 w-px bg-aim-300" />
                        <span className="text-base font-semibold tracking-tight text-aim-900">
                            EdgeForge
                        </span>
                    </Link>
                    <span className="hidden rounded-full border border-aim-300 bg-white px-2.5 py-0.5 font-mono text-[11px] font-medium text-aim-600 sm:inline-block">
                        NEMA 4X / IP67 Series
                    </span>
                </div>

                <ul className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm font-medium text-aim-600 transition hover:text-aim-900"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="https://aimodels.ca"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-aim-500 transition hover:text-aim-800"
                        >
                            AIM Main Site &nearr;
                        </a>
                    </li>
                    <li>
                        <a href="#inquire" className="btn-primary !py-2.5 !px-5">
                            Request Spec Review
                        </a>
                    </li>
                </ul>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border border-aim-300 p-2 text-aim-700 lg:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {open && (
                <div className="border-t border-aim-200 bg-aim-50 px-6 py-4 lg:hidden">
                    <ul className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="block text-sm font-medium text-aim-700 hover:text-aim-900"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="https://aimodels.ca"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm font-medium text-aim-500 hover:text-aim-900"
                            >
                                AIModels.ca Main Site &nearr;
                            </a>
                        </li>
                        <li>
                            <a
                                href="#inquire"
                                className="btn-primary w-full"
                                onClick={() => setOpen(false)}
                            >
                                Request Spec Review
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
