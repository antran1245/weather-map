import type { Feature, Point } from 'geojson';
import { Marker} from 'svelte-maplibre';

export interface MarkerClickInfo {
  map: maplibregl.Map;
  marker: Marker;
  lngLat: [number, number];
  features: Feature<Point>[];
  }