export const COMPUTE_OPTIONS = [
    {
        id: 'compact',
        name: 'Compact AI Node',
        subtitle: '40 TOPS • Low-power edge inference',
        shortLabel: 'Compact 40 TOPS',
        tops: '40 TOPS',
        chassisUnits: 1,
    },
    {
        id: 'midrange',
        name: 'Multi-Stream AI Module',
        subtitle: '150 TOPS • 4–8 stream HD vision',
        shortLabel: 'Multi-Stream 150 TOPS',
        tops: '150 TOPS',
        chassisUnits: 2,
    },
    {
        id: 'cluster',
        name: 'Industrial GPU Cluster',
        subtitle: '275–550 TOPS • Multi-sensor & LiDAR fusion',
        shortLabel: 'GPU Cluster 550 TOPS',
        tops: '550 TOPS',
        chassisUnits: 3,
    },
    {
        id: 'thor',
        name: 'Jetson Thor AI Module',
        subtitle: 'Up to 2,070 TOPS • Physical AI & multi-modal',
        shortLabel: 'Jetson Thor 2,070 TOPS',
        tops: '2,070 TOPS',
        chassisUnits: 4,
    },
];

export const CAMERA_PORT_OPTIONS = [
    {
        id: 'cam-2x',
        name: '2x PoE+ Vision Ports',
        subtitle: '60W budget • Dual sealed M12/RJ45 glands',
        shortLabel: '2x PoE+ Cameras',
        poeCount: 2,
        gmslCount: 0,
        moduleLabel: '2x PoE+ Switch',
        glandLabel: '2x Camera PoE',
    },
    {
        id: 'cam-4x',
        name: '4x PoE+ Managed Switch',
        subtitle: '120W budget • Quad sealed M12/RJ45 glands',
        shortLabel: '4x PoE+ Cameras',
        poeCount: 4,
        gmslCount: 0,
        moduleLabel: '4x PoE+ Switch',
        glandLabel: '4x Camera PoE',
    },
    {
        id: 'cam-4x-gmsl',
        name: '4x GMSL2 Coax Ports',
        subtitle: 'Low-latency SerDes • Quad sealed FAKRA coax',
        shortLabel: '4x GMSL2 Coax',
        poeCount: 0,
        gmslCount: 4,
        moduleLabel: '4x GMSL2 SerDes',
        glandLabel: '4x GMSL2 FAKRA',
    },
    {
        id: 'cam-8x-hybrid',
        name: '4x GMSL2 + 4x PoE+ Hybrid',
        subtitle: 'GMSL2 deserializer + managed PoE+ switch',
        shortLabel: '4x GMSL2 + 4x PoE+',
        poeCount: 4,
        gmslCount: 4,
        moduleLabel: '4x GMSL2 + 4x PoE+',
        glandLabel: '4x GMSL2 + 4x PoE',
    },
    {
        id: 'cam-8x',
        name: '8x PoE++ Sensor Array',
        subtitle: '240W budget • High-power PTZ & LiDAR',
        shortLabel: '8x PoE++ Cameras',
        poeCount: 8,
        gmslCount: 0,
        moduleLabel: '8x PoE++ Switch',
        glandLabel: '8x Camera PoE++',
    },
];

export const NETWORK_OPTIONS = [
    {
        id: 'net-2gbe',
        name: 'Dual 1GbE Copper',
        subtitle: 'Redundant RJ45 LAN/WAN uplink',
        shortLabel: 'Dual 1GbE RJ45',
    },
    {
        id: 'net-10gbe',
        name: '10GbE High-Speed Copper',
        subtitle: '10GBASE-T trunk + 1GbE management',
        shortLabel: '10GbE Copper',
    },
    {
        id: 'net-sfp',
        name: 'Dual 10G Fiber SFP+',
        subtitle: 'EMI-immune optical LC uplink',
        shortLabel: 'Dual 10G Fiber',
    },
];

export const INDUSTRIAL_IO_OPTIONS = {
    serialCan: {
        id: 'serialCan',
        name: 'Serial & CAN Bus Interface',
        subtitle: 'Isolated RS-232 / RS-485 & CAN bus (J1939)',
        shortLabel: 'RS-232/485 + CAN',
    },
    digitalAnalogIo: {
        id: 'digitalAnalogIo',
        name: 'Digital & Analog I/O Block',
        subtitle: 'Isolated DIO, 4–20mA & 0–10V sensor I/O',
        shortLabel: 'Digital & Analog I/O',
    },
};

