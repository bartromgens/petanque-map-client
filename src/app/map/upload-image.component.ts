import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TerrainService } from '../core/terrain.service';

@Component({
  selector: 'app-terrain-upload-image',
  templateUrl: './upload-image.component.html',
})
export class UploadImageComponent implements OnInit {
  form: FormGroup;
  response;
  @Input() terrainId: number;

  constructor(private formBuilder: FormBuilder, private terrainService: TerrainService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: ['']
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    const file = this.form.get('file').value;
    formData.append('file', file);
    console.log(file);

    this.terrainService.uploadTerrainImage(this.terrainId, file.name, formData).subscribe(
      (res) => {
        this.response = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

