import { useState } from 'react';
import Layout from '../components/Layout';
import EnclosureConfigurator from '../components/EnclosureConfigurator';
import ConfigContactForm from '../components/ConfigContactForm';
import {
    SECTORS,
    DEFAULT_CONFIG,
    resolveConfigDetails,
} from '../data/enclosureConfig';

const CUSTOM_SKU_CAPABILITIES = [
    {
        title: 'Hazardous & Extreme-Duty Housings',
        description:
            'Need beyond standard NEMA 4X / IP67? We engineer 316L electropolished marine stainless, Class I Div 2 hazardous-location purging, and MIL-STD-810H shock-isolated subframes.',
    },
    {
        title: 'Custom Bulkhead & Harness Pinouts',
        description:
            'Custom water-blocked MIL-DTL-38999 circular connectors, Deutsch DT/HD heavy equipment plugs, ISOBUS/J1939 CANbus taps, and intrinsically safe sensor barriers.',
    },
    {
        title: 'Specialized Thermal & Cold-Start Envelopes',
        description:
            'Thermostatically controlled internal silicone pad heaters for -45°C Arctic boot-up, or phase-change / thermoelectric cooling for +65°C high-solar desert and kiln environments.',
    },
    {
        title: 'Bespoke Accelerator & Sensor Payloads',
        description:
            'Integration of custom SDR (Software Defined Radio), radar/LiDAR timing synchronization (PTP/IEEE-1588), frame-grabber cards, or customer-furnished proprietary PCBs.',
    },
];

const INTEGRATION_PILLARS = [
    {
        step: '01',
        title: 'Field Installation & Physical Commissioning',
        description:
            'Our field engineering crews deploy directly to your vessels, mills, mines, farms, or highway corridors—handling mast/pole rigging, armored conduit routing, camera aiming, and power tie-ins.',
        points: [
            'Site survey, RF link-budget verification, and solar/battery autonomy sizing',
            'Turnkey mechanical mounting, waterproof cable gland termination, and grounding',
            'On-site acceptance testing and operational handoff with your maintenance teams',
        ],
    },
    {
        step: '02',
        title: 'Custom Edge & Cloud Software Applications',
        description:
            'Hardware is only half the equation. We build the real-time operator dashboards, PLC/SCADA bridges, and store-and-forward telemetry pipelines that turn edge detections into action.',
        points: [
            'Low-latency local HMI touchscreens, web dashboards, and mobile field alerts',
            'Native integration with Modbus TCP, OPC-UA, CANbus J1939, and MQTT/Kafka brokers',
            'Bandwidth-aware synchronization over metered 5G and NTN satellite links',
        ],
    },
    {
        step: '03',
        title: 'Bespoke AI / ML Model Training & Quantization',
        description:
            'We train, fine-tune, and optimize computer vision, sensor analytics, and multi-modal models specifically on your operational data—compiled for deterministic on-device inference.',
        points: [
            'Dataset curation, active-learning capture on EdgeForge NVMe shuttles, and domain labeling',
            'TensorRT / ONNX INT8 & FP16 quantization tailored to your selected EdgeForge compute tier',
            'OTA model lifecycle management, drift monitoring, and hybrid edge-cloud retraining',
        ],
    },
];

