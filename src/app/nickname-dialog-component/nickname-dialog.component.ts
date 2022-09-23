import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface NicknameDialogData {
  playerName: string;
  animal: string;
}

@Component({
  selector: 'app-nickname-dialog-component',
  templateUrl: './nickname-dialog.component.html',
  styleUrls: ['./nickname-dialog.component.scss']
})
export class NicknameDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NicknameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public nickname: string,
  ) {}

  ngOnInit(): void {
  }
  onNoClick(){

  }
}
