'use client';

// -- library
import { useEffect, useMemo, useRef, useState } from 'react';
import { geoContains, geoMercator } from 'd3-geo';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// -- assets
import pinSvg from '@assets/image/illustration/pin.svg';

// -- styles
import style from '@components/AboutUs/AboutUsOurBranches/styles/style.module.scss';

const DEFAULT_GEO_URL = '/maps/indonesia-province-simple.json';
const PIN_SRC = typeof pinSvg === 'string' ? pinSvg : pinSvg?.src;
const PIN_WIDTH = 28;
const PIN_HEIGHT = 32;
const HIGHLIGHT_FILL = '#DC8622';

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 456;
const PROJECTION_CENTER = [118, -2];
const PROJECTION_SCALE = 1500;

const IndonesiaMap = ({ geoUrl = DEFAULT_GEO_URL, markers = [] }) => {
  const wrapRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: MAP_WIDTH, height: MAP_HEIGHT });

  const [hoveredGeoKey, setHoveredGeoKey] = useState(null);
  const [selectedGeoKey, setSelectedGeoKey] = useState(null);

  const [activeMarkerId, setActiveMarkerId] = useState(null); // hover
  const [pinnedMarkerId, setPinnedMarkerId] = useState(null); // click

  const normalizedMarkers = useMemo(() => {
    return (markers || [])
      .filter((m) => typeof m?.lat === 'number' && typeof m?.lng === 'number')
      .map((m) => ({
        id: m?.id ?? `${m?.name ?? ''}-${m.lat}-${m.lng}`,
        name: m?.name ?? '',
        address: m?.address ?? '',
        lat: m.lat,
        lng: m.lng
      }));
  }, [markers]);

  const currentMarkerId = activeMarkerId ?? pinnedMarkerId;

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const svg = root.querySelector('svg');
    if (!svg) return;

    const update = () => {
      const rect = svg.getBoundingClientRect();
      if (rect?.width && rect?.height) setSvgSize({ width: rect.width, height: rect.height });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  const projection = useMemo(() => {
    return geoMercator()
      .center(PROJECTION_CENTER)
      .scale(PROJECTION_SCALE)
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
  }, []);

  const markerPositions = useMemo(() => {
    const scaleX = svgSize.width / MAP_WIDTH;
    const scaleY = svgSize.height / MAP_HEIGHT;

    return normalizedMarkers
      .map((m) => {
        const p = projection([m.lng, m.lat]);
        if (!p) return null;
        const [x, y] = p;
        return {
          id: m.id,
          name: m.name,
          address: m.address,
          x: x * scaleX,
          y: y * scaleY
        };
      })
      .filter(Boolean);
  }, [normalizedMarkers, projection, svgSize.height, svgSize.width]);

  return (
    <div
      ref={wrapRef}
      className={style.mapWrap}
      onClick={() => {
        setPinnedMarkerId(null);
        setActiveMarkerId(null);
        setSelectedGeoKey(null);
        setHoveredGeoKey(null);
      }}>
      <div className={style.mapBox}>
        <ComposableMap
          projection='geoMercator'
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          projectionConfig={{ center: PROJECTION_CENTER, scale: PROJECTION_SCALE }}
          className={style.map}>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              const allowedGeoKeys = new Set();
              const markerGeoKeyById = new Map();
              const geoKeyToMarkerId = new Map();

              for (const marker of normalizedMarkers) {
                const point = [marker.lng, marker.lat];

                for (const geo of geographies) {
                  try {
                    if (geoContains(geo, point)) {
                      allowedGeoKeys.add(geo.rsmKey);
                      markerGeoKeyById.set(marker.id, geo.rsmKey);
                      if (!geoKeyToMarkerId.has(geo.rsmKey)) geoKeyToMarkerId.set(geo.rsmKey, marker.id);
                      break;
                    }
                  } catch {
                    // ignore invalid geometry
                  }
                }
              }

              const safeHoveredGeoKey = allowedGeoKeys.has(hoveredGeoKey) ? hoveredGeoKey : null;
              const safeSelectedGeoKey = allowedGeoKeys.has(selectedGeoKey) ? selectedGeoKey : null;

              return (
                <>
                  {geographies.map((geo) => {
                    const isAllowed = allowedGeoKeys.has(geo.rsmKey);
                    const isActive =
                      isAllowed && (safeSelectedGeoKey === geo.rsmKey || safeHoveredGeoKey === geo.rsmKey);

                    const cursor = isAllowed ? 'pointer' : 'default';
                    const fill = isActive ? HIGHLIGHT_FILL : undefined;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className={style.mapGeo}
                        tabIndex={-1}
                        onMouseEnter={isAllowed ? () => setHoveredGeoKey(geo.rsmKey) : undefined}
                        onMouseLeave={isAllowed ? () => setHoveredGeoKey(null) : undefined}
                        onClick={
                          isAllowed
                            ? (e) => {
                                e.stopPropagation();

                                setSelectedGeoKey(geo.rsmKey);

                                const markerId = geoKeyToMarkerId.get(geo.rsmKey);
                                if (!markerId) return;

                                setPinnedMarkerId((prev) => (prev === markerId ? null : markerId));
                                setActiveMarkerId(markerId);
                              }
                            : undefined
                        }
                        style={{
                          default: {
                            cursor,
                            fill
                          },
                          hover: {
                            cursor,
                            fill
                          },
                          pressed: {
                            cursor,
                            fill
                          }
                        }}
                      />
                    );
                  })}

                  {normalizedMarkers.map((m) => {
                    const geoKey = markerGeoKeyById.get(m.id) ?? null;

                    return (
                      <Marker key={m.id} coordinates={[m.lng, m.lat]}>
                        <g
                          className={style.mapPin}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            setActiveMarkerId(m.id);
                            setHoveredGeoKey(geoKey);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPinnedMarkerId((prev) => (prev === m.id ? null : m.id));
                            setActiveMarkerId(m.id);
                            setHoveredGeoKey(geoKey);
                            setSelectedGeoKey(geoKey);
                          }}
                          onMouseLeave={() => {
                            if (pinnedMarkerId !== m.id) setActiveMarkerId(null);
                            setHoveredGeoKey(null);
                          }}>
                          {PIN_SRC ? (
                            <image
                              href={PIN_SRC}
                              width={PIN_WIDTH}
                              height={PIN_HEIGHT}
                              x={-PIN_WIDTH / 2}
                              y={-PIN_HEIGHT + 2}
                              preserveAspectRatio='xMidYMid meet'
                            />
                          ) : null}
                        </g>
                      </Marker>
                    );
                  })}
                </>
              );
            }}
          </Geographies>
        </ComposableMap>

        <div className={style.mapOverlay} aria-hidden='true'>
          {markerPositions.map((m) => {
            const isActiveMarker = currentMarkerId === m.id;

            return (
              <div key={m.id} className={style.markerOverlay} style={{ left: m.x, top: m.y }}>
                <div className={`${style.markerLabel} ${isActiveMarker ? style.tooltipHidden : style.tooltipVisible}`}>
                  {m.name}
                </div>
                {m.address ? (
                  <div
                    className={`${style.markerAddress} ${isActiveMarker ? style.tooltipVisible : style.tooltipHidden}`}>
                    {m.address}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndonesiaMap;
