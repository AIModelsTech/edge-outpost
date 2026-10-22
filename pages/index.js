import { useState } from 'react';
import Layout from '../components/Layout';
import EnclosureConfigurator from '../components/EnclosureConfigurator';
import ConfigContactForm from '../components/ConfigContactForm';
import { SECTORS, DEFAULT_CONFIG } from '../data/enclosureConfig';

const CAPABILITIES = [
    {
        title: 'Custom Hardware SKUs',
        description:
            'Need specialized connectors, 316L stainless marine housings, hazardous-location certification, or custom sensor boards? We engineer bespoke enclosure builds to your exact mechanical and electrical specification.',
    },
    {
        title: 'Custom AI Models & Software',
        description:
            'We train, quantize, and deploy domain-specific computer vision and sensor analytics models—paired with local operator dashboards and native PLC, SCADA, or cloud telemetry integration.',
    },
    {
        title: 'Turnkey Field Installation',
        description:
            'Our field engineering teams handle physical mounting, pole or vessel rigging, camera aiming, power tie-ins, and on-site commissioning across remote and industrial environments.',
    },
];

export default function HomePage() {
    const [config, setConfig] = useState(DEFAULT_CONFIG);

    const handleProceedToContact = () => {
        if (typeof window !== 'undefined') {
            const el = document.getElementById('inquire');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSectorChange = (sectorId) => {
        setConfig((prev) => ({
            ...prev,
            sector: sectorId,
        }));
    };

    return (
        <Layout>
            {/* ================= CLEAN HERO SECTION ================= */}
            <section className="border-b border-aim-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-7">
                            <h1 className="text-4xl font-semibold tracking-tight text-aim-900 sm:text-5xl lg:text-6xl">
                                Rugged Edge AI enclosures, built for the field.
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-aim-600">
                                EdgeForge combines NEMA 4X weather-sealed housings, conduction-cooled AI compute,
                                PoE++ and GMSL2 vision ports, 5G and satellite connectivity, and hybrid LiFePO4/solar power
                                in a single deployable system.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3.5">
                                <a href="#configurator" className="btn-primary">
                                    Configure Enclosure
                                </a>
                                <a href="#inquire" className="btn-secondary">
                                    Contact Engineering
                                </a>
                            </div>
                        </div>

                        {/* Right: Minimal Architectural Hardware Illustration */}
                        <div className="lg:col-span-5">
                            <div className="mx-auto max-w-xs sm:max-w-sm">
                                <svg
                                    viewBox="48 10 264 292"
                                    className="h-auto w-full select-none"
                                    role="img"
                                    aria-label="EdgeForge NEMA 4X Enclosure Illustration"
                                >
                                    {/* Top Antennas (5G MIMO, GNSS, Satellite) */}
                                    <rect x="96" y="14" width="10" height="34" rx="5" fill="#0f172a" />
                                    <rect x="114" y="20" width="10" height="28" rx="5" fill="#0f172a" />
                                    <path d="M 164 48 C 164 32, 196 32, 196 48 Z" fill="#0f172a" />
                                    <path d="M 218 48 L 226 28 L 266 28 L 274 48 Z" fill="#0f172a" />

                                    {/* Main NEMA 4X Sealed Chassis */}
                                    <rect
                                        x="64"
                                        y="48"
                                        width="232"
                                        height="224"
                                        rx="16"
                                        fill="#ffffff"
                                        stroke="#0f172a"
                                        strokeWidth="2.25"
                                    />

                                    {/* Recessed Door Perimeter */}
                                    <rect
                                        x="76"
                                        y="60"
                                        width="208"
                                        height="200"
                                        rx="10"
                                        fill="#f8fafc"
                                        stroke="#cbd5e1"
                                        strokeWidth="1.25"
                                    />

                                    {/* Left Heavy-Duty Hinges */}
                                    <rect x="58" y="84" width="6" height="26" rx="2.5" fill="#475569" />
                                    <rect x="58" y="210" width="6" height="26" rx="2.5" fill="#475569" />

                                    {/* Right Quarter-Turn Latches */}
                                    <rect x="296" y="106" width="5" height="22" rx="2" fill="#475569" />
                                    <rect x="296" y="192" width="5" height="22" rx="2" fill="#475569" />

                                    {/* Upper Internal Rail Silhouette */}
                                    <line x1="88" y1="114" x2="272" y2="114" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
                                    <rect x="92" y="76" width="76" height="68" rx="7" fill="#0f172a" />
                                    <rect x="102" y="90" width="36" height="6" rx="3" fill="#38bdf8" />
                                    <rect x="102" y="102" width="52" height="5" rx="2.5" fill="#475569" />
                                    <rect x="102" y="120" width="28" height="12" rx="3" fill="#1e293b" />

                                    <rect x="176" y="76" width="52" height="68" rx="7" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                                    <rect x="186" y="90" width="28" height="5" rx="2.5" fill="#0f172a" />
                                    <rect x="186" y="102" width="32" height="4" rx="2" fill="#94a3b8" />
                                    <g transform="translate(186, 120)">
                                        <rect x="0" y="0" width="6" height="8" rx="1.5" fill="#0f172a" />
                                        <rect x="9" y="0" width="6" height="8" rx="1.5" fill="#0f172a" />
                                        <rect x="18" y="0" width="6" height="8" rx="1.5" fill="#0f172a" />
                                        <rect x="27" y="0" width="6" height="8" rx="1.5" fill="#0f172a" />
                                    </g>

                                    <rect x="236" y="76" width="32" height="68" rx="7" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                                    <circle cx="252" cy="96" r="3" fill="#10b981" />
                                    <circle cx="252" cy="110" r="3" fill="#0284c7" />
                                    <circle cx="252" cy="124" r="3" fill="#0f172a" />

                                    {/* Lower Internal Rail Silhouette */}
                                    <line x1="88" y1="204" x2="272" y2="204" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
                                    <rect x="92" y="164" width="58" height="68" rx="7" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                                    <rect x="102" y="178" width="34" height="5" rx="2.5" fill="#0f172a" />
                                    <rect x="102" y="190" width="24" height="4" rx="2" fill="#94a3b8" />
                                    <rect x="102" y="206" width="16" height="12" rx="2" fill="#0f172a" />
                                    <rect x="122" y="206" width="16" height="12" rx="2" fill="#0f172a" />

                                    <rect x="158" y="164" width="110" height="68" rx="7" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                                    <rect x="168" y="176" width="42" height="20" rx="4" fill="#0f172a" />
                                    <rect x="216" y="176" width="42" height="20" rx="4" fill="#0f172a" />
                                    <rect x="168" y="202" width="42" height="20" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                                    <rect x="216" y="202" width="42" height="20" rx="4" fill="#0f172a" />

                                    {/* Bottom Sealed Gland Ports */}
                                    <g transform="translate(102, 272)">
                                        <rect x="0" y="0" width="8" height="14" rx="2" fill="#0f172a" />
                                        <rect x="14" y="0" width="8" height="14" rx="2" fill="#0f172a" />
                                        <rect x="28" y="0" width="8" height="14" rx="2" fill="#0f172a" />
                                        <rect x="42" y="0" width="8" height="14" rx="2" fill="#0f172a" />
                                        <rect x="68" y="0" width="10" height="14" rx="2" fill="#334155" />
                                        <rect x="84" y="0" width="10" height="14" rx="2" fill="#334155" />
                                        <rect x="112" y="0" width="10" height="14" rx="2" fill="#475569" />
                                        <rect x="128" y="0" width="10" height="14" rx="2" fill="#475569" />
                                        <rect x="144" y="0" width="10" height="14" rx="2" fill="#475569" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Clean 4-Stat Strip */}
                    <div className="mt-16 grid grid-cols-2 gap-8 border-t border-aim-200 pt-10 sm:grid-cols-4">
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-aim-900">NEMA 4X</p>
                            <p className="mt-1 text-sm text-aim-500">Weather &amp; washdown sealed</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-aim-900">2,000+ TOPS</p>
                            <p className="mt-1 text-sm text-aim-500">Scalable edge AI compute</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-aim-900">5G + Satellite</p>
                            <p className="mt-1 text-sm text-aim-500">Redundant remote backhaul</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-aim-900">-30°C to +50°C</p>
                            <p className="mt-1 text-sm text-aim-500">With optional heating for lower temperature operation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= INTERACTIVE CONFIGURATOR SECTION ================= */}
            <section id="configurator" className="scroll-mt-20 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-aim-900">
                            Configure your enclosure
                        </h2>
                        <p className="mt-3 text-base text-aim-600">
                            Select your compute, camera interfaces, industrial I/O, connectivity, and power modules.
                        </p>
                    </div>

                    <div className="mt-10">
                        <EnclosureConfigurator
                            config={config}
                            onChangeConfig={setConfig}
                            onProceedToContact={handleProceedToContact}
                        />
                    </div>
                </div>
            </section>

            {/* ================= SECTORS SECTION (INFORMATIONAL) ================= */}
            <section
                id="sectors"
                className="scroll-mt-20 border-y border-aim-200 bg-white py-20 sm:py-24"
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-aim-900">
                            Deployment sectors
                        </h2>
                        <p className="mt-3 text-base text-aim-600">
                            Engineered for continuous operation across harsh outdoor, mobile, and industrial environments.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {SECTORS.map((sec) => (
                            <div
                                key={sec.id}
                                className="rounded-2xl border border-aim-200 bg-white p-5"
                            >
                                <h3 className="text-base font-semibold text-aim-900">
                                    {sec.name}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-aim-600">
                                    {sec.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CUSTOM SKUS & INTEGRATION SECTION ================= */}
            <section
                id="capabilities"
                className="scroll-mt-20 border-b border-aim-200 bg-aim-50 py-20 sm:py-24"
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-aim-900">
                            Custom SKUs &amp; end-to-end delivery
                        </h2>
                        <p className="mt-3 text-base text-aim-600">
                            Beyond standard modular configurations, AIModels Tech engineers custom hardware and delivers complete field-ready AI applications.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {CAPABILITIES.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-aim-200 bg-white p-6"
                            >
                                <h3 className="text-base font-semibold text-aim-900">
                                    {item.title}
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-aim-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CONTACT / INQUIRY SECTION ================= */}
            <section id="inquire" className="scroll-mt-20 bg-white py-20 sm:py-24">
                <div className="mx-auto max-w-3xl px-6">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-aim-900">
                            Contact engineering
                        </h2>
                        <p className="mt-2 text-base text-aim-600">
                            Send your selected configuration and project notes for a technical review and quote.
                        </p>
                    </div>

                    <div className="mt-8 rounded-2xl border border-aim-200 bg-white p-6 shadow-sm sm:p-8">
                        <ConfigContactForm
                            config={config}
                            onSelectSector={handleSectorChange}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
}
