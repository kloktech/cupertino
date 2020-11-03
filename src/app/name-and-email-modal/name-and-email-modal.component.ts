import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-name-and-email-modal',
  templateUrl: './name-and-email-modal.component.html',
  styleUrls: ['./name-and-email-modal.component.css']
})
export class NameAndEmailModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NameAndEmailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}
