export const COMPUTE_OPTIONS = [
    {
        id: 'compact',
        name: 'Compact AI Node',
        subtitle: '40 TOPS • Fanless low-power inference',
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
        subtitle: '275+ TOPS • Multi-modal & LiDAR fusion',
        shortLabel: 'GPU Cluster 275+ TOPS',
        tops: '275+ TOPS',
        chassisUnits: 3,
    },
];

export const CAMERA_PORT_OPTIONS = [
    {
        id: 'cam-2x',
        name: '2x PoE+ Vision Ports',
        subtitle: '60W budget • Dual IP68 glands',
        shortLabel: '2x PoE+ Cameras',
        count: 2,
    },
    {
        id: 'cam-4x',
        name: '4x PoE+ Managed Switch',
        subtitle: '120W budget • Quad IP68 glands',
        shortLabel: '4x PoE+ Cameras',
        count: 4,
    },
    {
        id: 'cam-8x',
        name: '8x PoE++ Sensor Array',
        subtitle: '240W budget • PTZ & LiDAR ready',
        shortLabel: '8x PoE++ Cameras',
        count: 8,
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
        id: 'nvme-1tb',
        name: '1 TB Industrial NVMe',
        subtitle: 'Wide-temp SSD for rolling buffer',
        shortLabel: '1 TB NVMe',
        capacity: '1 TB',
        bays: 1,
    },
    {
        id: 'nvme-4tb',
        name: '4 TB Mirrored RAID',
        subtitle: 'Dual-bay redundant video retention',
        shortLabel: '4 TB RAID',
        capacity: '4 TB',
        bays: 2,
    },
    {
        id: 'nvme-8tb',
        name: '8 TB+ Removable Shuttle',
        subtitle: 'Quad hot-swap raw dataset logging',
        shortLabel: '8 TB+ RAID Shuttle',
        capacity: '8 TB+',
        bays: 4,
    },
];

export const SECTORS = [
    {
        id: 'agriculture',
        name: 'Agriculture',
        summary: 'Real-time crop grading, implement vision, and off-grid field mast monitoring.',
        preset: {
            compute: 'midrange',
            cameras: 'cam-4x',
            network: 'net-2gbe',
            cellular5g: true,
            satelliteNtn: true,
            batteryPack: true,
            solarMppt: true,
            alternatorDc: true,
            shoreAc: false,
            storage: 'nvme-4tb',
        },
    },
    {
        id: 'defense',
        name: 'Defense',
        summary: 'Tactical multi-sensor ISR nodes, perimeter security, and resilient satellite backhaul.',
        preset: {
            compute: 'cluster',
            cameras: 'cam-8x',
            network: 'net-sfp',
            cellular5g: true,
            satelliteNtn: true,
            batteryPack: true,
            solarMppt: true,
            alternatorDc: true,
            shoreAc: false,
            storage: 'nvme-8tb',
        },
    },
    {
        id: 'maritime',
        name: 'Maritime',
        summary: 'Corrosion-sealed deck safety, vessel telemetry, and offshore coastal surveillance.',
        preset: {
            compute: 'midrange',
            cameras: 'cam-4x',
            network: 'net-2gbe',
            cellular5g: true,
            satelliteNtn: true,
            batteryPack: true,
            solarMppt: false,
            alternatorDc: true,
            shoreAc: true,
            storage: 'nvme-4tb',
        },
    },
    {
        id: 'industrial',
        name: 'Industrial',
        summary: 'Washdown-rated machine vision, defect detection, and PLC/SCADA integration.',
        preset: {
            compute: 'cluster',
            cameras: 'cam-8x',
            network: 'net-sfp',
            cellular5g: false,
            satelliteNtn: false,
            batteryPack: true,
            solarMppt: false,
            alternatorDc: false,
            shoreAc: true,
            storage: 'nvme-4tb',
        },
    },
    {
        id: 'energy-mining',
        name: 'Energy & Mining',
        summary: 'Autonomous haul-road inspection, substation thermal monitoring, and pipeline security.',
        preset: {
            compute: 'cluster',
            cameras: 'cam-4x',
            network: 'net-sfp',
            cellular5g: true,
            satelliteNtn: true,
            batteryPack: true,
            solarMppt: true,
            alternatorDc: false,
            shoreAc: true,
            storage: 'nvme-8tb',
        },
    },
    {
        id: 'smart-infra',
        name: 'Smart Infrastructure',
        summary: 'Highway corridor analytics, bridge monitoring, and remote utility telemetry.',
        preset: {
            compute: 'midrange',
            cameras: 'cam-4x',
            network: 'net-10gbe',
            cellular5g: true,
            satelliteNtn: false,
            batteryPack: true,
            solarMppt: true,
            alternatorDc: false,
            shoreAc: true,
            storage: 'nvme-4tb',
        },
    },
    {
        id: 'autonomous-fleet',
        name: 'Autonomous Fleet & Rail',
        summary: 'Vibration-damped onboard compute for locomotives, forestry equipment, and mobile robotics.',
        preset: {
            compute: 'cluster',
            cameras: 'cam-8x',
            network: 'net-10gbe',
            cellular5g: true,
            satelliteNtn: true,
            batteryPack: true,
            solarMppt: false,
            alternatorDc: true,
            shoreAc: false,
            storage: 'nvme-8tb',
        },
    },
    {
        id: 'environmental-security',
        name: 'Environmental & Perimeter',
        summary: 'Off-grid solar sentry nodes for early wildfire detection and remote perimeter security.',
        preset: {
            compute: 'compact',
            cameras: 'cam-4x',
            network: 'net-2gbe',
            cellular5g: true,
            satelliteNtn: true,
            batteryPack: true,
            solarMppt: true,
            alternatorDc: false,
            shoreAc: false,
            storage: 'nvme-1tb',
        },
    },
];

