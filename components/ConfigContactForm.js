import { useState, useEffect } from 'react';
import { SECTORS, resolveConfigDetails } from '../data/enclosureConfig';

const FORMSPREE_URL = 'https://formspree.io/f/xqkjwawp';

export default function ConfigContactForm({ config, onSelectSector }) {
    const details = resolveConfigDetails(config);

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        number: '',
        company: '',
        sector: details.sectorObj.name,
        inquiryType: 'Configured EdgeForge Enclosure',
        needsCustomSku: false,
        needsEndToEndIntegration: true,
        text: '',
    });

    const [includeConfiguration, setIncludeConfiguration] = useState(true);
    const [status, setStatus] = useState('idle');

    // Sync sector dropdown when user changes sector in configurator or sector cards
    useEffect(() => {
        setFormState((prev) => ({
            ...prev,
            sector: details.sectorObj.name,
        }));
    }, [details.sectorObj.name]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'sector' && onSelectSector) {
            const matchedSector = SECTORS.find((s) => s.name === value);
            if (matchedSector) {
                onSelectSector(matchedSector.id);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const payload = {
            name: formState.name,
            email: formState.email,
            number: formState.number,
            company: formState.company,
            industry: formState.sector,
            subject: `EdgeForge Inquiry (${details.buildCode}) — ${formState.sector}`,
            inquiryType: formState.inquiryType,
            needsCustomSku: formState.needsCustomSku ? 'Yes — Custom SKU requested' : 'Standard modular build',
            needsEndToEndIntegration: formState.needsEndToEndIntegration
                ? 'Yes — Full-stack install / AI model / software integration'
                : 'Hardware enclosure only',
            text: formState.text,
            ...(includeConfiguration
                ? {
                      edgeforgeBuildCode: details.buildCode,
                      edgeforgeConfigSummary: details.summaryText,
                      edgeforgeStructuredConfig: JSON.stringify({
                          buildCode: details.buildCode,
                          sector: details.sectorObj.name,
                          compute: details.computeObj.name,
                          computeTops: details.computeObj.tops,
                          cameras: details.camerasObj.name,
                          network: details.networkObj.name,
                          connectivity: details.activeConnectivity.map((c) => c.name),
                          powerArchitecture: details.activePower.map((p) => p.name),
                          storage: details.storageObj.name,
                      }),
                  }
                : {}),
        };

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setFormState((prev) => ({
                    ...prev,
                    name: '',
                    email: '',
                    number: '',
                    company: '',
                    text: '',
                }));
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const inputClass =
        'w-full rounded-lg border border-aim-300 bg-white px-4 py-3 text-sm text-aim-800 placeholder:text-aim-400 focus:border-aim-500 focus:outline-none focus:ring-2 focus:ring-aim-400/30';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Attached Visual Enclosure Configuration Badge / Summary Card */}
            <div className="rounded-xl border border-aim-300 bg-aim-50 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-aim-600">
                                Attached Enclosure Configuration
                            </span>
                        </div>
                        <p className="mt-1 font-mono text-sm font-bold text-aim-900">
                            {details.buildCode}
                        </p>
                    </div>

                    <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-aim-700">
                        <input
                            type="checkbox"
                            checked={includeConfiguration}
                            onChange={(e) => setIncludeConfiguration(e.target.checked)}
                            className="h-4 w-4 rounded border-aim-300 text-aim-900 focus:ring-aim-600"
                        />
                        Include this enclosure spec in inquiry
                    </label>
                </div>

                {includeConfiguration && (
                    <div className="mt-4 grid gap-2.5 border-t border-aim-200 pt-3.5 text-xs sm:grid-cols-2">
                        <div className="rounded-lg border border-aim-200 bg-white px-3 py-2">
                            <span className="block text-[10px] font-semibold uppercase tracking-wider text-aim-500">
                                Edge AI Compute
                            </span>
                            <span className="font-medium text-aim-900">
                                {details.computeObj.name} ({details.computeObj.tops})
                            </span>
                        </div>
                        <div className="rounded-lg border border-aim-200 bg-white px-3 py-2">
                            <span className="block text-[10px] font-semibold uppercase tracking-wider text-aim-500">
                                Camera &amp; Network I/O
                            </span>
                            <span className="font-medium text-aim-900">
                                {details.camerasObj.shortName} + {details.networkObj.shortName}
                            </span>
                        </div>
                        <div className="rounded-lg border border-aim-200 bg-white px-3 py-2">
                            <span className="block text-[10px] font-semibold uppercase tracking-wider text-aim-500">
                                Wireless &amp; Satellite Backhaul
                            </span>
                            <span className="font-medium text-aim-900">
                                {details.activeConnectivity.length > 0
                                    ? details.activeConnectivity.map((c) => c.shortName).join(' + ')
                                    : 'Wired LAN Only'}
                            </span>
                        </div>
                        <div className="rounded-lg border border-aim-200 bg-white px-3 py-2">
                            <span className="block text-[10px] font-semibold uppercase tracking-wider text-aim-500">
                                Power &amp; NVMe Storage
                            </span>
                            <span className="font-medium text-aim-900">
                                {details.storageObj.capacity} NVMe •{' '}
                                {details.activePower.length > 0
                                    ? details.activePower.map((p) => p.shortName).join(', ')
                                    : '24V DC'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Details */}
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-aim-700">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your full name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-aim-700">
                        Work Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@organization.com"
                    />
                </div>
                <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-aim-700">
                        Organization / Company
                    </label>
                    <input
                        id="company"
                        type="text"
                        name="company"
                        required
                        value={formState.company}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Company or agency name"
                    />
                </div>
                <div>
                    <label htmlFor="number" className="mb-1.5 block text-sm font-medium text-aim-700">
                        Phone (Optional)
                    </label>
                    <input
                        id="number"
                        type="tel"
                        name="number"
                        value={formState.number}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="+1 ..."
                    />
                </div>
            </div>

            {/* Sector Selection */}
            <div>
                <label htmlFor="sector" className="mb-1.5 block text-sm font-medium text-aim-700">
                    Deployment Sector
                </label>
                <select
                    id="sector"
                    name="sector"
                    value={formState.sector}
                    onChange={handleChange}
                    className={inputClass}
                >
                    {SECTORS.map((sec) => (
                        <option key={sec.id} value={sec.name}>
                            {sec.name}
                        </option>
                    ))}
                    <option value="Other / Multi-Sector Custom">Other / Multi-Sector Custom</option>
                </select>
            </div>

            {/* Custom SKU & Full-Stack Integration Checkboxes */}
            <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-aim-200 bg-aim-50/70 p-3.5 text-xs transition hover:border-aim-300">
                    <input
                        type="checkbox"
                        name="needsCustomSku"
                        checked={formState.needsCustomSku}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-aim-300 text-aim-900 focus:ring-aim-600"
                    />
                    <div>
                        <span className="block font-semibold text-aim-900">
                            Request Custom SKU Engineering
                        </span>
                        <span className="mt-0.5 block text-aim-600">
                            Need bespoke I/O glands, MIL-DTL connectors, Class I Div 2 / explosion-proof housing, or custom dimensions.
                        </span>
                    </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-aim-200 bg-aim-50/70 p-3.5 text-xs transition hover:border-aim-300">
                    <input
                        type="checkbox"
                        name="needsEndToEndIntegration"
                        checked={formState.needsEndToEndIntegration}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-aim-300 text-aim-900 focus:ring-aim-600"
                    />
                    <div>
                        <span className="block font-semibold text-aim-900">
                            Include End-to-End AI &amp; Field Integration
                        </span>
                        <span className="mt-0.5 block text-aim-600">
                            Include custom ML model training, edge application software, and on-site physical installation.
                        </span>
                    </div>
                </label>
            </div>

            {/* Use Case / Comments */}
            <div>
                <label htmlFor="text" className="mb-1.5 block text-sm font-medium text-aim-700">
                    Use Case, Environmental Constraints &amp; Project Notes
                </label>
                <textarea
                    id="text"
                    name="text"
                    rows={5}
                    required
                    value={formState.text}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Describe your cameras/sensors, mounting environment (pole, vessel, mobile equipment, plant wall), power availability, and what AI models or workflows you want running at the edge..."
                />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
                    {status === 'submitting'
                        ? 'Submitting Inquiry...'
                        : 'Submit Configuration & Project Inquiry'}
                </button>
                <span className="text-xs text-aim-500">
                    Direct engineering review — no automated sales spam.
                </span>
            </div>

            {status === 'success' && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
                    Thank you — your EdgeForge specification ({details.buildCode}) and project inquiry have been sent to our engineering team. We will follow up shortly.
                </div>
            )}
            {status === 'error' && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                    Something went wrong submitting the form. Please try again or email your build code ({details.buildCode}) directly to{' '}
                    <a href="mailto:contact@aimodels.ca" className="underline">
                        contact@aimodels.ca
                    </a>
                    .
                </div>
            )}
        </form>
    );
}
