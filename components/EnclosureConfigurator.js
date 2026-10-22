import React from 'react';
import EnclosureVisualizer from './EnclosureVisualizer';
import {
    SECTORS,
    COMPUTE_OPTIONS,
    CAMERA_PORT_OPTIONS,
    NETWORK_OPTIONS,
    CONNECTIVITY_OPTIONS,
    POWER_OPTIONS,
    STORAGE_OPTIONS,
    resolveConfigDetails,
} from '../data/enclosureConfig';

export default function EnclosureConfigurator({
    config,
    onChangeConfig,
    onApplySectorPreset,
    onProceedToContact,
}) {
    const details = resolveConfigDetails(config);

    const handleSelectSingle = (field, value) => {
        onChangeConfig((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleToggleBoolean = (field) => {
        onChangeConfig((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="space-y-8">
            {/* Sector Quick-Preset Selector Strip */}
            <div className="rounded-2xl border border-aim-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-aim-500">
                            Sector Baseline Templates
                        </span>
                        <h3 className="mt-0.5 text-base font-semibold text-aim-900">
                            Load a recommended architecture by deployment sector — then customize any module
                        </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-aim-100 px-3 py-1 font-mono text-xs font-medium text-aim-700">
                        Active Sector: {details.sectorObj.name}
                    </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {SECTORS.map((sec) => {
                        const isSelected = config.sector === sec.id;
                        return (
                            <button
                                key={sec.id}
                                type="button"
                                onClick={() => onApplySectorPreset(sec.id)}
                                className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition ${
                                    isSelected
                                        ? 'border-aim-900 bg-aim-900 text-white shadow-sm'
                                        : 'border-aim-200 bg-aim-50 text-aim-700 hover:border-aim-400 hover:bg-white'
                                }`}
                            >
                                {sec.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main 2-Column Interactive Builder */}
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                {/* Left / Sticky Visual Enclosure Schematic (7 columns on desktop) */}
                <div className="lg:sticky lg:top-24 lg:col-span-7">
                    <EnclosureVisualizer config={config} />

                    {/* Live Spec Sheet Summary Bar underneath visual */}
                    <div className="mt-4 rounded-2xl border border-aim-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-aim-500">
                                    Configured Architecture Reference
                                </p>
                                <p className="mt-1 font-mono text-sm font-semibold text-aim-900">
                                    {details.buildCode}
                                </p>
                                <p className="mt-1 text-xs text-aim-600">
                                    All enclosures are built-to-order in Canada with full environmental sealing &amp; burn-in validation.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onProceedToContact}
                                className="btn-primary shrink-0"
                            >
                                Attach Build to Engineering Inquiry &rarr;
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right / Modular Hardware Controls (5 columns on desktop) */}
                <div className="space-y-6 lg:col-span-5">
                    {/* 1. EDGE AI COMPUTE CAPACITY */}
                    <div className="card !p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                                01 • DIN Rail 01
                            </span>
                            <span className="font-mono text-xs text-aim-500">
                                {details.computeObj.tops}
                            </span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-aim-900">
                            Edge AI Compute Capacity
                        </h3>
                        <p className="mt-1 text-xs text-aim-600">
                            Select the onboard neural &amp; GPU compute blade. Updates heatsink fin profile and internal DIN footprint.
                        </p>

                        <div className="mt-4 space-y-2.5">
                            {COMPUTE_OPTIONS.map((opt) => {
                                const active = config.compute === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => handleSelectSingle('compute', opt.id)}
                                        className={`w-full rounded-xl border p-3.5 text-left transition ${
                                            active
                                                ? 'border-aim-900 bg-aim-900/5 ring-1 ring-aim-900'
                                                : 'border-aim-200 bg-white hover:border-aim-400'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-sm font-semibold text-aim-900">
                                                {opt.name}
                                            </span>
                                            <span className="shrink-0 rounded bg-sky-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-sky-900">
                                                {opt.tops}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs leading-relaxed text-aim-600">
                                            {opt.description}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-medium text-aim-500">
                                            <span>Draw: {opt.powerDraw}</span>
                                            <span>•</span>
                                            <span>{opt.thermalType}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. CAMERA PORTS (POE+ / POE++) */}
                    <div className="card !p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                02 • DIN Rail 02 + Gland Plate
                            </span>
                            <span className="font-mono text-xs text-aim-500">
                                {details.camerasObj.poeBudget}
                            </span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-aim-900">
                            Rugged Camera &amp; Sensor PoE Ports
                        </h3>
                        <p className="mt-1 text-xs text-aim-600">
                            Configures the internal managed PoE+/PoE++ switch and bottom IP68 M12 / shielded RJ45 camera glands.
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-2.5">
                            {CAMERA_PORT_OPTIONS.map((opt) => {
                                const active = config.cameras === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => handleSelectSingle('cameras', opt.id)}
                                        className={`w-full rounded-xl border p-3.5 text-left transition ${
                                            active
                                                ? 'border-aim-900 bg-aim-900/5 ring-1 ring-aim-900'
                                                : 'border-aim-200 bg-white hover:border-aim-400'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-aim-900">
                                                {opt.name}
                                            </span>
                                            <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-900">
                                                {opt.poeBudget}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-aim-600">{opt.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. NETWORK UPLINK PORTS */}
                    <div className="card !p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                                03 • Plant / Local Uplink
                            </span>
                            <span className="font-mono text-xs text-aim-500">
                                {details.networkObj.speed}
                            </span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-aim-900">
                            Network &amp; Fiber Uplink Ports
                        </h3>
                        <p className="mt-1 text-xs text-aim-600">
                            Select copper Ethernet or EMI-immune optical SFP+ transceivers for local network integration.
                        </p>

                        <div className="mt-4 space-y-2.5">
                            {NETWORK_OPTIONS.map((opt) => {
                                const active = config.network === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => handleSelectSingle('network', opt.id)}
                                        className={`w-full rounded-xl border p-3.5 text-left transition ${
                                            active
                                                ? 'border-aim-900 bg-aim-900/5 ring-1 ring-aim-900'
                                                : 'border-aim-200 bg-white hover:border-aim-400'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-aim-900">
                                                {opt.name}
                                            </span>
                                            <span className="rounded bg-cyan-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan-900">
                                                {opt.code}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-aim-600">{opt.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 4. WIRELESS CONNECTIVITY (5G & NTN SATELLITE) */}
                    <div className="card !p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                                04 • Top Bulkhead Antennas + RF Rail
                            </span>
                            <span className="font-mono text-xs text-aim-500">Multi-Path Backhaul</span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-aim-900">
                            5G Cellular &amp; NTN Satellite Connectivity
                        </h3>
                        <p className="mt-1 text-xs text-aim-600">
                            Combine terrestrial 5G MIMO with Non-Terrestrial Network (NTN) satellite failover for zero-dead-zone telemetry.
                        </p>

                        <div className="mt-4 space-y-2.5">
                            {Object.values(CONNECTIVITY_OPTIONS).map((opt) => {
                                const active = Boolean(config[opt.id]);
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => handleToggleBoolean(opt.id)}
                                        className={`w-full rounded-xl border p-3.5 text-left transition ${
                                            active
                                                ? 'border-aim-900 bg-aim-900/5 ring-1 ring-aim-900'
                                                : 'border-aim-200 bg-white hover:border-aim-400'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2.5">
                                                <span
                                                    className={`flex h-5 w-5 items-center justify-center rounded border text-xs font-bold ${
                                                        active
                                                            ? 'border-aim-900 bg-aim-900 text-white'
                                                            : 'border-aim-300 bg-white text-transparent'
                                                    }`}
                                                >
                                                    ✓
                                                </span>
                                                <span className="text-sm font-semibold text-aim-900">
                                                    {opt.name}
                                                </span>
                                            </div>
                                            <span className="rounded bg-purple-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-purple-900">
                                                {opt.code}
                                            </span>
                                        </div>
                                        <p className="mt-1.5 pl-7 text-xs text-aim-600">
                                            {opt.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 5. POWER & CHARGING ARCHITECTURE */}
                    <div className="card !p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                                05 • Lower Power Bay + External Mounts
                            </span>
                            <span className="font-mono text-xs text-aim-500">Hybrid Power</span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-aim-900">
                            Power, UPS Battery &amp; Charging Architecture
                        </h3>
                        <p className="mt-1 text-xs text-aim-600">
                            Mix and match internal heated LiFePO4 UPS reserves with solar MPPT, vehicle/vessel alternator DC-DC, or grid AC.
                        </p>

                        <div className="mt-4 space-y-2.5">
                            {Object.values(POWER_OPTIONS).map((opt) => {
                                const active = Boolean(config[opt.id]);
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => handleToggleBoolean(opt.id)}
                                        className={`w-full rounded-xl border p-3.5 text-left transition ${
                                            active
                                                ? 'border-aim-900 bg-aim-900/5 ring-1 ring-aim-900'
                                                : 'border-aim-200 bg-white hover:border-aim-400'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2.5">
                                                <span
                                                    className={`flex h-5 w-5 items-center justify-center rounded border text-xs font-bold ${
                                                        active
                                                            ? 'border-aim-900 bg-aim-900 text-white'
                                                            : 'border-aim-300 bg-white text-transparent'
                                                    }`}
                                                >
                                                    ✓
                                                </span>
                                                <span className="text-sm font-semibold text-aim-900">
                                                    {opt.name}
                                                </span>
                                            </div>
                                            <span className="shrink-0 rounded bg-amber-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-900">
                                                {opt.code}
                                            </span>
                                        </div>
                                        <p className="mt-1.5 pl-7 text-xs text-aim-600">
                                            {opt.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 6. LOCAL NVME DATA STORAGE */}
                    <div className="card !p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                                06 • Removable Rugged RAID Bay
                            </span>
                            <span className="font-mono text-xs text-aim-500">
                                {details.storageObj.capacity}
                            </span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-aim-900">
                            Industrial NVMe Black-Box Storage
                        </h3>
                        <p className="mt-1 text-xs text-aim-600">
                            High-endurance wide-temperature SSD canisters for zero-drop local video, telemetry, and training dataset capture.
                        </p>

                        <div className="mt-4 space-y-2.5">
                            {STORAGE_OPTIONS.map((opt) => {
                                const active = config.storage === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => handleSelectSingle('storage', opt.id)}
                                        className={`w-full rounded-xl border p-3.5 text-left transition ${
                                            active
                                                ? 'border-aim-900 bg-aim-900/5 ring-1 ring-aim-900'
                                                : 'border-aim-200 bg-white hover:border-aim-400'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-aim-900">
                                                {opt.name}
                                            </span>
                                            <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-900">
                                                {opt.capacity}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-aim-600">{opt.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
