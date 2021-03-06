import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CacheService } from './cache.service';
import { Terrain, TerrainFactory, TerrainResource } from './terrain';

import { environment } from '../../environments/environment';


@Injectable()
export class TerrainService {
  public static readonly API_BASE_URL = environment.apiBaseUrl + '/v1/';
  private CACHE_EXPIRATION_MILLIS = 60 * 1000;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {}

  public getTerrains(): Observable<Terrain[]> {
    const url = TerrainService.API_BASE_URL + 'terrain/';
    const observable = new Observable<Terrain[]>(observer => {
      this.httpClient.get<TerrainResource[]>(url).subscribe(terrainResources => {
        observer.next(TerrainFactory.createTerrains(terrainResources));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  public getTerrain(terrainId: number): Observable<Terrain> {
    const url = TerrainService.API_BASE_URL + 'terrain/' + terrainId;
    return new Observable<Terrain>(observer => {
      this.httpClient.get<TerrainResource>(url).subscribe(terrainResource => {
        console.log(terrainResource);
        observer.next(TerrainFactory.createTerrain(terrainResource));
        observer.complete();
      });
    });
  }

  public getTerrainByOSMId(terrains: Terrain[], osmId: number): Terrain | null {
    for (const terrain of terrains) {
      if (terrain.osmId === osmId) {
        return terrain;
      }
    }
    return null;
  }

  public uploadTerrainImage(terrainId, filename, formData) {
    const url = TerrainService.API_BASE_URL + 'terrain/' + terrainId + '/image/upload/' + filename;
    return this.httpClient.post<any>(url, formData);
  }

  public getTerrainImageUrl(imageId, size) {
    const url = TerrainService.API_BASE_URL + 'terrain/image/' + imageId + '/' + size ;
    console.log('getTerrainImageUrl', url);
    return new Observable<string>(observer => {
      return this.httpClient.get<any>(url).subscribe(response => {
        const imageUrl = environment.apiBaseUrl + response.url;
        console.log('getTerrainImageUrl', imageUrl);
        observer.next(imageUrl);
        observer.complete();
      });
    });
  }

  public addTerrainRating(terrainId: number, rating: number) {
    const url = TerrainService.API_BASE_URL + 'terrain/rating/';
    return this.httpClient.post<any>(url, {'rating': rating, 'terrain': terrainId});
  }
}
