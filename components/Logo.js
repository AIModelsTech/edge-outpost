const VIEWBOX = { x: 110, y: 275, width: 1225, height: 905 };

const PATHS = [
    'M 113.672 1179.192 L 209.426 1179.192 L 307.676 909.27 L 441.176 909.27 L 441.176 819.293 L 340.426 819.293 L 441.176 542.516 L 441.176 279.445 Z',
    'M 468.168 279.445 L 468.168 1179.192 L 558.148 1179.192 L 558.148 279.445 Z',
    'M 603.14 1179.192 L 693.121 1179.192 L 693.121 279.445 L 603.14 279.445 Z',
    'M 738.109 1179.192 L 828.094 1179.192 L 828.094 279.445 L 738.109 279.445 Z',
    'M 1081.472 950.828 L 1236.566 524.731 L 1238.433 1179.449 L 1328.414 1179.192 L 1325.851 279.445 L 1230.093 279.445 L 1033.593 819.293 L 855.086 328.887 L 855.086 591.953 L 985.715 950.828 Z',
];

const RENDER_SCALE = 2;

export default function Logo({ height = 32, light = false, className = '' }) {
    const width = (height * VIEWBOX.width) / VIEWBOX.height;
    const fill = light ? '#ffffff' : '#0f172a';

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
            width={width * RENDER_SCALE}
            height={height * RENDER_SCALE}
            preserveAspectRatio="xMidYMid meet"
            shapeRendering="geometricPrecision"
            aria-label="AIM"
            role="img"
            className={`block shrink-0 grow-0 ${className}`}
            style={{ width, height }}
        >
            {PATHS.map((d) => (
                <path key={d.slice(0, 12)} fill={fill} fillRule="evenodd" d={d} />
            ))}
        </svg>
    );
}
