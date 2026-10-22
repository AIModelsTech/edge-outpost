import { useState, useEffect } from 'react';
import { SECTORS, resolveConfigDetails } from '../data/enclosureConfig';

const FORMSPREE_URL = 'https://formspree.io/f/xqkjwawp';

export default function ConfigContactForm({ config, onSelectSector }) {
    const details = resolveConfigDetails(config);

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        sector: details.sectorObj.name,
        text: '',
    });

    const [status, setStatus] = useState('idle');

    useEffect(() => {
        setFormState((prev) => ({
            ...prev,
            sector: details.sectorObj.name,
        }));
    }, [details.sectorObj.name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
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
            company: formState.company,
            industry: formState.sector,
            subject: `EdgeForge Inquiry — ${formState.sector}`,
            text: formState.text,
            edgeforgeConfigSummary: details.summaryText,
            edgeforgeSelectedOptions: details.selectedPills.join(', '),
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
        'w-full rounded-lg border border-aim-200 bg-white px-4 py-2.5 text-sm text-aim-900 placeholder:text-aim-400 focus:border-aim-900 focus:outline-none';

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Clean Pill List of Selected Options */}
            <div className="rounded-xl border border-aim-200 bg-aim-50 p-4">
                <p className="text-xs font-medium text-aim-500">
                    Selected Enclosure Configuration (included with inquiry)
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {details.selectedPills.map((pill) => (
                        <span
                            key={pill}
                            className="rounded-md border border-aim-200 bg-white px-2.5 py-1 text-xs font-medium text-aim-800"
                        >
                            {pill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-aim-700">
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
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-aim-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@company.com"
                    />
                </div>
                <div>
                    <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-aim-700">
                        Company
                    </label>
                    <input
                        id="company"
                        type="text"
                        name="company"
                        required
                        value={formState.company}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Organization"
                    />
                </div>
                <div>
                    <label htmlFor="sector" className="mb-1.5 block text-xs font-medium text-aim-700">
                        Sector
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
                        <option value="Other / Custom">Other / Custom</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="text" className="mb-1.5 block text-xs font-medium text-aim-700">
                    Use Case &amp; Comments
                </label>
                <textarea
                    id="text"
                    name="text"
                    rows={4}
                    required
                    value={formState.text}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Briefly describe your deployment environment, sensors, or custom requirements..."
                />
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
                <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                </button>
                <a
                    href="mailto:contact@aimodels.ca"
                    className="text-xs text-aim-500 transition hover:text-aim-900"
                >
                    contact@aimodels.ca
                </a>
            </div>

            {status === 'success' && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-medium text-emerald-800">
                    Thank you. Your configuration and inquiry have been sent to our engineering team.
                </div>
            )}
            {status === 'error' && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-800">
                    Unable to submit right now. Please email us directly at{' '}
                    <a href="mailto:contact@aimodels.ca" className="underline">
                        contact@aimodels.ca
                    </a>
                    .
                </div>
            )}
        </form>
    );
}
