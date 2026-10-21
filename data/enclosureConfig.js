export const COMPUTE_OPTIONS = [
    {
        id: 'compact',
        code: 'EF-CMP-40',
        name: 'Compact Edge AI Node',
        shortName: 'Compact Node (40 TOPS)',
        tops: '40 TOPS INT8',
        powerDraw: '15–25W',
        thermalType: 'Passive Finned Extrusion',
        chassisUnits: 1,
        description:
            'Fanless low-power inference module for single/dual camera vision, acoustic monitoring, and high-frequency PLC/Modbus telemetry.',
        specs: ['ARM Cortex-A78AE + Tensor Accelerator', '16GB LPDDR5 ECC', '-40°C to +75°C passive operation'],
    },
    {
        id: 'midrange',
        code: 'EF-CMP-150',
        name: 'Mid-Range Multi-Stream AI Module',
        shortName: 'Mid-Range AI (150 TOPS)',
        tops: '150 TOPS INT8',
        powerDraw: '35–60W',
        thermalType: 'Heavy-Duty Conductive Heatsink',
        chassisUnits: 2,
        description:
            'Balanced industrial AI engine for simultaneous 4–8 stream HD object tracking, optical inspection, and real-time sensor fusion.',
        specs: ['12-Core Industrial SoC + Dual NPU/GPU', '32GB LPDDR5', 'Conduction-cooled to NEMA 4X backplate'],
    },
    {
        id: 'cluster',
        code: 'EF-CMP-275X',
        name: 'High-Density Industrial GPU Cluster',
        shortName: 'GPU Cluster (275+ TOPS)',
        tops: '275–550 TOPS',
        powerDraw: '75–140W',
        thermalType: 'Dual-Path Active Heatsink + Sealed Heatpipe',
        chassisUnits: 3,
        description:
            'High-throughput edge server module for 8+ camera 4K vision, LiDAR/radar fusion, and quantized local LLM/VLM tactical inference.',
        specs: ['Dual Industrial Orin/GPU Compute Blades', '64GB–128GB High-Bandwidth Memory', 'Closed-loop internal thermal circulation'],
    },
];

export const CAMERA_PORT_OPTIONS = [
    {
        id: 'cam-2x',
        code: 'POE-2M12',
        name: '2x PoE+ Rugged Vision Ports',
        shortName: '2x PoE+ Ports (60W)',
        count: 2,
        connector: 'IP68 M12 X-Coded / RJ45',
        poeBudget: '60W PoE+ (802.3at)',
        description: 'Compact 2-port industrial PoE+ injector switch on DIN rail with surge arrestors.',
    },
    {
        id: 'cam-4x',
        code: 'POE-4M12',
        name: '4x PoE+ Managed Vision Switch',
        shortName: '4x PoE+ Ports (120W)',
        count: 4,
        connector: 'IP68 M12 X-Coded / RJ45',
        poeBudget: '120W PoE+ Managed',
        description: 'Managed L2 DIN-rail PoE+ switch with per-port watchdog hardware reset for PTZ & fixed cameras.',
    },
    {
        id: 'cam-8x',
        code: 'POE-8BT',
        name: '8x PoE++ High-Power Sensor Array',
        shortName: '8x PoE++ Ports (240W)',
        count: 8,
        connector: 'IP68 M12 X-Coded & Shielded RJ45',
        poeBudget: '240W PoE++ (802.3bt)',
        description: 'High-density 8-port PoE++ switch supporting heated PTZ domes, thermal imagers, and 3D LiDAR heads.',
    },
];