export const CONNECTIVITY_OPTIONS = {
    cellular5g: {
        id: 'cellular5g',
        name: '5G Dual-SIM Cellular',
        subtitle: 'Sub-6GHz modem + MIMO antennas',
        shortLabel: '5G Cellular',
    },
    satelliteNtn: {
        id: 'satelliteNtn',
        name: 'NTN Satellite Uplink',
        subtitle: 'Low-profile satellite dome failover',
        shortLabel: 'NTN Satellite',
    },
    wifiBle: {
        id: 'wifiBle',
        name: 'Wi-Fi 6E & Bluetooth 5.3',
        subtitle: 'Local wireless AP/client & BLE gateway',
        shortLabel: 'Wi-Fi 6E + BLE',
    },
    gnssRtk: {
        id: 'gnssRtk',
        name: 'GNSS (Multi-Band GPS / RTK)',
        subtitle: 'High-precision L1/L2/L5 positioning',
        shortLabel: 'GNSS / RTK GPS',
    },
};

export const POWER_OPTIONS = {
    batteryPack: {
        id: 'batteryPack',
        name: 'Internal LiFePO4 UPS Battery',
        subtitle: '1.2kWh self-heating backup reserve',
        shortLabel: 'LiFePO4 Battery',
    },
    solarMppt: {
        id: 'solarMppt',
        name: 'Solar Array + MPPT Controller',
        subtitle: 'Off-grid solar panel & charge controller',
        shortLabel: 'Solar + MPPT',
    },
    alternatorDc: {
        id: 'alternatorDc',
        name: 'Vehicle / Vessel DC-DC Input',
        subtitle: 'Isolated 12/24/48V alternator conditioning',
        shortLabel: 'Alternator DC-DC',
    },
    shoreAc: {
        id: 'shoreAc',
        name: 'Grid / Shore AC-DC Supply',
        subtitle: '120/240V AC industrial DIN supply',
        shortLabel: 'Grid AC-DC',
    },
};

export const STORAGE_OPTIONS = [
    {
        id: 'onboard-1tb',
        name: 'Onboard Storage (Up to 1 TB)',
        subtitle: 'Integrated NVMe on compute module',
        shortLabel: 'Onboard ≤1TB NVMe',
        capacity: 'Up to 1 TB',
        bays: 0,
        isOnboard: true,
    },
    {
        id: 'nvme-4tb',
        name: '4 TB Mirrored NVMe RAID',
        subtitle: 'Dual-bay redundant DIN storage module',
        shortLabel: '4 TB RAID',
        capacity: '4 TB',
        bays: 2,
        isOnboard: false,
    },
    {
        id: 'nvme-8tb',
        name: '8 TB+ Removable RAID Bay',
        subtitle: 'Quad hot-swap raw dataset shuttle',
        shortLabel: '8 TB+ RAID Shuttle',
        capacity: '8 TB+',
        bays: 4,
        isOnboard: false,
    },
];

export const SECTORS = [
    {
        id: 'agriculture',
        name: 'Agriculture',
        summary: 'Real-time crop grading, implement vision, CAN/ISOBUS telemetry, and off-grid field monitoring.',
    },
    {
        id: 'defense',
        name: 'Defense',
        summary: 'Tactical multi-sensor ISR nodes, perimeter security, and resilient satellite backhaul.',
    },
    {
        id: 'maritime',
        name: 'Maritime',
        summary: 'Corrosion-sealed deck safety, vessel NMEA/CAN telemetry, and offshore surveillance.',
    },
    {
        id: 'industrial',
        name: 'Industrial',
        summary: 'Washdown-rated machine vision, defect detection, and direct PLC/SCADA I/O integration.',
    },
    {
        id: 'energy-mining',
        name: 'Energy & Mining',
        summary: 'Autonomous haul-road inspection, substation thermal monitoring, and pipeline security.',
    },
    {
        id: 'smart-infra',
        name: 'Smart Infrastructure',
        summary: 'Highway corridor analytics, bridge monitoring, and remote utility sensor telemetry.',
    },
    {
        id: 'autonomous-fleet',
        name: 'Autonomous Fleet & Rail',
        summary: 'Vibration-damped onboard GMSL2/PoE compute, RTK positioning, and CAN bus integration.',
    },
    {
        id: 'environmental-security',
        name: 'Environmental & Perimeter',
        summary: 'Off-grid solar sentry nodes for early wildfire detection and remote perimeter security.',
    },
];

