import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, MapPin, Star, ChevronRight, Plus, Minus, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatCurrency } from '../utils/formatters';

const REGION_VIEWPORTS = {
  all: { center: [4.2105, 101.9758], zoom: 6 },
  'Kuala Lumpur': { center: [3.1557, 101.7123], zoom: 13 },
  'Langkawi': { center: [6.3800, 99.7800], zoom: 11 },
  'Penang': { center: [5.4300, 100.2800], zoom: 12 },
  'Melaka': { center: [2.1950, 102.2490], zoom: 14 },
};

export function InteractiveMapModal({ 
  hotels = [], 
  onClose, 
  onSelectHotel,
  t,
  currency = 'MYR'
}) {
  const [mapRegion, setMapRegion] = useState('all');
  const [activeHotel, setActiveHotel] = useState(hotels[0] || null);
  
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Filter hotels by regional selection
  const displayedHotels = useMemo(() => {
    if (mapRegion === 'all') return hotels;
    const q = mapRegion.toLowerCase();
    return hotels.filter(h => 
      (h.city || '').toLowerCase().includes(q) || 
      (h.area || '').toLowerCase().includes(q)
    );
  }, [hotels, mapRegion]);

  // Keep active hotel in sync
  useEffect(() => {
    if (displayedHotels.length > 0 && !displayedHotels.some(h => h.id === activeHotel?.id)) {
      setActiveHotel(displayedHotels[0]);
    }
  }, [displayedHotels, activeHotel]);

  // Initialize Leaflet Map with Google Maps-like Clean Skin (CARTO Voyager)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [4.2105, 101.9758],
        zoom: 6,
        zoomControl: false, // Using custom luxury zoom controls
        attributionControl: false
      });

      // Free modern vector/raster skin styled like Google Maps (CartoDB Voyager)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      }).addTo(map);

      // Attribution in bottom right corner subtly
      L.control.attribution({ position: 'bottomright', prefix: false })
        .addAttribution('Map &copy; <a href="https://carto.com/" target="_blank" rel="noreferrer">CARTO</a> / OSM')
        .addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Invalidate size after modal animation finishes to prevent blank grey tiles
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when displayedHotels or activeHotel changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    displayedHotels.forEach((hotel) => {
      const lat = parseFloat(hotel.coordinates?.lat || hotel.latitude);
      const lng = parseFloat(hotel.coordinates?.lng || hotel.longitude);
      if (isNaN(lat) || isNaN(lng)) return;

      const isSelected = activeHotel?.id === hotel.id;
      const formattedPrice = formatCurrency(hotel.price, currency);

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker-wrap',
        html: `
          <div class="map-price-bubble ${isSelected ? 'active' : ''}">
            <span>${formattedPrice}</span>
            <div class="map-price-arrow ${isSelected ? 'active' : ''}"></div>
          </div>
        `,
        iconSize: [96, 36],
        iconAnchor: [48, 36]
      });

      const marker = L.marker([lat, lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : 100
      });

      marker.on('click', () => {
        setActiveHotel(hotel);
        map.panTo([lat, lng], { animate: true, duration: 0.5 });
      });

      layer.addLayer(marker);
    });
  }, [displayedHotels, activeHotel, currency]);

  // Handle region button click with smooth flyTo animation
  const handleSelectRegion = (regionId) => {
    setMapRegion(regionId);
    const map = mapInstanceRef.current;
    if (!map) return;

    const viewport = REGION_VIEWPORTS[regionId] || REGION_VIEWPORTS.all;
    map.flyTo(viewport.center, viewport.zoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  };

  // Zoom helpers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    handleSelectRegion('all');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <style>{`
        .custom-leaflet-marker-wrap {
          background: transparent;
          border: none;
        }
        .map-price-bubble {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: #0f172a;
          font-weight: 800;
          font-size: 11px;
          padding: 5px 9px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
          border: 1.5px solid #cbd5e1;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .map-price-bubble:hover {
          transform: scale(1.08);
          border-color: #0064D2;
          color: #0064D2;
        }
        .map-price-bubble.active {
          background: #FF5E1F;
          color: #ffffff;
          border-color: #FF5E1F;
          transform: scale(1.15);
          box-shadow: 0 6px 20px rgba(255, 94, 31, 0.45);
        }
        .map-price-arrow {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: #ffffff;
          border-right: 1.5px solid #cbd5e1;
          border-bottom: 1.5px solid #cbd5e1;
        }
        .map-price-bubble.active .map-price-arrow {
          background: #FF5E1F;
          border-color: #FF5E1F;
        }
        .leaflet-container {
          width: 100%;
          height: 100%;
          font-family: inherit;
        }
      `}</style>

      <div className="bg-white rounded-3xl shadow-modal border border-slate-200 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-white px-4 sm:px-6 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Peta Lokasi Hotel & Resor Malaysia</h3>
              <p className="text-xs text-slate-500">Klik pin harga untuk melihat pratinjau akomodasi dan navigasi interaktif</p>
            </div>
          </div>

          {/* Regional Quick Filter Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
            {[
              { id: 'all', label: 'Semua Malaysia' },
              { id: 'Kuala Lumpur', label: 'KL' },
              { id: 'Langkawi', label: 'Langkawi' },
              { id: 'Penang', label: 'Penang' },
              { id: 'Melaka', label: 'Melaka' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectRegion(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  mapRegion === tab.id
                    ? 'bg-brand-600 text-white border-brand-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors ml-2 cursor-pointer shrink-0"
              title="Tutup Peta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real Interactive Leaflet Map Canvas */}
        <div className="relative flex-1 bg-slate-100 overflow-hidden">
          
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Custom Floating Zoom Controls (Top Right) */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-xs rounded-xl shadow-lg border border-slate-200/90 p-1">
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold transition-colors cursor-pointer"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <div className="h-px bg-slate-200 mx-1" />
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="h-px bg-slate-200 mx-1" />
            <button
              onClick={handleResetView}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold transition-colors cursor-pointer"
              title="Pusatkan Peta Malaysia"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Selected Hotel Preview Card (Bottom Left) */}
          {activeHotel && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 bg-white/98 backdrop-blur-md rounded-2xl shadow-float border border-slate-200/90 p-3.5 sm:p-4 z-20 animate-in slide-in-from-bottom-4 duration-200">
              <div className="flex gap-3.5 items-center">
                <img
                  src={activeHotel.mainImage}
                  alt={activeHotel.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 bg-slate-100 border border-slate-200/80 shadow-2xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 mb-0.5">
                    <span>{activeHotel.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {activeHotel.starRating}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm truncate">
                    {activeHotel.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {activeHotel.area || activeHotel.city}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div>
                      {activeHotel.originalPrice > activeHotel.price && (
                        <span className="text-slate-400 line-through block text-[10px] font-semibold">
                          {formatCurrency(activeHotel.originalPrice, currency)}
                        </span>
                      )}
                      <span className="text-sm font-black text-cta">
                        {formatCurrency(activeHotel.price, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectHotel(activeHotel);
                      }}
                      className="px-3 py-1.5 bg-cta hover:bg-cta-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Pilih Bilik</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