export const NETWORK_OPTIONS = [
    {
        id: 'net-2gbe',
        code: 'NET-2GBE',
        name: 'Dual 1GbE Copper Uplink',
        shortName: 'Dual 1GbE RJ45',
        ports: 2,
        media: '2x Shielded IP68 Cat6A RJ45',
        speed: '2x 1 Gbps (LAN / WAN Bypass)',
        description: 'Redundant dual Gigabit Ethernet copper ports with galvanic isolation for local OT/SCADA integration.',
    },
    {
        id: 'net-10gbe',
        code: 'NET-10GBE',
        name: '10GbE High-Throughput Copper + GbE Mgmt',
        shortName: '10GbE + 1GbE Copper',
        ports: 2,
        media: '1x 10GBASE-T + 1x 1GbE IP68',
        speed: '10 Gbps + 1 Gbps',
        description: 'High-bandwidth copper trunk for uncompressed multi-camera video offload and low-latency plant backhaul.',
    },
    {
        id: 'net-sfp',
        code: 'NET-2SFP',
        name: 'Dual 10G Rugged Fiber SFP+ Uplink',
        shortName: 'Dual 10G Fiber SFP+',
        ports: 2,
        media: '2x Armored IP68 LC Fiber Glands',
        speed: '2x 10 Gbps Optical Ring',
        description: 'EMI-immune single-mode/multi-mode optical uplink for long-haul perimeter, substation, and mine shaft runs.',
    },
];

export const CONNECTIVITY_OPTIONS = {
    cellular5g: {
        id: 'cellular5g',
        code: 'RF-5G-MIMO',
        name: 'Industrial 5G Dual-SIM Cellular Modem',
        shortName: '5G Dual-SIM + 4x4 MIMO',
        band: 'Sub-6GHz 5G NR / LTE Cat-20 Fallback',
        description:
            'Adds a DIN-rail dual-SIM 5G router with automatic carrier failover and top-mounted N-type 4x4 MIMO omnidirectional antennas.',
    },
    satelliteNtn: {
        id: 'satelliteNtn',
        code: 'RF-NTN-SAT',
        name: 'NTN Satellite Transceiver Uplink',
        shortName: 'NTN Satellite Uplink',
        band: 'L/Ku-Band Non-Terrestrial Network',
        description:
            'Adds an internal satellite transceiver module and top-mounted low-profile rugged dome/flat-panel NTN antenna for zero-cell-coverage telemetry.',
    },
};

export const POWER_OPTIONS = {
    batteryPack: {
        id: 'batteryPack',
        code: 'PWR-LFP-100',
        name: 'Internal LiFePO4 Battery Pack',
        shortName: 'LiFePO4 Battery Bay (1.2kWh)',
        spec: '24V 50Ah Heated LiFePO4 UPS',
        description:
            'Lower-bay rugged lithium iron phosphate pack with self-heating BMS (-35°C cold charge protection) for autonomous bridge power.',
    },
    solarMppt: {
        id: 'solarMppt',
        code: 'PWR-SOL-MPPT',
        name: 'Solar Array + DIN MPPT Charge Controller',
        shortName: 'Solar Panel + MPPT Controller',
        spec: '400W–800W Folding Solar + 30A MPPT',
        description:
            'Includes internal DIN-rail smart MPPT solar controller, waterproof PV gland input, and pole/frame-mounted industrial solar array.',
    },
    alternatorDc: {
        id: 'alternatorDc',
        code: 'PWR-ALT-DCDC',
        name: 'Alternator / Vehicle DC-DC Charger',
        shortName: '12/24/48V Alternator DC-DC',
        spec: '9–60V DC Isolated Input + Ignition Sense',
        description:
            'ISO-7637 transient-protected DC-DC conditioner for heavy haul trucks, harvesters, locomotives, and marine vessel alternators.',
    },
    shoreAc: {
        id: 'shoreAc',
        code: 'PWR-AC-DIN',
        name: 'Shore / Grid AC-DC Industrial Supply',
        shortName: '120/240V AC-DC DIN Supply',
        spec: '85–277V AC Input / 480W DIN PSU',
        description:
            'Wide-input industrial DIN-rail AC-DC power supply with Type 2 surge arrestor and circuit breaker for plant or pole grid power.',
    },
};

