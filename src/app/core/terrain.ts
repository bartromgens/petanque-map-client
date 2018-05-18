
export class Coordinate {
  lon;
  lat;

  constructor(lon: number, lat: number) {
    this.lon = lon;
    this.lat = lat;
  }
}


export interface TerrainResource {
  id: number;
  osm_id: number;
  osm_type: string;
  osm_url: string;
  lon: number;
  lat: number;
  url: string;
}


export class Terrain {
  id: number;
  osmId: number;
  osmType: string;
  location: Coordinate;
}


export namespace TerrainFactory {
  export function createTerrain(resource: TerrainResource): Terrain {
    const terrain = new Terrain();
    terrain.id = resource.id;
    terrain.osmId = resource.osm_id;
    terrain.osmType = resource.osm_type;
    terrain.location = new Coordinate(resource.lon, resource.lat);
    return terrain;
  }

  export function createTerrains(resources: TerrainResource[]): Terrain[] {
    const terrains = [];
    for (const resource of resources) {
      terrains.push(createTerrain(resource));
    }
    return terrains;
  }
}
