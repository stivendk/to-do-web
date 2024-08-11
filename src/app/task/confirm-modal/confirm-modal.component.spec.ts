import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';
import { By } from '@angular/platform-browser';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmAction when confirm is called', () => {
    spyOn(component.confirmAction, 'emit');

    component.confirm();

    expect(component.confirmAction.emit).toHaveBeenCalled();
  });

  it('should emit cancelAction when close is called', () => {
    spyOn(component.cancelAction, 'emit');

    component.close();

    expect(component.cancelAction.emit).toHaveBeenCalled();
  });

  it('should call confirm() when confirm button is clicked', () => {
    const confirmButton = fixture.debugElement.query(By.css('.btn-confirm'));
    expect(confirmButton).toBeTruthy('Confirm button should exist in the DOM');
    
    spyOn(component, 'confirm');
    
    confirmButton.nativeElement.click();
    
    expect(component.confirm).toHaveBeenCalled();
  });

  it('should call close() when cancel button is clicked', () => {
    const cancelButton = fixture.debugElement.query(By.css('.btn-cancel'));
    expect(cancelButton).toBeTruthy('Cancel button should exist in the DOM');
    
    spyOn(component, 'close');
    
    cancelButton.nativeElement.click();
    
    expect(component.close).toHaveBeenCalled();
  });
});