export const STORAGE_OPTIONS = [
    {
        id: 'nvme-1tb',
        code: 'STR-1TB',
        name: '1TB Industrial NVMe SSD',
        shortName: '1TB pSLC/TLC NVMe',
        capacity: '1 TB',
        bays: 1,
        endurance: 'Wide-Temp (-40°C to +85°C) Conformal Coated',
        description: 'Single ruggedized M.2 NVMe module with power-loss protection for OS, containers, and rolling 14-day event buffer.',
    },
    {
        id: 'nvme-4tb',
        code: 'STR-4TB-R1',
        name: '4TB Dual-Bay Mirrored NVMe RAID',
        shortName: '4TB Mirrored RAID Bay',
        capacity: '4 TB',
        bays: 2,
        endurance: 'Hardware RAID 0/1 + AES-256 SED',
        description: 'Dual removable industrial NVMe canisters in the enclosure storage bay for continuous multi-camera video retention.',
    },
    {
        id: 'nvme-8tb',
        code: 'STR-8TB-R10',
        name: '8TB+ Removable Rugged Black-Box RAID Bay',
        shortName: '8TB+ Removable RAID Bay',
        capacity: '8 TB+',
        bays: 4,
        endurance: '4-Canister Hot-Swap Shuttle +FIPS 140-3 Encryption',
        description: 'High-capacity removable shuttle bay for disconnected maritime, defense, and autonomous fleet raw sensor dataset logging.',
    },
];

