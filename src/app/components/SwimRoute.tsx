import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import type { SwimRouteData } from '../data/events';

interface SwimRouteMapProps {
  routes: SwimRouteData[];
  className?: string;
}

function createSharkIcon(size: number, rotation = 0, mirror = false) {
  const mirrorTransform = mirror ? 'scaleX(-1)' : '';
  return L.divIcon({
    html: `<img src="/shark.svg" style="width:${size * 1.7}px;height:${size * 1.7 * 1.25}px;transform:rotate(${rotation}deg) ${mirrorTransform};filter:drop-shadow(0 0 3px rgba(255,255,255,0.9)) drop-shadow(0 3px 6px rgba(0,0,0,0.5));" />`,
    className: 'shark-div-icon',
    iconSize: [size * 1.7, size * 1.7 * 1.25],
    iconAnchor: [(size * 1.7) / 2, (size * 1.7 * 1.25) / 2],
  });
}

function createPersistentSharkIcon(color: string) {
  return L.divIcon({
    html: `
      <div style="position:relative;width:28px;height:28px;">
        <img src="/shark.svg" style="width:28px;height:28px;" />
        <div style="
          position:absolute;
          bottom:-2px;
          right:-2px;
          width:10px;
          height:10px;
          background:${color};
          border-radius:50%;
          border:2px solid white;
          box-shadow:0 1px 3px rgba(0,0,0,0.2);
        "></div>
      </div>
    `,
    className: 'shark-div-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function createLabelIcon(text: string, color: string, isEnd = false) {
  return L.divIcon({
    html: `<div style="
      background:${color};
      color:white;
      padding:4px 10px;
      border-radius:12px;
      font-size:11px;
      font-weight:700;
      white-space:nowrap;
      box-shadow:0 2px 6px rgba(0,0,0,0.25);
      font-family:system-ui,-apple-system,sans-serif;
    ">${text}</div>`,
    className: 'label-div-icon',
    iconSize: [120, 24],
    iconAnchor: [60, isEnd ? 28 : -4],
  });
}

function createBuoyMarker(lat: number, lng: number, color: string, onClick: () => void) {
  return L.circleMarker([lat, lng], {
    radius: 8,
    fillColor: color,
    color: '#ffffff',
    weight: 2.5,
    fillOpacity: 0.95,
    opacity: 1,
  }).on('click', onClick);
}

function getRouteLength(route: SwimRouteData): number {
  let len = 0;
  for (let i = 0; i < route.path.length - 1; i++) {
    len += Math.hypot(
      route.path[i + 1][0] - route.path[i][0],
      route.path[i + 1][1] - route.path[i][1]
    );
  }
  return len;
}

function deriveBuoys(route: SwimRouteData) {
  const start = route.path[0];
  const buoyPoints = route.path
    .map((p, i) => ({ lat: p[0], lng: p[1], isBuoy: p[2], idx: i }))
    .filter((p) => p.isBuoy);

  const turnaround = buoyPoints.reduce(
    (max, b) => {
      const dMax = Math.hypot(max.lat - start[0], max.lng - start[1]);
      const dB = Math.hypot(b.lat - start[0], b.lng - start[1]);
      return dB > dMax ? b : max;
    },
    buoyPoints[0]
  );

  let buoyNum = 1;
  return buoyPoints.map((bp) => ({
    lat: bp.lat,
    lng: bp.lng,
    label: bp.idx === turnaround.idx ? 'Punto de retorno' : `Boyas ${buoyNum++}`,
    flag: true,
  }));
}

function buildAnimPath(route: SwimRouteData): [number, number][] {
  const forward = route.path.map((p) => [p[0], p[1]] as [number, number]);
  if (!route.isLoop) return forward;
  const backward = forward.slice(0, -1).reverse();
  return [...forward, ...backward];
}

export function SwimRouteMap({ routes, className = '' }: SwimRouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const sharkMarkerRef = useRef<L.Marker | null>(null);
  const persistentLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayersRef = useRef<Map<string, L.LayerGroup>>(new Map());
  const rafRef = useRef<number>(0);
  const [status, setStatus] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [selectedRoute, setSelectedRoute] = useState<string>('all');

  const getLongest = (rs: SwimRouteData[]) =>
    rs.reduce((max, r) => (getRouteLength(r) > getRouteLength(max) ? r : max), rs[0]);

  // ── Initialise map once ──
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: '© Esri, Maxar, Earthstar Geographics',
    }).addTo(map);

    L.control
      .attribution({ position: 'bottomright' })
      .addAttribution('© Esri, Maxar, Earthstar Geographics')
      .addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    persistentLayerRef.current = L.layerGroup().addTo(map);

    const drawOrder = [...routes].reverse();

    drawOrder.forEach((route) => {
      const group = L.layerGroup().addTo(map);
      routeLayersRef.current.set(route.label, group);

      const pts = route.path.map((p) => [p[0], p[1]] as L.LatLngExpression);
      const buoys = deriveBuoys(route);
      const start = route.path[0];
      const end = route.path[route.path.length - 1];
      const len = getRouteLength(route);
      const lenM = Math.round(len * 111320);

      L.polyline(pts, {
        color: route.color,
        weight: 6,
        opacity: 0.85,
        dashArray: '8, 6',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(group);

      const startLabel = route.isLoop
        ? `Salida/Meta ${route.label}`
        : `Salida ${route.label}`;
      const endLabel = route.isLoop
        ? `Retorno ${route.label}`
        : `Meta ${route.label}`;

      L.marker([start[0], start[1]], {
        icon: createLabelIcon(startLabel, route.color),
        zIndexOffset: 200,
      }).addTo(group);

      L.marker([end[0], end[1]], {
        icon: createLabelIcon(endLabel, route.color, true),
        zIndexOffset: 200,
      }).addTo(group);

      buoys.forEach((buoy) => {
        L.circleMarker([buoy.lat, buoy.lng], {
          radius: 8,
          fillColor: route.color,
          color: '#ffffff',
          weight: 2.5,
          fillOpacity: 0.95,
          opacity: 1,
        })
          .addTo(group)
          .bindPopup(
            `<b>${buoy.label}</b><br/><span style="color:${route.color}">● ${route.label}</span>`
          );
      });
    });

    // Center on longest route initially
    const longest = getLongest(routes);
    const bounds = L.latLngBounds(longest.path.map((p) => [p[0], p[1]]));
    map.fitBounds(bounds.pad(0.05));

    mapRef.current = map;

    return () => {
      cancelAnimationFrame(rafRef.current);
      map.remove();
      mapRef.current = null;
      routeLayersRef.current.clear();
    };
  }, [routes]);

  // ── Show / hide route layers when selection changes ──
  useEffect(() => {
    routeLayersRef.current.forEach((group, label) => {
      if (selectedRoute === 'all' || selectedRoute === label) {
        if (!mapRef.current?.hasLayer(group)) {
          mapRef.current?.addLayer(group);
        }
      } else {
        if (mapRef.current?.hasLayer(group)) {
          mapRef.current?.removeLayer(group);
        }
      }
    });
    if (status === 'idle' && mapRef.current) {
      const target =
        selectedRoute === 'all'
          ? getLongest(routes)
          : routes.find((r) => r.label === selectedRoute) ?? getLongest(routes);
      const bounds = L.latLngBounds(target.path.map((p) => [p[0], p[1]]));
      mapRef.current.fitBounds(bounds.pad(0.05), { animate: true, duration: 0.6 });
    }
  }, [selectedRoute, status, routes]);

  // ── Animation ──
  const playAnimation = useCallback(() => {
    if (status !== 'idle' || !mapRef.current) return;
    setStatus('playing');

    const map = mapRef.current;
    const target = selectedRoute === 'all' ? getLongest(routes) : routes.find((r) => r.label === selectedRoute) ?? getLongest(routes);

    const path = buildAnimPath(target);
    const duration = 5000;
    const startTime = performance.now();
    const passedFlags = new Set<number>();
    const buoys = deriveBuoys(target);

    const segDistances: number[] = [];
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
      segDistances.push(dist);
      totalDistance += dist;
    }

    const cumDistances: number[] = [0];
    for (let i = 0; i < segDistances.length; i++) {
      cumDistances.push(cumDistances[i] + segDistances[i]);
    }

    if (!sharkMarkerRef.current) {
      sharkMarkerRef.current = L.marker([path[0][0], path[0][1]], {
        icon: createSharkIcon(52, 0),
        zIndexOffset: 1000,
      }).addTo(map);
    }

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const targetDist = progress * totalDistance;

      let segIdx = 0;
      for (let i = 0; i < cumDistances.length - 1; i++) {
        if (targetDist >= cumDistances[i] && targetDist < cumDistances[i + 1]) {
          segIdx = i;
          break;
        }
      }
      if (targetDist >= cumDistances[cumDistances.length - 1]) {
        segIdx = path.length - 2;
      }

      const localT = segDistances[segIdx] > 0 ? (targetDist - cumDistances[segIdx]) / segDistances[segIdx] : 0;
      const a = path[segIdx];
      const b = path[segIdx + 1];

      if (a && b) {
        const lat = a[0] + (b[0] - a[0]) * localT;
        const lng = a[1] + (b[1] - a[1]) * localT;
        const heading = Math.atan2(b[1] - a[1], b[0] - a[0]) * (180 / Math.PI);
        const wiggle = Math.sin(elapsed * 0.003) * 4;
        const rot = heading + wiggle;
        const isReturnLeg = target.isLoop && segIdx >= target.path.length - 1;

        sharkMarkerRef.current!.setLatLng([lat, lng]);
        sharkMarkerRef.current!.setIcon(createSharkIcon(52, rot, isReturnLeg));

        if (!isReturnLeg) {
          buoys.forEach((buoy, i) => {
            if (!buoy.flag || passedFlags.has(i)) return;

            let minDist = Infinity;
            let closestProgress = 0;
            for (let j = 0; j < target.path.length - 1; j++) {
              const pa = target.path[j];
              const distFromStart = cumDistances[j];
              const dist = Math.hypot(pa[0] - buoy.lat, pa[1] - buoy.lng);
              if (dist < minDist) {
                minDist = dist;
                closestProgress = distFromStart / cumDistances[cumDistances.length - 1];
              }
            }

            if (progress >= closestProgress) {
              passedFlags.add(i);
              L.marker([buoy.lat, buoy.lng], {
                icon: createPersistentSharkIcon(target.color),
                zIndexOffset: 800,
              }).addTo(persistentLayerRef.current!);
            }
          });
        }
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setStatus('finished');
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [routes, selectedRoute, status]);

  const resetAnimation = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (sharkMarkerRef.current) {
      sharkMarkerRef.current.remove();
      sharkMarkerRef.current = null;
    }
    if (persistentLayerRef.current) {
      persistentLayerRef.current.clearLayers();
    }
    setStatus('idle');
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapContainerRef}
        className="w-full h-[75dvh] lg:h-[75vh] lg:rounded-2xl lg:border lg:border-blue-100 overflow-hidden"
      />

      {/* Controls */}
      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col items-end gap-2">
        {status === 'idle' && (
          <>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-blue-100 mb-1">
              <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Seleccionar ruta
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="text-sm font-medium text-gray-800 bg-transparent border-none outline-none cursor-pointer min-w-[140px]"
              >
                <option value="all">Todas las rutas</option>
                {routes.map((r) => (
                  <option key={r.label} value={r.label}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={playAnimation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Ver recorrido
            </button>
          </>
        )}
        {status === 'playing' && (
          <span className="bg-white/90 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
            <span className="relative flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-3 bg-blue-500"></span>
            </span>
            Animando…
          </span>
        )}
        {status === 'finished' && (
          <button
            onClick={resetAnimation}
            className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all active:scale-95 flex items-center gap-2 border border-gray-200"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reproducir de nuevo
          </button>
        )}
      </div>

      {/* Legend */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-blue-100">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Rutas
        </div>
        <div className="space-y-1">
          {routes.map((r) => (
            <div
              key={r.label}
              className={`flex items-center gap-2 cursor-pointer transition-opacity ${
                selectedRoute !== 'all' && selectedRoute !== r.label
                  ? 'opacity-40'
                  : 'opacity-100'
              }`}
              onClick={() => status === 'idle' && setSelectedRoute(r.label)}
            >
              <span
                className="inline-block rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: r.color,
                  boxShadow: `0 0 0 2px ${r.color}33`,
                }}
              />
              <span className="text-xs text-gray-700 font-medium">{r.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}