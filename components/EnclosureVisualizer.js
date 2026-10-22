import React from 'react';
import { resolveConfigDetails } from '../data/enclosureConfig';

export default function EnclosureVisualizer({ config }) {
    const details = resolveConfigDetails(config);
    const { computeObj, camerasObj, networkObj, storageObj } = details;

    const cameraCount = camerasObj.count;
    const isFiber = networkObj.id === 'net-sfp';
    const is10GbE = networkObj.id === 'net-10gbe';

    const activePowerModules = [
        config.batteryPack && { id: 'battery', label: 'LiFePO4 UPS', sub: '1.2 kWh Reserve' },
        config.solarMppt && { id: 'solar', label: 'Solar MPPT', sub: 'Charge Controller' },
        config.alternatorDc && { id: 'alt', label: 'DC-DC Input', sub: '12 / 24 / 48V' },
        config.shoreAc && { id: 'ac', label: 'AC-DC Supply', sub: '120 / 240V Grid' },
    ].filter(Boolean);

    return (
        <div className="rounded-2xl border border-aim-200 bg-white p-6 shadow-sm">
            {/* Minimal Header */}
            <div className="mb-4 flex items-center justify-between border-b border-aim-100 pb-4">
                <div>
                    <h3 className="text-sm font-semibold text-aim-900">
                        Enclosure Architecture
                    </h3>
                    <p className="text-xs text-aim-500">
                        NEMA 4X / IP67 Sealed Chassis • {details.sectorObj.name} Preset
                    </p>
                </div>
                <span className="rounded-full border border-aim-200 bg-aim-50 px-3 py-1 text-xs font-medium text-aim-700">
                    {computeObj.tops}
                </span>
            </div>

            {/* Clean Architectural Diagram */}
            <div className="mx-auto w-full">
                <svg
                    viewBox="0 0 760 540"
                    className="h-auto w-full select-none"
                    role="img"
                    aria-label="EdgeForge Enclosure Diagram"
                >
                    {/* ================= TOP ANTENNAS (5G & NTN SATELLITE) ================= */}
                    {/* 5G Cellular Antennas */}
                    <g opacity={config.cellular5g ? 1 : 0.22} className="transition-opacity duration-200">
                        <rect x="148" y="34" width="16" height="54" rx="8" fill="#0f172a" />
                        <rect x="184" y="42" width="16" height="46" rx="8" fill="#0f172a" />
                        <rect x="144" y="84" width="60" height="8" rx="3" fill="#475569" />
                        <text
                            x="174"
                            y="24"
                            textAnchor="middle"
                            fill="#0f172a"
                            fontSize="11"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            5G MIMO
                        </text>
                    </g>

                    {/* NTN Satellite Dome */}
                    <g opacity={config.satelliteNtn ? 1 : 0.22} className="transition-opacity duration-200">
                        <path
                            d="M 380 86 C 380 54, 480 54, 480 86 Z"
                            fill="#0f172a"
                        />
                        <rect x="412" y="84" width="36" height="8" rx="3" fill="#475569" />
                        <text
                            x="430"
                            y="46"
                            textAnchor="middle"
                            fill="#0f172a"
                            fontSize="11"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            NTN Satellite
                        </text>
                    </g>

                    {/* ================= SIDE SOLAR PANEL SILHOUETTE ================= */}
                    <g opacity={config.solarMppt ? 1 : 0.18} className="transition-opacity duration-200">
                        {/* Clean mounting arm */}
                        <line x1="560" y1="210" x2="604" y2="210" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                        <line x1="560" y1="350" x2="604" y2="350" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                        {/* Solar panel silhouette */}
                        <rect
                            x="604"
                            y="130"
                            width="124"
                            height="290"
                            rx="12"
                            fill="#f8fafc"
                            stroke="#0f172a"
                            strokeWidth="2"
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
                    {/* Rail Bar */}
                    <line x1="92" y1="196" x2="528" y2="196" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />

                    {/* Compute Module */}
                    <g transform="translate(96, 132)">
                        <rect
                            x="0"
                            y="0"
                            width="168"
                            height="116"
                            rx="10"
                            fill="#0f172a"
                        />
                        <text
                            x="16"
                            y="30"
                            fill="#94a3b8"
                            fontSize="10"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            COMPUTE
                        </text>
                        <text
                            x="16"
                            y="54"
                            fill="#ffffff"
                            fontSize="13"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {computeObj.name}
                        </text>
                        <rect x="16" y="74" width="84" height="24" rx="6" fill="#1e293b" />
                        <text
                            x="58"
                            y="90"
                            textAnchor="middle"
                            fill="#f8fafc"
                            fontSize="11"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {computeObj.tops}
                        </text>
                    </g>

                    {/* PoE Vision & Network Switch Module */}
                    <g transform="translate(278, 132)">
                        <rect
                            x="0"
                            y="0"
                            width="134"
                            height="116"
                            rx="10"
                            fill="#f8fafc"
                            stroke="#0f172a"
                            strokeWidth="1.75"
                        />
                        <text
                            x="14"
                            y="28"
                            fill="#64748b"
                            fontSize="10"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            VISION &amp; UPLINK
                        </text>
                        <text
                            x="14"
                            y="50"
                            fill="#0f172a"
                            fontSize="12"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {cameraCount}x PoE Ports
                        </text>
                        <text
                            x="14"
                            y="70"
                            fill="#475569"
                            fontSize="11"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {networkObj.shortLabel}
                        </text>
                        {/* Clean Port Dots */}
                        <g transform="translate(14, 86)">
                            {Array.from({ length: cameraCount }).map((_, idx) => (
                                <rect
                                    key={idx}
                                    x={idx * 13}
                                    y="0"
                                    width="9"
                                    height="12"
                                    rx="2.5"
                                    fill="#0f172a"
                                />
                            ))}
                        </g>
                    </g>

                    {/* Wireless Backhaul Module */}
                    <g transform="translate(426, 132)">
                        <rect
                            x="0"
                            y="0"
                            width="98"
                            height="116"
                            rx="10"
                            fill={config.cellular5g || config.satelliteNtn ? '#f8fafc' : '#ffffff'}
                            stroke={config.cellular5g || config.satelliteNtn ? '#0f172a' : '#cbd5e1'}
                            strokeWidth="1.75"
                        />
                        <text
                            x="14"
                            y="28"
                            fill="#64748b"
                            fontSize="10"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            RF MODEM
                        </text>
                        <text
                            x="14"
                            y="52"
                            fill="#0f172a"
                            fontSize="12"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {config.cellular5g && config.satelliteNtn
                                ? '5G + Sat'
                                : config.cellular5g
                                ? '5G Cellular'
                                : config.satelliteNtn
                                ? 'NTN Sat'
                                : 'Wired Only'}
                        </text>
                        <text
                            x="14"
                            y="72"
                            fill="#64748b"
                            fontSize="11"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {config.cellular5g && config.satelliteNtn
                                ? 'Dual Failover'
                                : config.cellular5g || config.satelliteNtn
                                ? 'Active Link'
                                : 'Bypass'}
                        </text>
                    </g>

                    {/* ================= RAIL 2 (LOWER HORIZONTAL RAIL) ================= */}
                    {/* Rail Bar */}
                    <line x1="92" y1="348" x2="528" y2="348" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />

                    {/* NVMe Storage Module */}
                    <g transform="translate(96, 284)">
                        <rect
                            x="0"
                            y="0"
                            width="136"
                            height="116"
                            rx="10"
                            fill="#f8fafc"
                            stroke="#0f172a"
                            strokeWidth="1.75"
                        />
                        <text
                            x="14"
                            y="28"
                            fill="#64748b"
                            fontSize="10"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            STORAGE
                        </text>
                        <text
                            x="14"
                            y="52"
                            fill="#0f172a"
                            fontSize="13"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {storageObj.capacity} NVMe
                        </text>
                        <text
                            x="14"
                            y="70"
                            fill="#475569"
                            fontSize="11"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {storageObj.bays}x RAID {storageObj.bays > 1 ? 'Bays' : 'Bay'}
                        </text>
                        {/* Clean drive bay indicators */}
                        <g transform="translate(14, 84)">
                            {Array.from({ length: storageObj.bays }).map((_, idx) => (
                                <rect
                                    key={idx}
                                    x={idx * 26}
                                    y="0"
                                    width="20"
                                    height="14"
                                    rx="3"
                                    fill="#0f172a"
                                />
                            ))}
                        </g>
                    </g>

                    {/* Power & UPS Bay */}
                    <g transform="translate(246, 284)">
                        <rect
                            x="0"
                            y="0"
                            width="278"
                            height="116"
                            rx="10"
                            fill="#f8fafc"
                            stroke="#0f172a"
                            strokeWidth="1.75"
                        />
                        <text
                            x="16"
                            y="28"
                            fill="#64748b"
                            fontSize="10"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            POWER &amp; RESERVE
                        </text>

                        {activePowerModules.length > 0 ? (
                            <g transform="translate(16, 42)">
                                {activePowerModules.map((mod, idx) => {
                                    const count = activePowerModules.length;
                                    const boxWidth = Math.floor((246 - (count - 1) * 8) / count);
                                    return (
                                        <g key={mod.id} transform={`translate(${idx * (boxWidth + 8)}, 0)`}>
                                            <rect
                                                x="0"
                                                y="0"
                                                width={boxWidth}
                                                height="56"
                                                rx="6"
                                                fill="#ffffff"
                                                stroke="#cbd5e1"
                                                strokeWidth="1.25"
                                            />
                                            <text
                                                x={boxWidth / 2}
                                                y="25"
                                                textAnchor="middle"
                                                fill="#0f172a"
                                                fontSize="10.5"
                                                fontWeight="600"
                                                fontFamily="Inter, system-ui, sans-serif"
                                            >
                                                {mod.label}
                                            </text>
                                            <text
                                                x={boxWidth / 2}
                                                y="42"
                                                textAnchor="middle"
                                                fill="#64748b"
                                                fontSize="9.5"
                                                fontFamily="Inter, system-ui, sans-serif"
                                            >
                                                {mod.sub}
                                            </text>
                                        </g>
                                    );
                                })}
                            </g>
                        ) : (
                            <text
                                x="16"
                                y="64"
                                fill="#64748b"
                                fontSize="12"
                                fontFamily="Inter, system-ui, sans-serif"
                            >
                                Direct 24V DC Input
                            </text>
                        )}
                    </g>

                    {/* ================= BOTTOM GLAND PLATE & PORT INDICATORS ================= */}
                    <rect x="104" y="460" width="412" height="10" rx="4" fill="#0f172a" />

                    {/* Camera Gland Indicators (Left) */}
                    <g transform="translate(120, 470)">
                        {Array.from({ length: cameraCount }).map((_, idx) => (
                            <rect
                                key={idx}
                                x={idx * 18}
                                y="0"
                                width="12"
                                height="18"
                                rx="3"
                                fill="#0f172a"
                            />
                        ))}
                        <text
                            x={Math.max(36, (cameraCount * 18) / 2 - 3)}
                            y="36"
                            textAnchor="middle"
                            fill="#334155"
                            fontSize="11"
                            fontWeight="500"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {cameraCount}x Camera PoE
                        </text>
                    </g>

                    {/* Network Uplink Gland Indicators (Center) */}
                    <g transform="translate(310, 470)">
                        <rect x="0" y="0" width="16" height="18" rx="3" fill="#334155" />
                        <rect x="22" y="0" width="16" height="18" rx="3" fill="#334155" />
                        <text
                            x="19"
                            y="36"
                            textAnchor="middle"
                            fill="#334155"
                            fontSize="11"
                            fontWeight="500"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {isFiber ? '10G Fiber' : is10GbE ? '10GbE LAN' : 'Dual 1GbE'}
                        </text>
                    </g>

                    {/* Power Gland Indicators (Right) */}
                    <g transform="translate(432, 470)">
                        <rect x="0" y="0" width="16" height="18" rx="3" fill="#475569" />
                        {(config.solarMppt || config.alternatorDc || config.shoreAc) && (
                            <rect x="22" y="0" width="16" height="18" rx="3" fill="#475569" />
                        )}
                        <text
                            x="19"
                            y="36"
                            textAnchor="middle"
                            fill="#334155"
                            fontSize="11"
                            fontWeight="500"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            Power Inputs
                        </text>
                    </g>
                </svg>
            </div>
        </div>
    );
}
