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

  public getTerrainById(terrains: Terrain[], osmId: number): Terrain | null {
    for (const terrain of terrains) {
      if (terrain.osmId === osmId) {
        return terrain;
      }
    }
    return null;
  }
}
