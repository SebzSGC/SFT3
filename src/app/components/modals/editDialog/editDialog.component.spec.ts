import { ComponentFixture, TestBed } from '@angular/core/testing';
import { editDialogComponent } from './editDialog.component';

describe('DialogComponent', () => {
  let component: editDialogComponent;
  let fixture: ComponentFixture<editDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ editDialogComponent]
    });
    fixture = TestBed.createComponent(editDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
