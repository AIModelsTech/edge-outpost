import React from 'react';
import { resolveConfigDetails } from '../data/enclosureConfig';

export default function EnclosureVisualizer({ config, activeTab = 'compute', onSelectTab }) {
    const details = resolveConfigDetails(config);
    const { computeObj, camerasObj, networkObj, storageObj } = details;

    const poeCount = camerasObj.poeCount;
    const gmslCount = camerasObj.gmslCount;
    const totalCameras = poeCount + gmslCount;
    const isFiber = networkObj.id === 'net-sfp';
    const is10GbE = networkObj.id === 'net-10gbe';
    const hasAnyRf = Boolean(
        config.cellular5g || config.satelliteNtn || config.wifiBle || config.gnssRtk
    );
    const hasAnyIo = Boolean(config.serialCan || config.digitalAnalogIo);

    const handleTabClick = (tabId, e) => {
        if (e) e.stopPropagation();
        if (onSelectTab) onSelectTab(tabId);
    };

    const isComputeActive = activeTab === 'compute';
    const isNetworkActive = activeTab === 'network';
    const isIoActive = activeTab === 'io';
    const isConnectivityActive = activeTab === 'connectivity';
    const isPowerActive = activeTab === 'power';
    const isStorageActive = activeTab === 'storage';

    const rfModules = [
        { id: 'cellular5g', label: '5G NR', active: Boolean(config.cellular5g) },
        { id: 'satelliteNtn', label: 'NTN Sat', active: Boolean(config.satelliteNtn) },
        { id: 'wifiBle', label: 'Wi-Fi/BLE', active: Boolean(config.wifiBle) },
        { id: 'gnssRtk', label: 'GNSS RTK', active: Boolean(config.gnssRtk) },
    ];

    const powerModules = [
        { id: 'batteryPack', label: 'LiFePO4 UPS', active: Boolean(config.batteryPack) },
        { id: 'solarMppt', label: 'Solar MPPT', active: Boolean(config.solarMppt) },
        { id: 'alternatorDc', label: 'Alternator DC', active: Boolean(config.alternatorDc) },
        { id: 'shoreAc', label: 'Grid AC-DC', active: Boolean(config.shoreAc) },
    ];

    return (
        <div className="rounded-2xl border border-aim-200 bg-white p-5 shadow-sm sm:p-7">
            {/* Minimal Header */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-aim-100 pb-3">
                <div>
                    <h3 className="text-base font-semibold text-aim-900">
                        Enclosure Architecture
                    </h3>
                    <p className="text-xs text-aim-500">
                        NEMA 4X Sealed Chassis • Click any module to configure
                    </p>
                </div>
                <span className="rounded-full border border-aim-200 bg-aim-50 px-3 py-1 text-xs font-medium text-aim-700">
                    {computeObj.tops}
                </span>
            </div>

            {/* Clean Architectural Diagram */}
            <div className="mx-auto w-full">
                <svg
                    viewBox="44 10 692 505"
                    className="h-auto w-full select-none"
                    role="img"
                    aria-label="EdgeForge Enclosure Diagram"
                >
                    {/* ================= TOP ANTENNAS (5G, WI-FI/BLE, GNSS RTK, NTN SATELLITE) ================= */}
                    <g
                        onClick={(e) => handleTabClick('connectivity', e)}
                        className="cursor-pointer"
                    >
                        {/* Transparent hit area for top antennas */}
                        <rect x="96" y="14" width="430" height="76" fill="transparent" />

                        {/* 1. 5G Cellular MIMO (Center x = 128) */}
                        <g opacity={config.cellular5g ? 1 : 0.25} className="transition-opacity duration-200">
                            <rect x="108" y="38" width="14" height="50" rx="7" fill="#0f172a" />
                            <rect x="134" y="44" width="14" height="44" rx="7" fill="#0f172a" />
                            <rect x="104" y="84" width="48" height="8" rx="3" fill="#475569" />
                            <text
                                x="128"
                                y="26"
                                textAnchor="middle"
                                fill="#0f172a"
                                fontSize="10.5"
                                fontWeight="600"
                                fontFamily="Inter, system-ui, sans-serif"
                            >
                                5G MIMO
                            </text>
                        </g>

                        {/* 2. Wi-Fi 6E & Bluetooth (Center x = 236) */}
                        <g opacity={config.wifiBle ? 1 : 0.25} className="transition-opacity duration-200">
                            <rect x="229" y="42" width="14" height="46" rx="7" fill="#0f172a" />
                            <rect x="220" y="84" width="32" height="8" rx="3" fill="#475569" />
                            <text
                                x="236"
                                y="26"
                                textAnchor="middle"
                                fill="#0f172a"
                                fontSize="10.5"
                                fontWeight="600"
                                fontFamily="Inter, system-ui, sans-serif"
                            >
                                Wi-Fi / BLE
                            </text>
                        </g>

                        {/* 3. GNSS / RTK Multi-Band Puck (Center x = 344) */}
                        <g opacity={config.gnssRtk ? 1 : 0.25} className="transition-opacity duration-200">
                            <path d="M 320 84 C 320 62, 368 62, 368 84 Z" fill="#0f172a" />
                            <rect x="330" y="84" width="28" height="8" rx="3" fill="#475569" />
                            <text
                                x="344"
                                y="26"
                                textAnchor="middle"
                                fill="#0f172a"
                                fontSize="10.5"
                                fontWeight="600"
                                fontFamily="Inter, system-ui, sans-serif"
                            >
                                GNSS RTK
                            </text>
                        </g>

                        {/* 4. NTN Satellite Phased Dome (Center x = 468) */}
                        <g opacity={config.satelliteNtn ? 1 : 0.25} className="transition-opacity duration-200">
                            <path d="M 422 84 L 434 56 L 502 56 L 514 84 Z" fill="#0f172a" />
                            <rect x="448" y="84" width="40" height="8" rx="3" fill="#475569" />
                            <text
                                x="468"
                                y="26"
                                textAnchor="middle"
                                fill="#0f172a"
                                fontSize="10.5"
                                fontWeight="600"
                                fontFamily="Inter, system-ui, sans-serif"
                            >
                                NTN Satellite
                            </text>
                        </g>
                    </g>

                    {/* ================= SIDE SOLAR PANEL SILHOUETTE ================= */}
                    <g
                        onClick={(e) => handleTabClick('power', e)}
                        opacity={config.solarMppt ? 1 : 0.22}
                        className="cursor-pointer transition-opacity duration-200 hover:opacity-90"
                    >
                        <line x1="560" y1="210" x2="604" y2="210" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                        <line x1="560" y1="350" x2="604" y2="350" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                        <rect
                            x="604"
                            y="130"
                            width="124"
                            height="290"
                            rx="12"
                            fill="#f8fafc"
                            stroke={isPowerActive ? '#0284c7' : '#0f172a'}
                            strokeWidth={isPowerActive ? '2.25' : '2'}
                        />
                        <line x1="666" y1="146" x2="666" y2="374" stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1="618" y1="202" x2="714" y2="202" stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1="618" y1="260" x2="714" y2="260" stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1="618" y1="318" x2="714" y2="318" stroke="#cbd5e1" strokeWidth="1.5" />
                        <text
                            x="666"
                            y="400"
                            textAnchor="middle"
                            fill="#0f172a"
                            fontSize="11"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            Solar Array
                        </text>
                    </g>

                    {/* ================= MAIN ENCLOSURE CHASSIS ================= */}
                    {/* Outer NEMA 4X Shell */}
                    <rect
                        x="60"
                        y="90"
                        width="500"
                        height="370"
                        rx="18"
                        fill="#f8fafc"
                        stroke="#0f172a"
                        strokeWidth="2.5"
                    />

                    {/* Inner Sealed Backplate */}
                    <rect
                        x="76"
                        y="106"
                        width="468"
                        height="338"
                        rx="12"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                        strokeWidth="1.5"
                    />

                    {/* Minimal Door Hinges (Left) & Latches (Right) */}
                    <rect x="53" y="150" width="7" height="36" rx="3" fill="#475569" />
                    <rect x="53" y="364" width="7" height="36" rx="3" fill="#475569" />
                    <rect x="560" y="190" width="6" height="28" rx="3" fill="#475569" />
                    <rect x="560" y="330" width="6" height="28" rx="3" fill="#475569" />

                    {/* ================= RAIL 1 (UPPER HORIZONTAL RAIL) ================= */}
                    <line x1="88" y1="190" x2="532" y2="190" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />

                    {/* 1. Compute Module (x=92, width=148) */}
                    <g
                        transform="translate(92, 132)"
                        onClick={(e) => handleTabClick('compute', e)}
                        className="cursor-pointer"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="148"
                            height="116"
                            rx="10"
                            fill="#0f172a"
                            stroke={isComputeActive ? '#0284c7' : '#0f172a'}
                            strokeWidth={isComputeActive ? '2.25' : '1.75'}
                        />
                        <text
                            x="14"
                            y="26"
                            fill="#94a3b8"
                            fontSize="9.5"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            COMPUTE
                        </text>
                        <text
                            x="14"
                            y="48"
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {computeObj.name}
                        </text>
                        <text
                            x="14"
                            y="65"
                            fill="#94a3b8"
                            fontSize="10"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {storageObj.isOnboard ? 'Onboard ≤1TB NVMe' : 'Conduction Cooled'}
                        </text>
                        <rect x="14" y="78" width="72" height="24" rx="5" fill="#1e293b" />
                        <text
                            x="50"
                            y="94"
                            textAnchor="middle"
                            fill="#f8fafc"
                            fontSize="9.5"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {computeObj.tops}
                        </text>
                        {storageObj.isOnboard && (
                            <g
                                transform="translate(92, 78)"
                                onClick={(e) => handleTabClick('storage', e)}
                                className="cursor-pointer"
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    width="42"
                                    height="24"
                                    rx="5"
                                    fill="#334155"
                                    stroke={isStorageActive ? '#38bdf8' : 'none'}
                                    strokeWidth="1.5"
                                />
                                <text
                                    x="21"
                                    y="16"
                                    textAnchor="middle"
                                    fill="#e2e8f0"
                                    fontSize="9.5"
                                    fontWeight="600"
                                    fontFamily="Inter, system-ui, sans-serif"
                                >
                                    1TB
                                </text>
                            </g>
                        )}
                    </g>

                    {/* 2. Vision (PoE / GMSL2) & Network Switch Module (x=250, width=146) */}
                    <g
                        transform="translate(250, 132)"
                        onClick={(e) => handleTabClick('network', e)}
                        className="cursor-pointer"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="146"
                            height="116"
                            rx="10"
                            fill="#f8fafc"
                            stroke={isNetworkActive ? '#0284c7' : '#0f172a'}
                            strokeWidth={isNetworkActive ? '2.25' : '1.75'}
                        />
                        <text
                            x="14"
                            y="26"
                            fill="#64748b"
                            fontSize="9.5"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            VISION &amp; UPLINK
                        </text>
                        <text
                            x="14"
                            y="48"
                            fill="#0f172a"
                            fontSize="11.5"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {camerasObj.moduleLabel}
                        </text>
                        <text
                            x="14"
                            y="66"
                            fill="#475569"
                            fontSize="10.5"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {networkObj.shortLabel}
                        </text>

                        {/* Port Indicators: Circular Coax for GMSL2 + Rectangular RJ45 for PoE */}
                        <g transform="translate(14, 84)">
                            {Array.from({ length: totalCameras }).map((_, idx) => {
                                const isGmslPort = idx < gmslCount;
                                const xPos = idx * 14;
                                if (isGmslPort) {
                                    return (
                                        <g key={idx} transform={`translate(${xPos + 5}, 6)`}>
                                            <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.75" />
                                            <circle cx="0" cy="0" r="1.75" fill="#0f172a" />
                                        </g>
                                    );
                                }
                                return (
                                    <rect
                                        key={idx}
                                        x={xPos}
                                        y="0"
                                        width="9"
                                        height="12"
                                        rx="2"
                                        fill="#0f172a"
                                    />
                                );
                            })}
                        </g>
                    </g>

                    {/* 3. RF & Positioning Hub (x=406, width=122) */}
                    <g
                        transform="translate(406, 132)"
                        onClick={(e) => handleTabClick('connectivity', e)}
                        className="cursor-pointer"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="122"
                            height="116"
                            rx="10"
                            fill="#f8fafc"
                            stroke={isConnectivityActive ? '#0284c7' : hasAnyRf ? '#0f172a' : '#cbd5e1'}
                            strokeWidth={isConnectivityActive ? '2.25' : '1.75'}
                        />
                        <text
                            x="12"
                            y="26"
                            fill="#64748b"
                            fontSize="9.5"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            CONNECTIVITY
                        </text>

                        {/* Clean 2x2 Grid for 5G, NTN, Wi-Fi/BLE, GNSS RTK */}
                        <g transform="translate(11, 38)">
                            {rfModules.map((mod, idx) => {
                                const col = idx % 2;
                                const row = Math.floor(idx / 2);
                                return (
                                    <g key={mod.id} transform={`translate(${col * 52}, ${row * 34})`}>
                                        <rect
                                            x="0"
                                            y="0"
                                            width="48"
                                            height="28"
                                            rx="5"
                                            fill={mod.active ? '#0f172a' : '#ffffff'}
                                            stroke={mod.active ? '#0f172a' : '#e2e8f0'}
                                            strokeWidth="1.25"
                                        />
                                        <text
                                            x="24"
                                            y="18"
                                            textAnchor="middle"
                                            fill={mod.active ? '#ffffff' : '#94a3b8'}
                                            fontSize="9"
                                            fontWeight="600"
                                            fontFamily="Inter, system-ui, sans-serif"
                                        >
                                            {mod.label}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    </g>

                    {/* ================= RAIL 2 (LOWER HORIZONTAL RAIL) ================= */}
                    <line x1="88" y1="342" x2="532" y2="342" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />

                    {/* 1. Storage Bay (x=92, width=104) */}
                    <g
                        transform="translate(92, 284)"
                        onClick={(e) => handleTabClick('storage', e)}
                        className="cursor-pointer"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="104"
                            height="116"
                            rx="10"
                            fill={storageObj.isOnboard ? '#ffffff' : '#f8fafc'}
                            stroke={isStorageActive ? '#0284c7' : storageObj.isOnboard ? '#cbd5e1' : '#0f172a'}
                            strokeWidth={isStorageActive ? '2.25' : '1.75'}
                            strokeDasharray={storageObj.isOnboard && !isStorageActive ? '4 3' : undefined}
                        />
                        <text
                            x="12"
                            y="26"
                            fill="#64748b"
                            fontSize="9.5"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            STORAGE
                        </text>
                        {storageObj.isOnboard ? (
                            <>
                                <text
                                    x="12"
                                    y="50"
                                    fill="#0f172a"
                                    fontSize="11"
                                    fontWeight="600"
                                    fontFamily="Inter, system-ui, sans-serif"
                                >
                                    Onboard NVMe
                                </text>
                                <text
                                    x="12"
                                    y="68"
                                    fill="#64748b"
                                    fontSize="10"
                                    fontFamily="Inter, system-ui, sans-serif"
                                >
                                    Up to 1 TB
                                </text>
                                <text
                                    x="12"
                                    y="86"
                                    fill="#94a3b8"
                                    fontSize="9.5"
                                    fontFamily="Inter, system-ui, sans-serif"
                                >
                                    In Compute
                                </text>
                            </>
                        ) : (
                            <>
                                <text
                                    x="12"
                                    y="50"
                                    fill="#0f172a"
                                    fontSize="11.5"
                                    fontWeight="600"
                                    fontFamily="Inter, system-ui, sans-serif"
                                >
                                    {storageObj.capacity} RAID
                                </text>
                                <text
                                    x="12"
                                    y="68"
                                    fill="#475569"
                                    fontSize="10"
                                    fontFamily="Inter, system-ui, sans-serif"
                                >
                                    {storageObj.bays}x NVMe Bays
                                </text>
                                <g transform="translate(12, 82)">
                                    {Array.from({ length: storageObj.bays }).map((_, idx) => (
                                        <rect
                                            key={idx}
                                            x={idx * 20}
                                            y="0"
                                            width="15"
                                            height="14"
                                            rx="2.5"
                                            fill="#0f172a"
                                        />
                                    ))}
                                </g>
                            </>
                        )}
                    </g>

                    {/* 2. Industrial I/O Module: Serial/CAN + DIO/Analog (x=206, width=104) */}
                    <g
                        transform="translate(206, 284)"
                        onClick={(e) => handleTabClick('io', e)}
                        className="cursor-pointer"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="104"
                            height="116"
                            rx="10"
                            fill="#f8fafc"
                            stroke={isIoActive ? '#0284c7' : hasAnyIo ? '#0f172a' : '#cbd5e1'}
                            strokeWidth={isIoActive ? '2.25' : '1.75'}
                        />
                        <text
                            x="12"
                            y="26"
                            fill="#64748b"
                            fontSize="9.5"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            INDUSTRIAL I/O
                        </text>

                        {/* Serial & CAN Pill */}
                        <g transform="translate(10, 38)">
                            <rect
                                x="0"
                                y="0"
                                width="84"
                                height="28"
                                rx="5"
                                fill={config.serialCan ? '#0f172a' : '#ffffff'}
                                stroke={config.serialCan ? '#0f172a' : '#e2e8f0'}
                                strokeWidth="1.25"
                            />
                            <text
                                x="42"
                                y="18"
                                textAnchor="middle"
                                fill={config.serialCan ? '#ffffff' : '#94a3b8'}
                                fontSize="9.5"
                                fontWeight="600"
                                fontFamily="Inter, system-ui, sans-serif"
                            >
                                RS-232/485 CAN
                            </text>
                        </g>

                        {/* Digital & Analog I/O Pill */}
                        <g transform="translate(10, 72)">
                            <rect
                                x="0"
                                y="0"
                                width="84"
                                height="28"
                                rx="5"
                                fill={config.digitalAnalogIo ? '#0f172a' : '#ffffff'}
                                stroke={config.digitalAnalogIo ? '#0f172a' : '#e2e8f0'}
                                strokeWidth="1.25"
                            />
                            <text
                                x="42"
                                y="18"
                                textAnchor="middle"
                                fill={config.digitalAnalogIo ? '#ffffff' : '#94a3b8'}
                                fontSize="9.5"
                                fontWeight="600"
                                fontFamily="Inter, system-ui, sans-serif"
                            >
                                DIO &amp; Analog
                            </text>
                        </g>
                    </g>

                    {/* 3. Power & Reserve Bay — Non-overlapping 2x2 Grid (x=320, width=208) */}
                    <g
                        transform="translate(320, 284)"
                        onClick={(e) => handleTabClick('power', e)}
                        className="cursor-pointer"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="208"
                            height="116"
                            rx="10"
                            fill="#f8fafc"
                            stroke={isPowerActive ? '#0284c7' : '#0f172a'}
                            strokeWidth={isPowerActive ? '2.25' : '1.75'}
                        />
                        <text
                            x="12"
                            y="26"
                            fill="#64748b"
                            fontSize="9.5"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            POWER &amp; RESERVE
                        </text>

                        <g transform="translate(12, 38)">
                            {powerModules.map((mod, idx) => {
                                const col = idx % 2;
                                const row = Math.floor(idx / 2);
                                return (
                                    <g key={mod.id} transform={`translate(${col * 95}, ${row * 34})`}>
                                        <rect
                                            x="0"
                                            y="0"
                                            width="89"
                                            height="28"
                                            rx="5"
                                            fill={mod.active ? '#0f172a' : '#ffffff'}
                                            stroke={mod.active ? '#0f172a' : '#e2e8f0'}
                                            strokeWidth="1.25"
                                        />
                                        <text
                                            x="44.5"
                                            y="18"
                                            textAnchor="middle"
                                            fill={mod.active ? '#ffffff' : '#94a3b8'}
                                            fontSize="9.5"
                                            fontWeight="600"
                                            fontFamily="Inter, system-ui, sans-serif"
                                        >
                                            {mod.label}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    </g>

                    {/* ================= BOTTOM GLAND PLATE & PORT INDICATORS ================= */}
                    <rect x="88" y="460" width="444" height="10" rx="4" fill="#0f172a" />

                    {/* 1. Camera Gland Indicators (Center x = 152) */}
                    <g
                        onClick={(e) => handleTabClick('network', e)}
                        className="cursor-pointer"
                    >
                        <rect x="92" y="468" width="120" height="46" fill="transparent" />
                        <g transform={`translate(${152 - (totalCameras * 14 - 4) / 2}, 470)`}>
                            {Array.from({ length: totalCameras }).map((_, idx) => {
                                const isGmslPort = idx < gmslCount;
                                return (
                                    <rect
                                        key={idx}
                                        x={idx * 14}
                                        y="0"
                                        width="10"
                                        height="16"
                                        rx={isGmslPort ? '5' : '2.5'}
                                        fill={isGmslPort ? '#ffffff' : '#0f172a'}
                                        stroke="#0f172a"
                                        strokeWidth={isGmslPort ? '2' : '0'}
                                    />
                                );
                            })}
                        </g>
                        <text
                            x="152"
                            y="506"
                            textAnchor="middle"
                            fill={isNetworkActive ? '#0284c7' : '#334155'}
                            fontSize="10.5"
                            fontWeight={isNetworkActive ? '600' : '500'}
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {camerasObj.glandLabel}
                        </text>
                    </g>

                    {/* 2. Network Uplink Gland Indicators (Center x = 276) */}
                    <g
                        onClick={(e) => handleTabClick('network', e)}
                        className="cursor-pointer"
                    >
                        <rect x="236" y="468" width="80" height="46" fill="transparent" />
                        <rect x="260" y="470" width="14" height="16" rx="2.5" fill="#334155" />
                        <rect x="278" y="470" width="14" height="16" rx="2.5" fill="#334155" />
                        <text
                            x="276"
                            y="506"
                            textAnchor="middle"
                            fill={isNetworkActive ? '#0284c7' : '#334155'}
                            fontSize="10.5"
                            fontWeight={isNetworkActive ? '600' : '500'}
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {isFiber ? '10G Fiber' : is10GbE ? '10GbE LAN' : 'Dual 1GbE'}
                        </text>
                    </g>

                    {/* 3. Serial / CAN / I/O Gland Indicators (Center x = 382) */}
                    <g
                        opacity={hasAnyIo ? 1 : 0.35}
                        onClick={(e) => handleTabClick('io', e)}
                        className="cursor-pointer"
                    >
                        <rect x="336" y="468" width="92" height="46" fill="transparent" />
                        <rect
                            x="366"
                            y="470"
                            width="14"
                            height="16"
                            rx="2.5"
                            fill={config.serialCan ? '#0f172a' : '#94a3b8'}
                        />
                        <rect
                            x="384"
                            y="470"
                            width="14"
                            height="16"
                            rx="2.5"
                            fill={config.digitalAnalogIo ? '#0f172a' : '#94a3b8'}
                        />
                        <text
                            x="382"
                            y="506"
                            textAnchor="middle"
                            fill={isIoActive ? '#0284c7' : '#334155'}
                            fontSize="10.5"
                            fontWeight={isIoActive ? '600' : '500'}
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            Serial / CAN / I/O
                        </text>
                    </g>

                    {/* 4. Power Gland Indicators (Center x = 486) */}
                    <g
                        onClick={(e) => handleTabClick('power', e)}
                        className="cursor-pointer"
                    >
                        <rect x="446" y="468" width="80" height="46" fill="transparent" />
                        <rect x="470" y="470" width="14" height="16" rx="2.5" fill="#475569" />
                        {(config.solarMppt || config.alternatorDc || config.shoreAc) && (
                            <rect x="488" y="470" width="14" height="16" rx="2.5" fill="#475569" />
                        )}
                        <text
                            x="486"
                            y="506"
                            textAnchor="middle"
                            fill={isPowerActive ? '#0284c7' : '#334155'}
                            fontSize="10.5"
                            fontWeight={isPowerActive ? '600' : '500'}
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            Power Inputs
                        </text>
                    </g>
                </svg>
            </div>

            <p className="mt-3 border-t border-aim-100 pt-3 text-[11px] leading-relaxed text-aim-400">
                * Visual representation only. Not all module combinations fit within a single standard enclosure footprint—our engineering team reviews every configuration for thermal, power, and physical compatibility.
            </p>
        </div>
    );
}