export const DEFAULT_CONFIG = {
    sector: 'agriculture',
    compute: 'midrange',
    cameras: 'cam-4x',
    network: 'net-2gbe',
    cellular5g: true,
    satelliteNtn: true,
    batteryPack: true,
    solarMppt: true,
    alternatorDc: true,
    shoreAc: false,
    storage: 'nvme-4tb',
};

export function resolveConfigDetails(config) {
    const sectorObj = SECTORS.find((s) => s.id === config.sector) || SECTORS[0];
    const computeObj = COMPUTE_OPTIONS.find((c) => c.id === config.compute) || COMPUTE_OPTIONS[1];
    const camerasObj = CAMERA_PORT_OPTIONS.find((c) => c.id === config.cameras) || CAMERA_PORT_OPTIONS[1];
    const networkObj = NETWORK_OPTIONS.find((n) => n.id === config.network) || NETWORK_OPTIONS[0];
    const storageObj = STORAGE_OPTIONS.find((s) => s.id === config.storage) || STORAGE_OPTIONS[1];

    const activeConnectivity = [];
    if (config.cellular5g) activeConnectivity.push(CONNECTIVITY_OPTIONS.cellular5g);
    if (config.satelliteNtn) activeConnectivity.push(CONNECTIVITY_OPTIONS.satelliteNtn);

    const activePower = [];
    if (config.batteryPack) activePower.push(POWER_OPTIONS.batteryPack);
    if (config.solarMppt) activePower.push(POWER_OPTIONS.solarMppt);
    if (config.alternatorDc) activePower.push(POWER_OPTIONS.alternatorDc);
    if (config.shoreAc) activePower.push(POWER_OPTIONS.shoreAc);

    const selectedPills = [
        computeObj.shortLabel,
        camerasObj.shortLabel,
        networkObj.shortLabel,
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
        activeConnectivity,
        activePower,
        selectedPills,
        summaryText,
    };
}