export const SECTORS = [
    {
        id: 'agriculture',
        name: 'Agriculture',
        tagline: 'Autonomous harvesters, pivot telemetry & remote orchard vision',
        environment: 'High dust, washdown, fertilizer corrosion, seasonal temperature extremes',
        description:
            'Deployed on combines, sprayers, grain handling towers, and solar-powered field masts to run real-time crop yield grading, weed detection, and equipment health monitoring without relying on farm Wi-Fi.',
        useCases: [
            'Harvester & implement vision for real-time yield and foreign-object detection',
            'Off-grid solar perimeter & irrigation mast monitoring with 5G/NTN backhaul',
            'Automated bin/silo level & grain moisture edge analytics',
        ],
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
        tagline: 'Tactical ISR nodes, forward perimeter security & contested comms',
        environment: 'MIL-STD shock/vibration, zero cellular infrastructure, rapid pole/tripod mast deployment',
        description:
            'Ruggedized multi-sensor fusion enclosures built for forward operating bases, mobile radar/EO-IR towers, and autonomous unmanned ground/surface systems requiring local classification and resilient NTN satellite uplink.',
        useCases: [
            'EO/IR thermal & optical perimeter intrusion detection at remote outposts',
            'Multi-modal acoustic, radar, and video target classification at the edge',
            'Zero-trust encrypted black-box storage with low-signature NTN satellite burst telemetry',
        ],
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
        tagline: 'Workboats, offshore platforms, port cranes & coastal radar sites',
        environment: 'Salt fog (NEMA 4X 316L / polycarbonate), 24V vessel alternator power, open-water dead zones',
        description:
            'Corrosion-proof enclosures engineered for tugboats, ferries, fishing fleets, and port terminals—seamlessly switching between port 5G and offshore NTN satellite while conditioning noisy marine alternator and shore power.',
        useCases: [
            'Deck safety, winch/line snap hazard detection, and crew overboard alerts',
            'Engine room thermal anomaly monitoring and bilge/fuel telemetry',
            'Offshore buoy and coastal navigational aid autonomous weather/vessel tracking',
        ],
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
        tagline: 'Sawmills, pulp & paper, chemical plants & heavy manufacturing',
        environment: 'High-pressure washdown, conductive particulates, 24/7 vibration, legacy PLC networks',
        description:
            'Sealed fanless and closed-loop enclosures mounted directly beside production lines, kilns, and conveyors—bridging high-speed GigE/PoE machine vision cameras with plant SCADA and fiber rings.',
        useCases: [
            'High-speed automated grading, defect detection, and conveyor jam prevention',
            'Worker PPE / exclusion-zone safety interlocks around heavy machinery',
            'Predictive maintenance vibration & acoustic inference tied into plant OPC-UA / Modbus',
        ],
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
        tagline: 'Open-pit haul fleets, remote substations, pipelines & wellheads',
        environment: '-40°C arctic cold to +60°C solar load, blast vibration, remote off-grid leases',
        description:
            'Self-sustaining field nodes for haul-road monitoring, tailings dam surveillance, and unmanned substation inspection where grid power and terrestrial fiber are unavailable.',
        useCases: [
            'Haul truck tire/bucket wear inspection and shovel loading optimization',
            'Pipeline right-of-way encroachment and methane/thermal leak optical gas imaging',
            'Substation transformer thermal monitoring with fiber SFP+ SCADA isolation',
        ],
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
        name: 'Smart Infrastructure & DOT',
        tagline: 'Highway corridors, mountain passes, bridges & municipal utilities',
        environment: 'Pole-mount wind load, road salt spray, intermittent utility power',
        description:
            'Pole-mounted NEMA 4X cabinets for Departments of Transportation, avalanche/rockfall corridors, and water treatment utilities requiring multi-camera traffic analytics and battery backup.',
        useCases: [
            'Avalanche, rockfall, and winter road-surface condition classification',
            'Bridge structural health & multi-lane commercial vehicle axle/weight analytics',
            'Stormwater & remote pump station visual + sensor telemetry',
        ],
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
        tagline: 'Locomotives, forestry forwarders, yard tractors & mobile robotics',
        environment: 'Continuous 12V/24V/48V cranking transients, high shock, tunnel/canyon dead zones',
        description:
            'Compact vibration-damped enclosures engineered for direct mounting on rail rolling stock, forestry equipment, and intermodal yard vehicles with ignition-controlled shutdown and removable storage shuttles.',
        useCases: [
            'Rail trackbed obstacle detection, pantograph inspection, and crossing analytics',
            'Forestry feller-buncher / log-loader log scaling and operator blind-spot AI',
            'High-rate raw camera + LiDAR dataset capture on removable 8TB NVMe shuttles',
        ],
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
        name: 'Remote Environmental & Perimeter Security',
        tagline: 'Wildfire early detection, dam safety & critical border/airfield perimeters',
        environment: '100% off-grid mountaintop & tower installs, extreme UV, lightning exposure',
        description:
            'Ultra-reliable solar + LiFePO4 autonomous sentry enclosures running continuous 360° smoke/fire detection, wildlife/ecological tracking, and critical infrastructure perimeter security.',
        useCases: [
            'Early wildfire smoke plume detection on remote forestry lookouts',
            'Hydroelectric dam spillway, ice jam, and remote watershed monitoring',
            'Airfield, port, and remote depot autonomous perimeter intrusion tracking',
        ],
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

    const skuParts = [
        'EF-N4X',
        computeObj.code.replace('EF-', ''),
        `${camerasObj.count}CAM`,
        networkObj.id === 'net-sfp' ? '2SFP' : networkObj.id === 'net-10gbe' ? '10GE' : '2GE',
        [config.cellular5g ? '5G' : null, config.satelliteNtn ? 'NTN' : null].filter(Boolean).join('-') || 'LOC',
        [
            config.batteryPack ? 'LFP' : null,
            config.solarMppt ? 'SOL' : null,
            config.alternatorDc ? 'ALT' : null,
            config.shoreAc ? 'AC' : null,
        ]
            .filter(Boolean)
            .join('-') || 'EXT',
        storageObj.capacity.replace(/\s+/g, ''),
    ];

    const buildCode = skuParts.join('/');

    const summaryText = [
        `Build Reference: ${buildCode}`,
        `Target Sector: ${sectorObj.name}`,
        `Enclosure Rating: NEMA 4X / IP67 Hinged Wall & Pole-Mount Enclosure`,
        `Edge AI Compute: ${computeObj.name} (${computeObj.tops}, ${computeObj.thermalType})`,
        `Camera Ports: ${camerasObj.name} (${camerasObj.connector}, ${camerasObj.poeBudget})`,
        `Network Uplink: ${networkObj.name} (${networkObj.media})`,
        `Wireless & Backhaul: ${
            activeConnectivity.length > 0
                ? activeConnectivity.map((c) => c.name).join(' + ')
                : 'Local Wired Only (No RF Modules)'
        }`,
        `Power & Charging: ${
            activePower.length > 0
                ? activePower.map((p) => p.name).join(' + ')
                : 'Standard 24V DC Terminal Input'
        }`,
        `Local Data Storage: ${storageObj.name} (${storageObj.capacity}, ${storageObj.endurance})`,
    ].join('\n');

    return {
        sectorObj,
        computeObj,
        camerasObj,
        networkObj,
        storageObj,
        activeConnectivity,
        activePower,
        buildCode,
        summaryText,
    };
}
