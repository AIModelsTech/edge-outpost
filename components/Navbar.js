import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';

const navLinks = [
    { href: '#configurator', label: 'Configurator' },
    { href: '#sectors', label: 'Sectors' },
    { href: '#capabilities', label: 'Custom & Integration' },
    { href: '#inquire', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-aim-200 bg-white/90 backdrop-blur-md">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="inline-flex shrink-0 items-center gap-3">
                    <Logo height={28} />
                    <span className="h-4 w-px bg-aim-200" />
                    <span className="text-base font-semibold tracking-tight text-aim-900">
                        EdgeForge
                    </span>
                </Link>

                <ul className="hidden items-center gap-8 md:flex">
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
                            className="text-sm text-aim-500 transition hover:text-aim-900"
                        >
                            aimodels.ca ↗
                        </a>
                    </li>
                    <li>
                        <a href="#inquire" className="btn-primary !py-2 !px-4">
                            Contact Engineering
                        </a>
                    </li>
                </ul>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border border-aim-200 p-2 text-aim-700 md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {open && (
                <div className="border-t border-aim-200 bg-white px-6 py-4 md:hidden">
                    <ul className="flex flex-col gap-3.5">
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
                                className="block text-sm text-aim-500 hover:text-aim-900"
                            >
                                aimodels.ca ↗
                            </a>
                        </li>
                        <li className="pt-2">
                            <a
                                href="#inquire"
                                className="btn-primary w-full"
                                onClick={() => setOpen(false)}
                            >
                                Contact Engineering
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
