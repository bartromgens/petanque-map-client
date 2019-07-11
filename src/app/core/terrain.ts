import { proj } from 'openlayers';

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
  images?: TerrainImageResource[];
  ratings?: TerrainRatingResource[];
}

export interface TerrainImageResource {
  id: number;
  terrain: string;
  file: string;
}

export interface TerrainRatingResource {
  id: number;
  terrain: string;
  rating: number;
}

export class TerrainImage {
  id: number;
  url: string;
}

export class TerrainRating {
  id: number;
  rating: number;
}

export class Terrain {
  id: number;
  osmId: number;
  osmType: string;
  osmUrl: string;
  location: Coordinate;
  olPoint = null;
  images?: TerrainImage[];
  ratings?: TerrainRating[];

  getOlCoordinate() {
    if (this.olPoint) {
      return this.olPoint;
    }
    this.olPoint = proj.fromLonLat([this.location.lon, this.location.lat]);
    return this.olPoint;
  }

  googleMapsUrl() {
    return 'https://maps.google.com/?q=' + this.location.lat + ',' + this.location.lon;
  }

  getRating(): number {
    if (this.ratings.length === 0) {
      return 0;
    }

    let rating_sum = 0;
    for (const rate of this.ratings) {
      rating_sum += rate.rating;
    }
    return rating_sum / this.ratings.length;
  }

  getRatingNumber(): number {
    return this.ratings.length;
  }
}


export namespace TerrainFactory {
  export function createTerrain(resource: TerrainResource): Terrain {
    const terrain = new Terrain();
    terrain.id = resource.id;
    terrain.osmId = resource.osm_id;
    terrain.osmType = resource.osm_type;
    terrain.osmUrl = resource.osm_url;
    terrain.location = new Coordinate(resource.lon, resource.lat);
    if (resource.images) {
      terrain.images = TerrainFactory.createTerrainImages(resource.images);
    }
    if (resource.ratings) {
      terrain.ratings = TerrainFactory.createTerrainRatings(resource.ratings);
    }
    return terrain;
  }

  export function createTerrainImage(resource: TerrainImageResource): TerrainImage {
    const image = new TerrainImage();
    image.id = resource.id;
    image.url = resource.file;
    return image;
  }

  export function createTerrainRating(resource: TerrainRatingResource): TerrainRating {
    const rating = new TerrainRating();
    rating.id = resource.id;
    rating.rating = resource.rating;
    return rating;
  }

  export function createTerrains(resources: TerrainResource[]): Terrain[] {
    const terrains = [];
    for (const resource of resources) {
      terrains.push(createTerrain(resource));
    }
    return terrains;
  }

  export function createTerrainImages(resources: TerrainImageResource[]): TerrainImage[] {
    const images = [];
    for (const resource of resources) {
      images.push(createTerrainImage(resource));
    }
    return images;
  }

  export function createTerrainRatings(resources: TerrainRatingResource[]): TerrainRating[] {
    const images = [];
    for (const resource of resources) {
      images.push(createTerrainRating(resource));
    }
    return images;
  }
}