export default function HomePage() {
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const details = resolveConfigDetails(config);

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

    const handleSectorOnlyChange = (sectorId) => {
        setConfig((prev) => ({
            ...prev,
            sector: sectorId,
        }));
    };

    const handleProceedToContact = () => {
        if (typeof window !== 'undefined') {
            const el = document.getElementById('inquire');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            {/* ================= HERO SECTION ================= */}
            <section className="border-b border-aim-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 rounded-full border border-aim-200 bg-aim-50 px-3.5 py-1.5 text-xs font-medium text-aim-700">
                                <span className="h-2 w-2 rounded-full bg-aim-900" />
                                <span>AIModels Tech Hardware Platform • Built in Canada</span>
                            </div>

                            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-aim-900 sm:text-5xl lg:text-6xl">
                                Weather-resistant Edge AI enclosures, engineered for the field.
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-aim-600">
                                <strong>EdgeForge</strong> combines industrial NEMA 4X / IP67 hinged enclosures,
                                DIN-rail neural compute, rugged PoE++ vision switches, 5G &amp; NTN satellite
                                backhaul, and hybrid LiFePO4/solar/alternator power into a single deployable unit.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <a href="#configurator" className="btn-primary">
                                    Configure Your Enclosure
                                </a>
                                <a href="#inquire" className="btn-secondary">
                                    Request Engineering Consultation
                                </a>
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-aim-200 pt-8 sm:grid-cols-4">
                                <div>
                                    <p className="font-mono text-lg font-semibold text-aim-900">NEMA 4X / IP67</p>
                                    <p className="mt-0.5 text-xs text-aim-500">Washdown &amp; corrosion sealed</p>
                                </div>
                                <div>
                                    <p className="font-mono text-lg font-semibold text-aim-900">Up to 550 TOPS</p>
                                    <p className="mt-0.5 text-xs text-aim-500">Conduction-cooled Edge AI</p>
                                </div>
                                <div>
                                    <p className="font-mono text-lg font-semibold text-aim-900">5G + NTN Sat</p>
                                    <p className="mt-0.5 text-xs text-aim-500">Zero-dead-zone telemetry</p>
                                </div>
                                <div>
                                    <p className="font-mono text-lg font-semibold text-aim-900">-40°C to +75°C</p>
                                    <p className="mt-0.5 text-xs text-aim-500">Heated LiFePO4 + Solar/DC</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Hero Architectural Highlights Card */}
                        <div className="lg:col-span-5">
                            <div className="rounded-2xl border border-aim-800 bg-aim-900 p-6 text-white shadow-xl">
                                <div className="flex items-center justify-between border-b border-aim-800 pb-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-aim-400">
                                            Active Architecture Preview
                                        </p>
                                        <p className="mt-1 font-mono text-sm font-bold text-emerald-400">
                                            {details.buildCode}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-aim-800 px-3 py-1 text-xs font-medium text-aim-200">
                                        {details.sectorObj.name}
                                    </span>
                                </div>

                                <dl className="mt-5 space-y-3.5 text-sm">
                                    <div className="flex items-start justify-between gap-4 border-b border-aim-800/70 pb-3">
                                        <dt className="text-aim-400">Compute Blade</dt>
                                        <dd className="text-right font-medium text-white">
                                            {details.computeObj.shortName}
                                        </dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 border-b border-aim-800/70 pb-3">
                                        <dt className="text-aim-400">Camera &amp; Sensor Glands</dt>
                                        <dd className="text-right font-medium text-emerald-300">
                                            {details.camerasObj.name}
                                        </dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 border-b border-aim-800/70 pb-3">
                                        <dt className="text-aim-400">Network Uplink</dt>
                                        <dd className="text-right font-medium text-cyan-300">
                                            {details.networkObj.shortName}
                                        </dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 border-b border-aim-800/70 pb-3">
                                        <dt className="text-aim-400">Wireless Backhaul</dt>
                                        <dd className="text-right font-medium text-purple-300">
                                            {details.activeConnectivity.length > 0
                                                ? details.activeConnectivity.map((c) => c.shortName).join(' + ')
                                                : 'Wired LAN Only'}
                                        </dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 border-b border-aim-800/70 pb-3">
                                        <dt className="text-aim-400">Power &amp; UPS Reserve</dt>
                                        <dd className="text-right font-medium text-amber-300">
                                            {details.activePower.length > 0
                                                ? details.activePower.map((p) => p.shortName).join(' + ')
                                                : 'External 24V DC'}
                                        </dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-4">
                                        <dt className="text-aim-400">Local NVMe RAID</dt>
                                        <dd className="text-right font-medium text-white">
                                            {details.storageObj.name}
                                        </dd>
                                    </div>
                                </dl>

                                <div className="mt-6">
                                    <a
                                        href="#configurator"
                                        className="btn-primary w-full !bg-white !text-aim-900 hover:!bg-aim-100"
                                    >
                                        Customize Modules in Interactive Builder &darr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= INTERACTIVE VISUAL CONFIGURATOR SECTION ================= */}
            <section id="configurator" className="scroll-mt-20 py-20 sm:py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-wider text-aim-500">
                            Interactive Visual Configurator
                        </p>
                        <h2 className="mt-2 section-heading">
                            Design your NEMA 4X / IP67 Edge AI enclosure
                        </h2>
                        <p className="section-subheading">
                            Select a sector preset or customize each internal DIN-rail module, bottom waterproof gland port,
                            top RF antenna array, and power system. The schematic updates in real time and links directly to
                            your engineering inquiry.
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

            {/* ================= SECTORS & FIELD USE CASES SECTION ================= */}
            <section
                id="sectors"
                className="scroll-mt-20 border-y border-aim-200 bg-white py-20 sm:py-24"
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-wider text-aim-500">
                                Field-Proven Verticals
                            </p>
                            <h2 className="mt-2 section-heading">
                                Built for demanding sectors &amp; remote operations
                            </h2>
                            <p className="section-subheading">
                                Every sector imposes distinct environmental, power, and backhaul realities. Load any sector&apos;s
                                baseline hardware template into the visual builder with one click.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {SECTORS.map((sec) => {
                            const isCurrent = config.sector === sec.id;
                            return (
                                <div
                                    key={sec.id}
                                    className={`flex flex-col justify-between rounded-2xl border p-6 transition ${
                                        isCurrent
                                            ? 'border-aim-900 bg-aim-50/70 ring-1 ring-aim-900'
                                            : 'border-aim-200 bg-white hover:border-aim-300'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="text-xl font-semibold text-aim-900">
                                                {sec.name}
                                            </h3>
                                            {isCurrent && (
                                                <span className="rounded-full bg-aim-900 px-2.5 py-0.5 text-[11px] font-medium text-white">
                                                    Loaded in Builder
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-1 text-sm font-medium text-aim-700">
                                            {sec.tagline}
                                        </p>
                                        <p className="mt-2 rounded-lg bg-aim-100/80 px-3 py-1.5 font-mono text-xs text-aim-600">
                                            Environment: {sec.environment}
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-aim-600">
                                            {sec.description}
                                        </p>

                                        <ul className="mt-4 space-y-2 border-t border-aim-200/80 pt-4">
                                            {sec.useCases.map((uc) => (
                                                <li key={uc} className="flex items-start gap-2.5 text-xs text-aim-700">
                                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-aim-700" />
                                                    <span>{uc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-aim-200 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => handleApplySectorPreset(sec.id, true)}
                                            className="text-xs font-semibold text-aim-900 underline-offset-4 hover:underline"
                                        >
                                            Load {sec.name} Template in Visual Builder &uarr;
                                        </button>
                                        <a
                                            href="#inquire"
                                            onClick={() => handleSectorOnlyChange(sec.id)}
                                            className="text-xs font-medium text-aim-600 hover:text-aim-900"
                                        >
                                            Inquire for {sec.name} &rarr;
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= CUSTOM SKUS SECTION ================= */}
            <section
                id="custom-skus"
                className="scroll-mt-20 border-b border-aim-200 bg-aim-100/60 py-20 sm:py-24"
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-5">
                            <p className="text-sm font-medium uppercase tracking-wider text-aim-500">
                                Beyond Standard Configurations
                            </p>
                            <h2 className="mt-2 section-heading">
                                Custom SKUs engineered for unique constraints
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-aim-600">
                                If the standard modular options in our configurator don&apos;t cover your exact sensor interface,
                                dimensional envelope, or regulatory certification, AIModels designs and manufactures
                                <strong> custom EdgeForge SKUs</strong> tailored to your specification.
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-aim-600">
                                Whether you need a compact ultra-low-draw enclosure for a remote helicopter-slung weather station
                                or a multi-bay stainless cabinet for an offshore vessel deck, we engineer the backplate, harness,
                                and thermal path around your reality.
                            </p>
                            <div className="mt-8">
                                <a href="#inquire" className="btn-primary">
                                    Discuss a Custom SKU Specification
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                            {CUSTOM_SKU_CAPABILITIES.map((item) => (
                                <div key={item.title} className="card">
                                    <h3 className="text-base font-semibold text-aim-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-aim-600">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= END-TO-END INTEGRATION SECTION ================= */}
            <section id="integration" className="scroll-mt-20 bg-white py-20 sm:py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-wider text-aim-500">
                            Full-Stack Delivery
                        </p>
                        <h2 className="mt-2 section-heading">
                            End-to-end integration: from field install to custom AI models
                        </h2>
                        <p className="section-subheading">
                            You don&apos;t just get an empty box or a raw compute board. AIModels Tech delivers the complete
                            operational system—physical field installation, custom operator software, and production-grade
                            machine learning models running inside your EdgeForge enclosure.
                        </p>
                    </div>

                    <div className="mt-14 space-y-12">
                        {INTEGRATION_PILLARS.map((pillar, idx) => (
                            <div
                                key={pillar.step}
                                className={`grid gap-8 lg:grid-cols-12 lg:items-start ${
                                    idx > 0 ? 'border-t border-aim-200 pt-12' : ''
                                }`}
                            >
                                <div className="lg:col-span-5">
                                    <span className="font-mono text-sm font-semibold text-aim-500">
                                        {pillar.step}
                                    </span>
                                    <h3 className="mt-1 text-2xl font-semibold text-aim-900">
                                        {pillar.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-aim-600">
                                        {pillar.description}
                                    </p>
                                </div>

                                <ul className="card space-y-3 lg:col-span-7">
                                    {pillar.points.map((pt) => (
                                        <li key={pt} className="flex gap-3 text-sm text-aim-700">
                                            <svg
                                                className="mt-0.5 h-5 w-5 shrink-0 text-aim-700"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CONFIGURATION-LINKED CONTACT / INQUIRY SECTION ================= */}
            <section
                id="inquire"
                className="scroll-mt-20 border-t border-aim-200 bg-aim-50 py-20 sm:py-24"
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="text-sm font-medium uppercase tracking-wider text-aim-500">
                                Project &amp; Hardware Inquiry
                            </p>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-aim-900">
                                Discuss your EdgeForge build
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-aim-600">
                                Every deployment has unique camera placement, power duty-cycle, and environmental realities.
                                Submit your configured enclosure architecture below and our engineering team will review your
                                requirements and follow up directly.
                            </p>

                            <div className="mt-8 rounded-2xl border border-aim-200 bg-white p-6 shadow-sm">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-aim-900">
                                    Direct Engineering Contact
                                </h3>
                                <ul className="mt-4 space-y-4 text-sm">
                                    <li>
                                        <p className="text-xs font-medium text-aim-500">Email</p>
                                        <a
                                            href="mailto:contact@aimodels.ca"
                                            className="mt-0.5 block font-medium text-aim-800 hover:text-aim-600"
                                        >
                                            contact@aimodels.ca
                                        </a>
                                    </li>
                                    <li>
                                        <p className="text-xs font-medium text-aim-500">Phone</p>
                                        <a
                                            href="tel:+17787894655"
                                            className="mt-0.5 block font-medium text-aim-800 hover:text-aim-600"
                                        >
                                            +1 778 789 4655
                                        </a>
                                    </li>
                                    <li>
                                        <p className="text-xs font-medium text-aim-500">Headquarters</p>
                                        <p className="mt-0.5 text-aim-800">Greater Vancouver, BC, Canada</p>
                                    </li>
                                </ul>

                                <div className="mt-6 border-t border-aim-200 pt-5">
                                    <p className="text-xs font-semibold text-aim-900">What happens next?</p>
                                    <ul className="mt-2 space-y-1.5 text-xs text-aim-600">
                                        <li>1. We review your attached SKU ({details.buildCode}) and use case</li>
                                        <li>2. Architecture &amp; power/thermal validation call with an engineer</li>
                                        <li>3. Detailed technical proposal, lead time &amp; deployment scope</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="card">
                                <h3 className="text-xl font-semibold text-aim-900">
                                    Send your configuration &amp; project details
                                </h3>
                                <p className="mt-1 text-sm text-aim-600">
                                    Your current visual builder selection is automatically attached below. You can adjust any module
                                    above at any time before sending.
                                </p>

                                <div className="mt-6">
                                    <ConfigContactForm
                                        config={config}
                                        onSelectSector={(secId) => handleApplySectorPreset(secId, false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
