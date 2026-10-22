import React from 'react';
import { resolveConfigDetails } from '../data/enclosureConfig';

export default function EnclosureVisualizer({ config, activeHighlight = null }) {
    const details = resolveConfigDetails(config);
    const { computeObj, camerasObj, networkObj, storageObj } = details;

    const cameraCount = camerasObj.count;
    const computeUnits = computeObj.chassisUnits; // 1, 2, or 3
    const storageBays = storageObj.bays; // 1, 2, or 4
    const isFiber = networkObj.id === 'net-sfp';
    const is10GbE = networkObj.id === 'net-10gbe';

    // Compute module width on Upper DIN Rail (x from 170 to 440)
    const computeWidth = computeUnits === 1 ? 115 : computeUnits === 2 ? 168 : 228;
    const poeSwitchWidth = cameraCount === 2 ? 84 : cameraCount === 4 ? 112 : 154;

    return (
        <div className="relative overflow-hidden rounded-2xl border border-aim-800 bg-aim-950 p-4 shadow-xl sm:p-6">
            {/* Top status bar inside schematic frame */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-aim-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <span className="font-mono text-xs font-semibold tracking-wider text-aim-200">
                        NEMA 4X / IP67 SCHEMATIC CAD VIEW
                    </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-aim-700 bg-aim-900 px-2.5 py-0.5 font-mono text-[11px] text-aim-300">
                        SKU: {details.buildCode}
                    </span>
                    <span className="rounded border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                        {computeObj.tops}
                    </span>
                </div>
            </div>

            {/* Interactive SVG CAD Diagram */}
            <div className="relative mx-auto w-full">
                <svg
                    viewBox="0 0 860 760"
                    className="h-auto w-full select-none"
                    role="img"
                    aria-label="Interactive NEMA 4X IP67 Edge AI Enclosure Schematic"
                >
                    <defs>
                        {/* Blueprint Grid Pattern */}
                        <pattern id="cadGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                            <path
                                d="M 24 0 L 0 0 0 24"
                                fill="none"
                                stroke="#1e293b"
                                strokeWidth="0.7"
                            />
                        </pattern>
                        <pattern id="solarCellGrid" width="22" height="28" patternUnits="userSpaceOnUse">
                            <rect width="20" height="26" x="1" y="1" rx="2" fill="#0f2942" stroke="#38bdf8" strokeWidth="0.6" strokeOpacity="0.45" />
                            <line x1="11" y1="1" x2="11" y2="27" stroke="#38bdf8" strokeWidth="0.3" strokeOpacity="0.3" />
                        </pattern>
                        <linearGradient id="enclosureBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>
                        <linearGradient id="backplateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#090d16" />
                        </linearGradient>
                        <linearGradient id="dinRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#64748b" />
                            <stop offset="50%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#475569" />
                        </linearGradient>
                        <linearGradient id="heatsinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="50%" stopColor="#334155" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                    </defs>

                    {/* Background Blueprint Grid */}
                    <rect x="0" y="0" width="860" height="760" rx="12" fill="#020617" />
                    <rect x="0" y="0" width="860" height="760" rx="12" fill="url(#cadGrid)" />

                    {/* ================= POLE / WALL MOUNTING STRUCTURE ================= */}
                    {/* Vertical Galvanized Mast / Pole behind enclosure */}
                    <g id="pole-mount-structure">
                        <rect x="355" y="12" width="60" height="736" fill="#0f172a" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 2" />
                        <text x="385" y="742" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">
                            GALVANIZED POLE / WALL MAST
                        </text>
                        {/* Top & Bottom Stainless Wall/Pole Flanges */}
                        <rect x="200" y="102" width="370" height="18" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
                        <circle cx="220" cy="111" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" />
                        <circle cx="550" cy="111" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" />
                        <text x="385" y="114" textAnchor="middle" fill="#e2e8f0" fontSize="8.5" fontFamily="monospace" letterSpacing="1">
                            316L STAINLESS POLE / WALL MOUNT BRACKET
                        </text>

                        <rect x="200" y="618" width="370" height="18" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
                        <circle cx="220" cy="627" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" />
                        <circle cx="550" cy="627" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" />
                    </g>

                    {/* ================= EXTERNAL SOLAR PANEL ARRAY (WHEN SELECTED) ================= */}
                    {config.solarMppt ? (
                        <g id="external-solar-array">
                            {/* Articulated Cantilever Solar Arm */}
                            <path
                                d="M 650 230 L 705 230 L 725 195"
                                fill="none"
                                stroke="#94a3b8"
                                strokeWidth="5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M 650 430 L 705 430 L 725 450"
                                fill="none"
                                stroke="#64748b"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            {/* Hinged Solar Frame */}
                            <g transform="translate(692, 135)">
                                <rect
                                    x="0"
                                    y="0"
                                    width="150"
                                    height="355"
                                    rx="6"
                                    fill="#091929"
                                    stroke="#38bdf8"
                                    strokeWidth="2"
                                />
                                <rect
                                    x="8"
                                    y="8"
                                    width="134"
                                    height="312"
                                    rx="3"
                                    fill="url(#solarCellGrid)"
                                    stroke="#0284c7"
                                    strokeWidth="1"
                                />
                                <rect x="10" y="326" width="130" height="20" rx="3" fill="#0f172a" />
                                <text x="75" y="339" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                                    SOLAR PV ARRAY (400-800W)
                                </text>
                            </g>
                            {/* Armored PV Conduit routing down to bottom gland plate */}
                            <path
                                d="M 765 490 L 765 685 L 552 685 L 552 645"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="3"
                                strokeDasharray="6 3"
                            />
                            <text x="762" y="512" textAnchor="end" fill="#fbbf24" fontSize="8.5" fontFamily="monospace">
                                PV DC FEED
                            </text>
                        </g>
                    ) : (
                        <g id="solar-unselected-hint" opacity="0.45">
                            <rect
                                x="702"
                                y="180"
                                width="136"
                                height="250"
                                rx="6"
                                fill="none"
                                stroke="#334155"
                                strokeWidth="1.2"
                                strokeDasharray="5 5"
                            />
                            <text x="770" y="300" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
                                OPTIONAL SOLAR
                            </text>
                            <text x="770" y="314" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
                                ARRAY MOUNT
                            </text>
                        </g>
                    )}

                    {/* ================= TOP EXTERNAL ANTENNAS (5G MIMO & NTN SATELLITE) ================= */}
                    {/* 5G MIMO Antennas (Left & Right N-Type Bulkheads) */}
                    {config.cellular5g ? (
                        <g id="external-5g-antennas">
                            {/* Left 5G Primary MIMO Blade */}
                            <rect x="172" y="106" width="22" height="14" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
                            <path d="M 176 106 L 173 28 C 173 20 193 20 193 28 L 190 106 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6" />
                            <line x1="183" y1="34" x2="183" y2="96" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" />
                            {/* Signal waves */}
                            <path d="M 162 38 Q 152 50 162 62" fill="none" stroke="#38bdf8" strokeWidth="1.3" opacity="0.8" />
                            <path d="M 155 32 Q 142 50 155 68" fill="none" stroke="#38bdf8" strokeWidth="1.1" opacity="0.5" />

                            {/* Second 5G Diversity MIMO Blade */}
                            <rect x="234" y="106" width="22" height="14" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
                            <path d="M 238 106 L 235 34 C 235 26 255 26 255 34 L 252 106 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6" />
                            <line x1="245" y1="40" x2="245" y2="96" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" />
                            <path d="M 266 38 Q 276 50 266 62" fill="none" stroke="#38bdf8" strokeWidth="1.3" opacity="0.8" />

                            <rect x="150" y="6" width="128" height="16" rx="3" fill="#082f49" stroke="#0284c7" strokeWidth="1" />
                            <text x="214" y="17" textAnchor="middle" fill="#7dd3fc" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                                4x4 MIMO 5G NR ANTENNAS
                            </text>
                        </g>
                    ) : (
                        <g opacity="0.4">
                            <rect x="175" y="112" width="18" height="8" rx="1" fill="#334155" />
                            <rect x="237" y="112" width="18" height="8" rx="1" fill="#334155" />
                            <text x="215" y="96" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
                                N-TYPE CAPS (NO 5G)
                            </text>
                        </g>
                    )}

                    {/* NTN Satellite Radome / Phased Array on Top Right */}
                    {config.satelliteNtn ? (
                        <g id="external-ntn-antenna">
                            {/* Heavy-duty N-Type + Mount Pedestal */}
                            <rect x="488" y="96" width="44" height="24" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.2" />
                            {/* Flat-Panel / Low-Profile Phased Array Radome */}
                            <path
                                d="M 426 96 L 442 54 L 578 54 L 594 96 Z"
                                fill="#0f172a"
                                stroke="#a855f7"
                                strokeWidth="2"
                            />
                            <line x1="450" y1="74" x2="570" y2="74" stroke="#c084fc" strokeWidth="1.2" strokeDasharray="6 3" />
                            {/* Satellite Uplink Beam */}
                            <path d="M 485 44 Q 510 30 535 44" fill="none" stroke="#c084fc" strokeWidth="1.5" />
                            <path d="M 472 34 Q 510 16 548 34" fill="none" stroke="#c084fc" strokeWidth="1.2" opacity="0.65" />
                            <rect x="438" y="6" width="144" height="16" rx="3" fill="#2e1065" stroke="#9333ea" strokeWidth="1" />
                            <text x="510" y="17" textAnchor="middle" fill="#e9d5ff" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                                NTN SATELLITE PHASED RADOME
                            </text>
                        </g>
                    ) : (
                        <g opacity="0.4">
                            <rect x="498" y="112" width="24" height="8" rx="1" fill="#334155" />
                            <text x="510" y="96" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
                                AUX PORT SEALED
                            </text>
                        </g>
                    )}

                    {/* ================= MAIN NEMA 4X / IP67 HINGED ENCLOSURE BODY ================= */}
                    {/* Left Heavy-Duty Continuous Hinge Bar */}
                    <g id="enclosure-hinges">
                        <rect x="96" y="148" width="14" height="44" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.2" />
                        <rect x="96" y="345" width="14" height="44" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.2" />
                        <rect x="96" y="542" width="14" height="44" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.2" />
                        <text
                            x="88"
                            y="368"
                            textAnchor="middle"
                            fill="#94a3b8"
                            fontSize="8.5"
                            fontFamily="monospace"
                            transform="rotate(-90, 88, 368)"
                        >
                            316SS HINGED DOOR SIDE
                        </text>
                    </g>

                    {/* Side Thermal Extrusion Heatsink Fins (Right Side Wall) */}
                    <g id="side-heatsink-fins">
                        {Array.from({ length: computeUnits === 3 ? 14 : computeUnits === 2 ? 10 : 6 }).map((_, idx) => (
                            <rect
                                key={idx}
                                x="660"
                                y={175 + idx * 14}
                                width={computeUnits === 3 ? 22 : computeUnits === 2 ? 16 : 11}
                                height="8"
                                rx="1"
                                fill="#475569"
                                stroke="#94a3b8"
                                strokeWidth="0.8"
                            />
                        ))}
                        <text
                            x="692"
                            y="265"
                            fill="#94a3b8"
                            fontSize="8"
                            fontFamily="monospace"
                            transform="rotate(90, 692, 265)"
                        >
                            CONDUCTION HEATSINK FINS
                        </text>
                    </g>

                    {/* Outer NEMA 4X Steel/Polycarbonate Shell */}
                    <rect
                        x="110"
                        y="120"
                        width="550"
                        height="500"
                        rx="12"
                        fill="url(#enclosureBodyGrad)"
                        stroke="#94a3b8"
                        strokeWidth="3"
                    />

                    {/* Polyurethane Pour-in-Place Door Gasket Perimeter */}
                    <rect
                        x="122"
                        y="132"
                        width="526"
                        height="476"
                        rx="8"
                        fill="url(#backplateGrad)"
                        stroke="#0ea5e9"
                        strokeWidth="1.5"
                        strokeDasharray="8 3"
                    />

                    {/* Quarter-Turn Compression Latches (Right Wall) */}
                    <rect x="648" y="210" width="14" height="32" rx="2" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.2" />
                    <circle cx="655" cy="226" r="3.5" fill="#0f172a" />
                    <rect x="648" y="495" width="14" height="32" rx="2" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.2" />
                    <circle cx="655" cy="511" r="3.5" fill="#0f172a" />

                    {/* Internal Slotted Wiring Ducts (Left, Right, and Center Horizontal) */}
                    <rect x="132" y="146" width="16" height="445" fill="#1e293b" stroke="#475569" strokeWidth="1" strokeDasharray="2 3" />
                    <rect x="622" y="146" width="16" height="445" fill="#1e293b" stroke="#475569" strokeWidth="1" strokeDasharray="2 3" />
                    <rect x="148" y="302" width="474" height="12" fill="#1e293b" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" />
                    <rect x="148" y="446" width="474" height="12" fill="#1e293b" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" />

                    {/* Top Status LED & Telemetry Bar inside Enclosure */}
                    <g id="internal-status-bar">
                        <rect x="154" y="142" width="462" height="22" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                        <circle cx="170" cy="153" r="4" fill="#22c55e" />
                        <text x="180" y="156" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">
                            PWR OK
                        </text>
                        <circle cx="230" cy="153" r="4" fill="#38bdf8" />
                        <text x="240" y="156" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">
                            AI NPU ACTIVE
                        </text>
                        <circle cx="322" cy="153" r="4" fill={config.cellular5g || config.satelliteNtn ? '#a855f7' : '#64748b'} />
                        <text x="332" y="156" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">
                            {config.satelliteNtn && config.cellular5g
                                ? '5G + NTN DUAL-LINK'
                                : config.satelliteNtn
                                ? 'NTN SAT LINK'
                                : config.cellular5g
                                ? '5G NR LINK'
                                : 'LOCAL LAN ONLY'}
                        </text>
                        <text x="606" y="156" textAnchor="end" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
                            IP67 / NEMA 4X SEALED
                        </text>
                    </g>

                    {/* ================= DIN RAIL 1 (UPPER: EDGE AI COMPUTE + RF COMMS) ================= */}
                    <g id="din-rail-upper">
                        {/* 35mm Top-Hat DIN Rail */}
                        <rect x="150" y="218" width="470" height="24" fill="url(#dinRailGrad)" stroke="#334155" strokeWidth="1" />
                        <line x1="156" y1="230" x2="614" y2="230" stroke="#1e293b" strokeWidth="4" strokeDasharray="12 8" />
                        <text x="156" y="178" fill="#64748b" fontSize="8" fontFamily="monospace">
                            DIN RAIL 01 // HIGH-SPEED COMPUTE &amp; RF BACKHAUL
                        </text>

                        {/* EDGE AI COMPUTE MODULE */}
                        <g id="module-compute" transform="translate(162, 182)">
                            <rect
                                x="0"
                                y="0"
                                width={computeWidth}
                                height="112"
                                rx="6"
                                fill="#0f172a"
                                stroke="#38bdf8"
                                strokeWidth="2.2"
                            />
                            {/* Heatsink fins across top of compute module */}
                            <rect x="8" y="8" width={computeWidth - 16} height="22" rx="2" fill="url(#heatsinkGrad)" stroke="#475569" strokeWidth="0.8" />
                            {Array.from({ length: computeUnits * 6 }).map((_, i) => (
                                <line
                                    key={i}
                                    x1={14 + i * ((computeWidth - 28) / (computeUnits * 6))}
                                    y1="8"
                                    x2={14 + i * ((computeWidth - 28) / (computeUnits * 6))}
                                    y2="30"
                                    stroke="#94a3b8"
                                    strokeWidth="1.2"
                                />
                            ))}

                            {/* Compute Labels & Active Fans/Blades */}
                            <text x="12" y="46" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold">
                                {computeObj.shortName}
                            </text>
                            <text x="12" y="60" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                                {computeObj.code} • {computeObj.tops}
                            </text>
                            <text x="12" y="74" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                                Thermal: {computeObj.powerDraw}
                            </text>

                            {/* GPU Cluster Dual Fan / Heatpipe Indicator */}
                            {computeUnits >= 2 && (
                                <g transform={`translate(${computeWidth - 46}, 42)`}>
                                    <circle cx="18" cy="18" r="15" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                                    <circle cx="18" cy="18" r="4" fill="#38bdf8" />
                                    <line x1="18" y1="3" x2="18" y2="33" stroke="#38bdf8" strokeWidth="1" />
                                    <line x1="3" y1="18" x2="33" y2="18" stroke="#38bdf8" strokeWidth="1" />
                                </g>
                            )}
                            {computeUnits === 3 && (
                                <g transform={`translate(${computeWidth - 84}, 42)`}>
                                    <circle cx="18" cy="18" r="15" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                                    <circle cx="18" cy="18" r="4" fill="#38bdf8" />
                                    <line x1="18" y1="3" x2="18" y2="33" stroke="#38bdf8" strokeWidth="1" />
                                    <line x1="3" y1="18" x2="33" y2="18" stroke="#38bdf8" strokeWidth="1" />
                                </g>
                            )}

                            {/* Bottom PCIe / M.2 & RJ45 Status Ports */}
                            <rect x="12" y="84" width="38" height="18" rx="2" fill="#0284c7" />
                            <text x="31" y="96" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                                AI NPU
                            </text>
                            <rect x="56" y="84" width="48" height="18" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                            <text x="80" y="96" textAnchor="middle" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">
                                {computeUnits}x BLADE
                            </text>
                        </g>

                        {/* 5G CELLULAR MODEM ON DIN RAIL 1 */}
                        {config.cellular5g && (
                            <g id="module-5g-router" transform="translate(404, 184)">
                                <rect
                                    x="0"
                                    y="0"
                                    width="96"
                                    height="108"
                                    rx="5"
                                    fill="#0c192c"
                                    stroke="#0ea5e9"
                                    strokeWidth="1.8"
                                />
                                <rect x="8" y="8" width="80" height="14" rx="2" fill="#0369a1" />
                                <text x="48" y="18" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                    5G DUAL-SIM
                                </text>
                                <text x="10" y="36" fill="#7dd3fc" fontSize="8" fontFamily="monospace">
                                    RF-5G-MIMO
                                </text>
                                <text x="10" y="49" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
                                    SIM1 + SIM2
                                </text>
                                {/* Coax Pigtails up to Top Bulkhead */}
                                <path d="M 24 0 L 24 -32 L -222 -32 L -222 -64" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                                <path d="M 68 0 L 68 -26 L -158 -26 L -158 -64" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                                {/* LEDs */}
                                <circle cx="16" cy="68" r="3" fill="#22c55e" />
                                <circle cx="28" cy="68" r="3" fill="#38bdf8" />
                                <circle cx="40" cy="68" r="3" fill="#38bdf8" />
                                <rect x="10" y="82" width="76" height="16" rx="2" fill="#1e293b" />
                                <text x="48" y="93" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">
                                    4x SMA COAX
                                </text>
                            </g>
                        )}

                        {/* NTN SATELLITE TRANSCEIVER MODULE ON DIN RAIL 1 */}
                        {config.satelliteNtn && (
                            <g id="module-ntn-modem" transform="translate(512, 184)">
                                <rect
                                    x="0"
                                    y="0"
                                    width="98"
                                    height="108"
                                    rx="5"
                                    fill="#1e1035"
                                    stroke="#a855f7"
                                    strokeWidth="1.8"
                                />
                                <rect x="8" y="8" width="82" height="14" rx="2" fill="#7e22ce" />
                                <text x="49" y="18" textAnchor="middle" fill="#f3e8ff" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                    NTN SATCOM
                                </text>
                                <text x="10" y="36" fill="#d8b4fe" fontSize="8" fontFamily="monospace">
                                    RF-NTN-SAT
                                </text>
                                <text x="10" y="49" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">
                                    LEO / GEO LINK
                                </text>
                                {/* Coax Pigtail to Top Radome */}
                                <path d="M 48 0 L 48 -64" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 2" />
                                <circle cx="16" cy="68" r="3" fill="#c084fc" />
                                <circle cx="28" cy="68" r="3" fill="#22c55e" />
                                <rect x="10" y="82" width="78" height="16" rx="2" fill="#0f172a" />
                                <text x="49" y="93" textAnchor="middle" fill="#d8b4fe" fontSize="7.5" fontFamily="monospace">
                                    SAT TX/RX IF
                                </text>
                            </g>
                        )}
                    </g>

                    {/* ================= DIN RAIL 2 (MIDDLE: POE CAMERA SWITCH + UPLINK NIC + STORAGE BAY) ================= */}
                    <g id="din-rail-middle">
                        {/* 35mm Top-Hat DIN Rail */}
                        <rect x="150" y="366" width="470" height="24" fill="url(#dinRailGrad)" stroke="#334155" strokeWidth="1" />
                        <line x1="156" y1="378" x2="614" y2="378" stroke="#1e293b" strokeWidth="4" strokeDasharray="12 8" />
                        <text x="156" y="328" fill="#64748b" fontSize="8" fontFamily="monospace">
                            DIN RAIL 02 // RUGGED POE+/++ VISION SWITCH, UPLINK &amp; NVME RAID STORAGE
                        </text>

                        {/* RUGGED POE+/POE++ SWITCH MODULE */}
                        <g id="module-poe-switch" transform="translate(162, 334)">
                            <rect
                                x="0"
                                y="0"
                                width={poeSwitchWidth}
                                height="104"
                                rx="5"
                                fill="#0f172a"
                                stroke="#10b981"
                                strokeWidth="2"
                            />
                            <rect x="8" y="8" width={poeSwitchWidth - 16} height="15" rx="2" fill="#065f46" />
                            <text
                                x={poeSwitchWidth / 2}
                                y="18"
                                textAnchor="middle"
                                fill="#d1fae5"
                                fontSize="8"
                                fontFamily="monospace"
                                fontWeight="bold"
                            >
                                {camerasObj.shortName}
                            </text>

                            <text x="10" y="36" fill="#6ee7b7" fontSize="8" fontFamily="monospace">
                                {camerasObj.poeBudget}
                            </text>

                            {/* Render Visual PoE Port Jacks inside the Switch */}
                            <g transform="translate(10, 46)">
                                {Array.from({ length: cameraCount }).map((_, idx) => {
                                    const col = idx % 4;
                                    const row = Math.floor(idx / 4);
                                    return (
                                        <g key={idx} transform={`translate(${col * 32}, ${row * 24})`}>
                                            <rect
                                                x="0"
                                                y="0"
                                                width="26"
                                                height="18"
                                                rx="2"
                                                fill="#1e293b"
                                                stroke="#10b981"
                                                strokeWidth="1.2"
                                            />
                                            <circle cx="6" cy="5" r="1.8" fill="#22c55e" />
                                            <circle cx="20" cy="5" r="1.8" fill="#fbbf24" />
                                            <text x="13" y="15" textAnchor="middle" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace">
                                                P{idx + 1}
                                            </text>
                                        </g>
                                    );
                                })}
                            </g>
                        </g>

                        {/* OPTICAL SFP+ OR 10GBE/2GBE NETWORK INTERFACE MODULE */}
                        <g id="module-network-uplink" transform={`translate(${174 + poeSwitchWidth}, 334)`}>
                            <rect
                                x="0"
                                y="0"
                                width="118"
                                height="104"
                                rx="5"
                                fill="#0f172a"
                                stroke="#06b6d4"
                                strokeWidth="1.8"
                            />
                            <rect x="8" y="8" width="102" height="15" rx="2" fill="#155e75" />
                            <text x="59" y="18" textAnchor="middle" fill="#cffafe" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                {networkObj.code}
                            </text>
                            <text x="10" y="36" fill="#67e8f9" fontSize="8" fontFamily="monospace">
                                {networkObj.shortName}
                            </text>
                            <text x="10" y="48" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
                                {isFiber ? 'Optical LC Duplex' : is10GbE ? '10GBASE-T Shielded' : 'Dual 1GbE Bypass'}
                            </text>

                            {/* Uplink Transceiver Cages */}
                            <rect x="14" y="60" width="40" height="28" rx="2" fill="#164e63" stroke="#22d3ee" strokeWidth="1.2" />
                            <text x="34" y="77" textAnchor="middle" fill="#ecfeff" fontSize="7.5" fontFamily="monospace">
                                {isFiber ? 'SFP+ 1' : is10GbE ? '10GbE' : 'WAN 1'}
                            </text>
                            <rect x="64" y="60" width="40" height="28" rx="2" fill="#164e63" stroke="#22d3ee" strokeWidth="1.2" />
                            <text x="84" y="77" textAnchor="middle" fill="#ecfeff" fontSize="7.5" fontFamily="monospace">
                                {isFiber ? 'SFP+ 2' : 'LAN 2'}
                            </text>
                        </g>

                        {/* INDUSTRIAL NVME SSD RAID BAY */}
                        <g id="module-storage-bay" transform="translate(462, 334)">
                            <rect
                                x="0"
                                y="0"
                                width="148"
                                height="104"
                                rx="5"
                                fill="#0f172a"
                                stroke="#f59e0b"
                                strokeWidth="2"
                            />
                            <rect x="8" y="8" width="132" height="15" rx="2" fill="#78350f" />
                            <text x="74" y="18" textAnchor="middle" fill="#fef3c7" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                NVME STORAGE ({storageObj.capacity})
                            </text>
                            <text x="10" y="35" fill="#fcd34d" fontSize="7.5" fontFamily="monospace">
                                {storageObj.shortName}
                            </text>

                            {/* Render 1, 2, or 4 Removable Rugged SSD Sleds */}
                            <g transform="translate(10, 44)">
                                {Array.from({ length: storageBays }).map((_, idx) => {
                                    const sledWidth = storageBays === 1 ? 128 : storageBays === 2 ? 60 : 29;
                                    const sledGap = storageBays === 1 ? 0 : storageBays === 2 ? 8 : 4;
                                    return (
                                        <g key={idx} transform={`translate(${idx * (sledWidth + sledGap)}, 0)`}>
                                            <rect
                                                x="0"
                                                y="0"
                                                width={sledWidth}
                                                height="48"
                                                rx="2"
                                                fill="#1e293b"
                                                stroke="#f59e0b"
                                                strokeWidth="1.2"
                                            />
                                            <circle cx={sledWidth / 2} cy="10" r="2.2" fill="#22c55e" />
                                            <rect
                                                x="4"
                                                y="18"
                                                width={sledWidth - 8}
                                                height="14"
                                                rx="1"
                                                fill="#0f172a"
                                            />
                                            <text
                                                x={sledWidth / 2}
                                                y="28"
                                                textAnchor="middle"
                                                fill="#fde68a"
                                                fontSize="6.5"
                                                fontFamily="monospace"
                                            >
                                                NVMe{idx + 1}
                                            </text>
                                        </g>
                                    );
                                })}
                            </g>
                        </g>
                    </g>

                    {/* ================= LOWER BAY: POWER CONDITIONING & LIFEPO4 BATTERY BANK ================= */}
                    <g id="lower-power-bay">
                        <text x="156" y="472" fill="#64748b" fontSize="8" fontFamily="monospace">
                            LOWER POWER BAY // LIFEPO4 UPS, SOLAR MPPT, VEHICLE DC-DC &amp; GRID AC-DC
                        </text>

                        {/* LIFEPO4 BATTERY BANK (Left Lower Bay) */}
                        {config.batteryPack ? (
                            <g id="module-battery-pack" transform="translate(162, 482)">
                                <rect
                                    x="0"
                                    y="0"
                                    width="184"
                                    height="112"
                                    rx="6"
                                    fill="#052e16"
                                    stroke="#22c55e"
                                    strokeWidth="2"
                                />
                                <rect x="10" y="10" width="164" height="18" rx="3" fill="#14532d" />
                                <text x="92" y="22" textAnchor="middle" fill="#dcfce7" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                                    24V LiFePO4 UPS BATTERY BANK
                                </text>
                                <text x="12" y="43" fill="#86efac" fontSize="8" fontFamily="monospace">
                                    1.2kWh Self-Heating BMS (-35°C)
                                </text>
                                {/* Battery Cells Visual */}
                                {[0, 1, 2, 3].map((cell) => (
                                    <rect
                                        key={cell}
                                        x={12 + cell * 40}
                                        y="52"
                                        width="34"
                                        height="46"
                                        rx="3"
                                        fill="#0f172a"
                                        stroke="#22c55e"
                                        strokeWidth="1.2"
                                    />
                                ))}
                                <text x="92" y="80" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace" fontWeight="bold">
                                    100% SOC • PROTECTED
                                </text>
                            </g>
                        ) : (
                            <g transform="translate(162, 482)" opacity="0.45">
                                <rect
                                    x="0"
                                    y="0"
                                    width="184"
                                    height="112"
                                    rx="6"
                                    fill="none"
                                    stroke="#475569"
                                    strokeWidth="1.2"
                                    strokeDasharray="4 4"
                                />
                                <text x="92" y="54" textAnchor="middle" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                                    BATTERY BAY UNPOPULATED
                                </text>
                                <text x="92" y="68" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="monospace">
                                    (Direct External Power Only)
                                </text>
                            </g>
                        )}

                        {/* Lower Right DIN Rail for Power Supplies & Charge Controllers */}
                        <rect x="358" y="522" width="256" height="20" fill="url(#dinRailGrad)" stroke="#334155" strokeWidth="1" />

                        {/* SOLAR MPPT CONTROLLER */}
                        {config.solarMppt && (
                            <g id="module-solar-mppt" transform="translate(364, 482)">
                                <rect
                                    x="0"
                                    y="0"
                                    width="76"
                                    height="112"
                                    rx="5"
                                    fill="#271705"
                                    stroke="#f59e0b"
                                    strokeWidth="1.8"
                                />
                                <rect x="6" y="8" width="64" height="14" rx="2" fill="#b45309" />
                                <text x="38" y="18" textAnchor="middle" fill="#fef3c7" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                                    MPPT 30A
                                </text>
                                <text x="38" y="40" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="monospace">
                                    SOLAR CHG
                                </text>
                                <circle cx="38" cy="64" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.2" />
                                <text x="38" y="67" textAnchor="middle" fill="#fde68a" fontSize="7" fontFamily="monospace">
                                    PV
                                </text>
                                <text x="38" y="96" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">
                                    PWR-SOL
                                </text>
                            </g>
                        )}

                        {/* ALTERNATOR / VEHICLE DC-DC CHARGER */}
                        {config.alternatorDc && (
                            <g id="module-alternator-dcdc" transform="translate(448, 482)">
                                <rect
                                    x="0"
                                    y="0"
                                    width="76"
                                    height="112"
                                    rx="5"
                                    fill="#0f172a"
                                    stroke="#38bdf8"
                                    strokeWidth="1.8"
                                />
                                <rect x="6" y="8" width="64" height="14" rx="2" fill="#0369a1" />
                                <text x="38" y="18" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                                    DC-DC ISO
                                </text>
                                <text x="38" y="40" textAnchor="middle" fill="#7dd3fc" fontSize="7.5" fontFamily="monospace">
                                    12/24/48V
                                </text>
                                <text x="38" y="54" textAnchor="middle" fill="#cbd5e1" fontSize="7" fontFamily="monospace">
                                    ALT + IGN
                                </text>
                                <rect x="14" y="68" width="48" height="20" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                                <text x="38" y="81" textAnchor="middle" fill="#bae6fd" fontSize="7" fontFamily="monospace">
                                    ISO-7637
                                </text>
                            </g>
                        )}

                        {/* SHORE / GRID AC-DC INDUSTRIAL PSU */}
                        {config.shoreAc && (
                            <g id="module-shore-ac" transform="translate(532, 482)">
                                <rect
                                    x="0"
                                    y="0"
                                    width="78"
                                    height="112"
                                    rx="5"
                                    fill="#18181b"
                                    stroke="#e2e8f0"
                                    strokeWidth="1.8"
                                />
                                <rect x="6" y="8" width="66" height="14" rx="2" fill="#3f3f46" />
                                <text x="39" y="18" textAnchor="middle" fill="#f8fafc" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                                    AC-DC PSU
                                </text>
                                <text x="39" y="40" textAnchor="middle" fill="#e2e8f0" fontSize="7.5" fontFamily="monospace">
                                    120/240VAC
                                </text>
                                <text x="39" y="54" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">
                                    480W DIN
                                </text>
                                <rect x="15" y="68" width="48" height="20" rx="2" fill="#27272a" stroke="#a1a1aa" strokeWidth="1" />
                                <text x="39" y="81" textAnchor="middle" fill="#f4f4f5" fontSize="7" fontFamily="monospace">
                                    SURGE SPD
                                </text>
                            </g>
                        )}
                    </g>

                    {/* ================= BOTTOM WATERPROOF GLAND PLATE (M12 / RJ45 / SFP / POWER GLANDS) ================= */}
                    <g id="bottom-gland-plate">
                        {/* Stainless Gland Plate Flange */}
                        <rect
                            x="136"
                            y="620"
                            width="498"
                            height="22"
                            rx="3"
                            fill="#475569"
                            stroke="#cbd5e1"
                            strokeWidth="1.5"
                        />
                        <text x="385" y="614" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontFamily="monospace" fontWeight="bold">
                            IP68 BOTTOM GLAND PLATE // M12 X-CODED, FIBER/RJ45 UPLINK &amp; ARMORED POWER GLANDS
                        </text>

                        {/* 1. CAMERA POE PORTS (Left cluster on gland plate) */}
                        <g id="gland-camera-ports">
                            {Array.from({ length: cameraCount }).map((_, idx) => {
                                const spacing = cameraCount === 8 ? 24 : 34;
                                const startX = 152 + idx * spacing;
                                return (
                                    <g key={idx}>
                                        {/* Threaded M12 / IP68 Gland Body */}
                                        <rect
                                            x={startX}
                                            y="642"
                                            width="18"
                                            height="28"
                                            rx="2"
                                            fill="#065f46"
                                            stroke="#34d399"
                                            strokeWidth="1.2"
                                        />
                                        <rect x={startX + 4} y="670" width="10" height="14" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
                                        <line x1={startX + 9} y1="684" x2={startX + 9} y2="710" stroke="#10b981" strokeWidth="2.2" />
                                        <text
                                            x={startX + 9}
                                            y="659"
                                            textAnchor="middle"
                                            fill="#ecfdf5"
                                            fontSize="6.5"
                                            fontFamily="monospace"
                                        >
                                            C{idx + 1}
                                        </text>
                                    </g>
                                );
                            })}
                            <text
                                x={152 + (cameraCount * (cameraCount === 8 ? 24 : 34)) / 2 - 6}
                                y="725"
                                textAnchor="middle"
                                fill="#6ee7b7"
                                fontSize="8.5"
                                fontFamily="monospace"
                                fontWeight="bold"
                            >
                                {cameraCount}x IP68 CAMERA POE
                            </text>
                        </g>

                        {/* 2. NETWORK UPLINK GLANDS (Center cluster on gland plate) */}
                        <g id="gland-network-ports" transform="translate(368, 642)">
                            {[0, 1].map((portIdx) => (
                                <g key={portIdx} transform={`translate(${portIdx * 38}, 0)`}>
                                    <rect
                                        x="0"
                                        y="0"
                                        width="26"
                                        height="30"
                                        rx="3"
                                        fill="#155e75"
                                        stroke="#22d3ee"
                                        strokeWidth="1.4"
                                    />
                                    <rect x="6" y="30" width="14" height="14" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                                    <line
                                        x1="13"
                                        y1="44"
                                        x2="13"
                                        y2="68"
                                        stroke="#22d3ee"
                                        strokeWidth="2.5"
                                        strokeDasharray={isFiber ? '4 2' : 'none'}
                                    />
                                    <text x="13" y="19" textAnchor="middle" fill="#ecfeff" fontSize="7" fontFamily="monospace">
                                        {isFiber ? `F${portIdx + 1}` : `N${portIdx + 1}`}
                                    </text>
                                </g>
                            ))}
                            <text x="32" y="83" textAnchor="middle" fill="#67e8f9" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                                {isFiber ? '2x 10G FIBER SFP+' : is10GbE ? '10GbE + 1GbE' : '2x 1GbE RJ45'}
                            </text>
                        </g>

                        {/* 3. POWER INPUT GLANDS (Right cluster on gland plate) */}
                        <g id="gland-power-inputs">
                            {/* Vehicle Alternator Gland */}
                            {config.alternatorDc && (
                                <g transform="translate(476, 642)">
                                    <rect x="0" y="0" width="26" height="30" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.4" />
                                    <line x1="13" y1="30" x2="13" y2="68" stroke="#38bdf8" strokeWidth="3" />
                                    <text x="13" y="19" textAnchor="middle" fill="#e0f2fe" fontSize="7" fontFamily="monospace">
                                        ALT
                                    </text>
                                    <text x="13" y="83" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontFamily="monospace">
                                        DC IN
                                    </text>
                                </g>
                            )}

                            {/* Solar PV Input Gland */}
                            {config.solarMppt && (
                                <g transform="translate(536, 642)">
                                    <rect x="0" y="0" width="26" height="30" rx="3" fill="#b45309" stroke="#fbbf24" strokeWidth="1.4" />
                                    <text x="13" y="19" textAnchor="middle" fill="#fef3c7" fontSize="7" fontFamily="monospace">
                                        PV
                                    </text>
                                    <text x="13" y="83" textAnchor="middle" fill="#fcd34d" fontSize="8" fontFamily="monospace">
                                        SOLAR
                                    </text>
                                </g>
                            )}

                            {/* Shore / Grid AC Input Gland */}
                            {config.shoreAc && (
                                <g transform="translate(592, 642)">
                                    <rect x="0" y="0" width="28" height="30" rx="3" fill="#3f3f46" stroke="#f4f4f5" strokeWidth="1.4" />
                                    <line x1="14" y1="30" x2="14" y2="68" stroke="#e4e4e7" strokeWidth="3" />
                                    <text x="14" y="19" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace">
                                        AC
                                    </text>
                                    <text x="14" y="83" textAnchor="middle" fill="#e4e4e7" fontSize="8" fontFamily="monospace">
                                        GRID AC
                                    </text>
                                </g>
                            )}
                        </g>
                    </g>
                </svg>
            </div>

            {/* Bottom Live Telemetry Strip */}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-aim-800/80 pt-3 sm:grid-cols-4">
                <div className="rounded-lg bg-aim-900/90 px-3 py-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-aim-400">Compute &amp; Thermal</p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-white">{computeObj.shortName}</p>
                </div>
                <div className="rounded-lg bg-aim-900/90 px-3 py-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-aim-400">Gland I/O Ports</p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-emerald-300">
                        {cameraCount}x Cam + {networkObj.shortName}
                    </p>
                </div>
                <div className="rounded-lg bg-aim-900/90 px-3 py-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-aim-400">RF &amp; Backhaul</p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-sky-300">
                        {details.activeConnectivity.length > 0
                            ? details.activeConnectivity.map((c) => (c.id === 'cellular5g' ? '5G MIMO' : 'NTN Sat')).join(' + ')
                            : 'Wired LAN Only'}
                    </p>
                </div>
                <div className="rounded-lg bg-aim-900/90 px-3 py-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-aim-400">Storage &amp; Power</p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-amber-300">
                        {storageObj.capacity} NVMe • {details.activePower.length}x Power Src
                    </p>
                </div>
            </div>
        </div>
    );
}