export const DEFAULT_CONFIG = {
    sector: 'agriculture',
    compute: 'midrange',
    cameras: 'cam-4x',
    network: 'net-2gbe',
    serialCan: true,
    digitalAnalogIo: false,
    cellular5g: true,
    satelliteNtn: true,
    wifiBle: false,
    gnssRtk: true,
    batteryPack: true,
    solarMppt: true,
    alternatorDc: true,
    shoreAc: false,
    storage: 'onboard-1tb',
};

export function resolveConfigDetails(config) {
    const sectorObj = SECTORS.find((s) => s.id === config.sector) || SECTORS[0];
    const computeObj = COMPUTE_OPTIONS.find((c) => c.id === config.compute) || COMPUTE_OPTIONS[1];
    const camerasObj = CAMERA_PORT_OPTIONS.find((c) => c.id === config.cameras) || CAMERA_PORT_OPTIONS[1];
    const networkObj = NETWORK_OPTIONS.find((n) => n.id === config.network) || NETWORK_OPTIONS[0];
    const storageObj = STORAGE_OPTIONS.find((s) => s.id === config.storage) || STORAGE_OPTIONS[0];

    const activeIndustrialIo = [];
    if (config.serialCan) activeIndustrialIo.push(INDUSTRIAL_IO_OPTIONS.serialCan);
    if (config.digitalAnalogIo) activeIndustrialIo.push(INDUSTRIAL_IO_OPTIONS.digitalAnalogIo);

    const activeConnectivity = [];
    if (config.cellular5g) activeConnectivity.push(CONNECTIVITY_OPTIONS.cellular5g);
    if (config.satelliteNtn) activeConnectivity.push(CONNECTIVITY_OPTIONS.satelliteNtn);
    if (config.wifiBle) activeConnectivity.push(CONNECTIVITY_OPTIONS.wifiBle);
    if (config.gnssRtk) activeConnectivity.push(CONNECTIVITY_OPTIONS.gnssRtk);

    const activePower = [];
    if (config.batteryPack) activePower.push(POWER_OPTIONS.batteryPack);
    if (config.solarMppt) activePower.push(POWER_OPTIONS.solarMppt);
    if (config.alternatorDc) activePower.push(POWER_OPTIONS.alternatorDc);
    if (config.shoreAc) activePower.push(POWER_OPTIONS.shoreAc);

    const selectedPills = [
        computeObj.shortLabel,
        camerasObj.shortLabel,
        networkObj.shortLabel,
        ...activeIndustrialIo.map((io) => io.shortLabel),
        ...(activeConnectivity.length > 0
            ? activeConnectivity.map((c) => c.shortLabel)
            : ['Wired LAN Only']),
        ...(activePower.length > 0
            ? activePower.map((p) => p.shortLabel)
            : ['24V DC Input']),
        storageObj.shortLabel,
    ];

    const summaryText = [
        `Sector: ${sectorObj.name}`,
        `Compute: ${computeObj.name} (${computeObj.tops})`,
        `Cameras: ${camerasObj.name}`,
        `Network: ${networkObj.name}`,
        `Industrial I/O: ${
            activeIndustrialIo.length > 0
                ? activeIndustrialIo.map((io) => io.name).join(' + ')
                : 'None'
        }`,
        `Connectivity: ${
            activeConnectivity.length > 0
                ? activeConnectivity.map((c) => c.name).join(' + ')
                : 'Wired LAN Only'
        }`,
        `Power: ${
            activePower.length > 0
                ? activePower.map((p) => p.name).join(' + ')
                : 'External 24V DC'
        }`,
        `Storage: ${storageObj.name}`,
    ].join('\n');

    return {
        sectorObj,
        computeObj,
        camerasObj,
        networkObj,
        storageObj,
        activeIndustrialIo,
        activeConnectivity,
        activePower,
        selectedPills,
        summaryText,
    };
}
