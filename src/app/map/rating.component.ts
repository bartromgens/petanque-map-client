import { Component, Input, OnInit } from '@angular/core';
import { TerrainService } from '../core/terrain.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {
  readonly MAX_RATING = 5;
  rating = 0;
  nRatings = 0;
  myRating: number;
  isReadonly = false;
  overStar: number | undefined;
  _terrainId: number;

  @Input()
  set terrainId(id) {
    this._terrainId = id;
    this.updateRating();
  }

  constructor(private terrainService: TerrainService) { }

  ngOnInit(): void {
    this.updateRating();
  }

  hoveringOver(value: number): void {
    this.overStar = value;
  }

  resetStar(): void {
    this.overStar = void 0;
  }

  onRateChange(rating: number): void {
    this.terrainService.addTerrainRating(this._terrainId, rating).subscribe(response => {
      this.myRating = rating;
      this.updateRating();
    }, error1 => {
      console.error(error1);
    });
  }

  private updateRating(): void {
    this.terrainService.getTerrain(this._terrainId).subscribe(terrain => {
      this.rating = terrain.getRating();
      this.nRatings = terrain.getRatingNumber();
    });
  }
}
