import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NicknameDialogComponent } from './nickname-dialog.component';

describe('NicknameDialogComponentComponent', () => {
  let component: NicknameDialogComponent;
  let fixture: ComponentFixture<NicknameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NicknameDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NicknameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
