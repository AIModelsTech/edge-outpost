import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="border-t border-aim-200 bg-white">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <Logo height={26} />
                            <span className="h-4 w-px bg-aim-200" />
                            <span className="text-base font-semibold tracking-tight text-aim-900">
                                EdgeForge
                            </span>
                        </div>
                        <p className="mt-2.5 max-w-md text-sm text-aim-500">
                            Weather-resistant NEMA 4X Edge AI systems by AIModels Tech Inc.
                            Engineered in Greater Vancouver, BC, Canada.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-aim-600">
                        <a href="#configurator" className="transition hover:text-aim-900">
                            Configurator
                        </a>
                        <a href="#sectors" className="transition hover:text-aim-900">
                            Sectors
                        </a>
                        <a href="#capabilities" className="transition hover:text-aim-900">
                            Capabilities
                        </a>
                        <a href="mailto:contact@aimodels.ca" className="transition hover:text-aim-900">
                            contact@aimodels.ca
                        </a>
                        <a
                            href="https://aimodels.ca"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-aim-900"
                        >
                            aimodels.ca ↗
                        </a>
                    </div>
                </div>

                <div className="mt-8 border-t border-aim-100 pt-6 text-xs text-aim-400">
                    © {new Date().getFullYear()} AIModels Tech Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
