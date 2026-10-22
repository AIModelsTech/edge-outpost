import React, { useState } from 'react';
import EnclosureVisualizer from './EnclosureVisualizer';
import {
    COMPUTE_OPTIONS,
    CAMERA_PORT_OPTIONS,
    NETWORK_OPTIONS,
    INDUSTRIAL_IO_OPTIONS,
    CONNECTIVITY_OPTIONS,
    POWER_OPTIONS,
    STORAGE_OPTIONS,
    resolveConfigDetails,
} from '../data/enclosureConfig';

const TABS = [
    { id: 'compute', label: 'Compute' },
    { id: 'network', label: 'Cameras, Network & I/O' },
    { id: 'connectivity', label: 'Connectivity' },
    { id: 'power', label: 'Power' },
    { id: 'storage', label: 'Storage' },
];

export default function EnclosureConfigurator({
    config,
    onChangeConfig,
    onProceedToContact,
}) {
    const [activeTab, setActiveTab] = useState('compute');
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

    const renderSingleOptionCard = (opt, isSelected, onSelect) => (
        <button
            key={opt.id}
            type="button"
            onClick={onSelect}
            className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                isSelected
                    ? 'border-aim-900 bg-aim-50/80 ring-1 ring-aim-900'
                    : 'border-aim-200 bg-white hover:border-aim-300'
            }`}
        >
            <div>
                <p className="text-sm font-semibold text-aim-900">{opt.name}</p>
                <p className="mt-0.5 text-xs text-aim-500">{opt.subtitle}</p>
            </div>
            <span
                className={`ml-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                        ? 'border-aim-900 bg-aim-900 text-white'
                        : 'border-aim-300 bg-white'
                }`}
            >
                {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
            </span>
        </button>
    );

    const renderToggleOptionCard = (opt, isSelected, onToggle) => (
        <button
            key={opt.id}
            type="button"
            onClick={onToggle}
            className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                isSelected
                    ? 'border-aim-900 bg-aim-50/80 ring-1 ring-aim-900'
                    : 'border-aim-200 bg-white hover:border-aim-300'
            }`}
        >
            <div>
                <p className="text-sm font-semibold text-aim-900">{opt.name}</p>
                <p className="mt-0.5 text-xs text-aim-500">{opt.subtitle}</p>
            </div>
            <span
                className={`ml-4 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${
                    isSelected
                        ? 'border-aim-900 bg-aim-900 text-white'
                        : 'border-aim-300 bg-white text-transparent'
                }`}
            >
                ✓
            </span>
        </button>
    );

    return (
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left: Clean Architectural Enclosure Diagram */}
            <div className="lg:col-span-7 xl:col-span-8">
                <EnclosureVisualizer
                    config={config}
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                />
            </div>

            {/* Right: Tabbed Module Selector */}
            <div className="rounded-2xl border border-aim-200 bg-white p-6 shadow-sm lg:col-span-5 xl:col-span-4">
                {/* Compact Category Tabs */}
                <div className="flex flex-wrap gap-1.5 border-b border-aim-100 pb-4">
                    {TABS.map((tab) => {
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                                    active
                                        ? 'bg-aim-900 text-white'
                                        : 'text-aim-600 hover:bg-aim-50 hover:text-aim-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Active Category Options */}
                <div className="mt-5 min-h-[280px]">
                    {activeTab === 'compute' && (
                        <div className="space-y-3">
                            <div className="mb-3">
                                <h3 className="text-base font-semibold text-aim-900">
                                    Edge AI Compute
                                </h3>
                                <p className="text-xs text-aim-500">
                                    Conduction-cooled neural compute module on the upper rail.
                                </p>
                            </div>
                            {COMPUTE_OPTIONS.map((opt) =>
                                renderSingleOptionCard(
                                    opt,
                                    config.compute === opt.id,
                                    () => handleSelectSingle('compute', opt.id)
                                )
                            )}
                        </div>
                    )}

                    {activeTab === 'network' && (
                        <div className="space-y-5">
                            <div className="space-y-2.5">
                                <div>
                                    <h3 className="text-sm font-semibold text-aim-900">
                                        Camera &amp; Vision Interfaces
                                    </h3>
                                    <p className="text-xs text-aim-500">
                                        PoE+/PoE++ switches, low-latency GMSL2 coax, or hybrid vision ports.
                                    </p>
                                </div>
                                {CAMERA_PORT_OPTIONS.map((opt) =>
                                    renderSingleOptionCard(
                                        opt,
                                        config.cameras === opt.id,
                                        () => handleSelectSingle('cameras', opt.id)
                                    )
                                )}
                            </div>

                            <div className="space-y-2.5 border-t border-aim-100 pt-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-aim-900">
                                        Network Uplink
                                    </h3>
                                    <p className="text-xs text-aim-500">
                                        Local copper or optical fiber backhaul.
                                    </p>
                                </div>
                                {NETWORK_OPTIONS.map((opt) =>
                                    renderSingleOptionCard(
                                        opt,
                                        config.network === opt.id,
                                        () => handleSelectSingle('network', opt.id)
                                    )
                                )}
                            </div>

                            <div className="space-y-2.5 border-t border-aim-100 pt-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-aim-900">
                                        Serial, CAN Bus &amp; Industrial I/O
                                    </h3>
                                    <p className="text-xs text-aim-500">
                                        Isolated fieldbus, vehicle CAN, and PLC sensor interfaces.
                                    </p>
                                </div>
                                {Object.values(INDUSTRIAL_IO_OPTIONS).map((opt) =>
                                    renderToggleOptionCard(
                                        opt,
                                        Boolean(config[opt.id]),
                                        () => handleToggleBoolean(opt.id)
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'connectivity' && (
                        <div className="space-y-3">
                            <div className="mb-3">
                                <h3 className="text-base font-semibold text-aim-900">
                                    Wireless &amp; Positioning
                                </h3>
                                <p className="text-xs text-aim-500">
                                    Combine 5G, NTN satellite, Wi-Fi/BLE, and multi-band GNSS RTK.
                                </p>
                            </div>
                            {Object.values(CONNECTIVITY_OPTIONS).map((opt) =>
                                renderToggleOptionCard(
                                    opt,
                                    Boolean(config[opt.id]),
                                    () => handleToggleBoolean(opt.id)
                                )
                            )}
                        </div>
                    )}

                    {activeTab === 'power' && (
                        <div className="space-y-3">
                            <div className="mb-3">
                                <h3 className="text-base font-semibold text-aim-900">
                                    Power &amp; Backup Reserve
                                </h3>
                                <p className="text-xs text-aim-500">
                                    Combine internal LiFePO4 backup with solar, vehicle, or grid inputs.
                                </p>
                            </div>
                            {Object.values(POWER_OPTIONS).map((opt) =>
                                renderToggleOptionCard(
                                    opt,
                                    Boolean(config[opt.id]),
                                    () => handleToggleBoolean(opt.id)
                                )
                            )}
                        </div>
                    )}

                    {activeTab === 'storage' && (
                        <div className="space-y-3">
                            <div className="mb-3">
                                <h3 className="text-base font-semibold text-aim-900">
                                    Data Storage
                                </h3>
                                <p className="text-xs text-aim-500">
                                    Integrated onboard NVMe or dedicated removable RAID bays.
                                </p>
                            </div>
                            {STORAGE_OPTIONS.map((opt) =>
                                renderSingleOptionCard(
                                    opt,
                                    config.storage === opt.id,
                                    () => handleSelectSingle('storage', opt.id)
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* Clean Selected Summary Strip */}
                <div className="mt-6 border-t border-aim-100 pt-5">
                    <p className="text-xs font-medium text-aim-500">Selected Configuration</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {details.selectedPills.map((pill) => (
                            <span
                                key={pill}
                                className="rounded-md border border-aim-200 bg-aim-50 px-2.5 py-1 text-xs font-medium text-aim-700"
                            >
                                {pill}
                            </span>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={onProceedToContact}
                        className="btn-primary mt-5 w-full"
                    >
                        Inquire About This Configuration
                    </button>
                </div>
            </div>
        </div>
    );
}
