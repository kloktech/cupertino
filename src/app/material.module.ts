import { NgModule } from '@angular/core';

// Following is for MaterialModule < 9 where import a master module will import all.
// import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule]
})
export class MaterialModule {}
