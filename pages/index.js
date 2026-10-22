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

    const handleApplySectorPreset = (sectorId, shouldScrollToBuilder = false) => {
        const targetSector = SECTORS.find((s) => s.id === sectorId);
        if (!targetSector) return;

        setConfig({
            sector: targetSector.id,
            ...targetSector.preset,
        });

        if (shouldScrollToBuilder && typeof window !== 'undefined') {
            const el = document.getElementById('configurator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleProceedToContact = () => {
        if (typeof window !== 'undefined') {
            const el = document.getElementById('inquire');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            {/* ================= CLEAN HERO SECTION ================= */}
            <section className="border-b border-aim-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-semibold tracking-tight text-aim-900 sm:text-5xl lg:text-6xl">
                            Rugged Edge AI enclosures, built for the field.
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-aim-600">
                            EdgeForge combines NEMA 4X / IP67 weather-sealed housings, conduction-cooled AI compute,
                            PoE++ vision ports, 5G and satellite connectivity, and hybrid LiFePO4/solar power in a
                            single deployable system.
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

                    {/* Clean 4-Stat Strip */}
                    <div className="mt-16 grid grid-cols-2 gap-8 border-t border-aim-200 pt-10 sm:grid-cols-4">
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-aim-900">NEMA 4X / IP67</p>
                            <p className="mt-1 text-sm text-aim-500">Weather &amp; washdown sealed</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-aim-900">Up to 550 TOPS</p>
                            <p className="mt-1 text-sm text-aim-500">On-device AI inference</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-aim-900">5G + Satellite</p>
                            <p className="mt-1 text-sm text-aim-500">Redundant remote backhaul</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-aim-900">-40°C to +75°C</p>
                            <p className="mt-1 text-sm text-aim-500">Heated LiFePO4 &amp; solar ready</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= INTERACTIVE CONFIGURATOR SECTION ================= */}
            <section id="configurator" className="scroll-mt-20 py-20 sm:py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-aim-900">
                            Configure your enclosure
                        </h2>
                        <p className="mt-3 text-base text-aim-600">
                            Start from a sector preset or select your compute, camera ports, backhaul, and power modules.
                        </p>
                    </div>

                    <div className="mt-10">
                        <EnclosureConfigurator
                            config={config}
                            onChangeConfig={setConfig}
                            onApplySectorPreset={(secId) => handleApplySectorPreset(secId, false)}
                            onProceedToContact={handleProceedToContact}
                        />
                    </div>
                </div>
            </section>

            {/* ================= SECTORS SECTION ================= */}
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
                            Select any sector to load its recommended hardware baseline in the configurator.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {SECTORS.map((sec) => {
                            const isCurrent = config.sector === sec.id;
                            return (
                                <button
                                    key={sec.id}
                                    type="button"
                                    onClick={() => handleApplySectorPreset(sec.id, true)}
                                    className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition ${
                                        isCurrent
                                            ? 'border-aim-900 bg-aim-50/70 ring-1 ring-aim-900'
                                            : 'border-aim-200 bg-white hover:border-aim-300'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-base font-semibold text-aim-900">
                                                {sec.name}
                                            </h3>
                                            {isCurrent && (
                                                <span className="h-2 w-2 rounded-full bg-aim-900" />
                                            )}
                                        </div>
                                        <p className="mt-2 text-xs leading-relaxed text-aim-600">
                                            {sec.summary}
                                        </p>
                                    </div>
                                    <span className="mt-4 inline-block text-xs font-medium text-aim-900">
                                        Load preset &uarr;
                                    </span>
                                </button>
                            );
                        })}
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
                            onSelectSector={(secId) => handleApplySectorPreset(secId, false)}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
}
