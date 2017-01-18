import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OxButtonModule } from './button';

describe('OxButton', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OxButtonModule.forRoot()],
      declarations: [TestApp]
    });

    TestBed.compileComponents();
  }));

  // General button tests
  it('should apply class based on size attribute', () => {
    let fixture = TestBed.createComponent(TestApp);

    let testComponent = fixture.debugElement.componentInstance;
    let buttonDebugElement = fixture.debugElement.query(By.css('button'));

    testComponent.buttonSize = 'small';
    fixture.detectChanges();
    expect(buttonDebugElement.nativeElement.classList.contains('ox-button-sm')).toBe(true);

    testComponent.buttonSize = 'large';
    fixture.detectChanges();
    expect(buttonDebugElement.nativeElement.classList.contains('ox-button-lg')).toBe(true);
  });

  // Regular button tests
  describe('button[ox-button]', () => {
    it('should handle a click on the button', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('button'));

      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });

    it('should not increment if disabled', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('button'));

      testComponent.isDisabled = true;
      fixture.detectChanges();

      buttonDebugElement.nativeElement.click();

      expect(testComponent.clickCount).toBe(0);
    });

    it('should disable the native button element', () => {
      let fixture = TestBed.createComponent(TestApp);
      let buttonNativeElement = fixture.nativeElement.querySelector('button');
      expect(buttonNativeElement.disabled).toBeFalsy('Expected button not to be disabled');

      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();
      expect(buttonNativeElement.disabled).toBeTruthy('Expected button to be disabled');
    });

  });

});

/** Test component that contains an OxButton. */
@Component({
  selector: 'test-app',
  template: `
    <button ox-button type="button" (click)="increment()"
      [disabled]="isDisabled" [size]="buttonSize">
      button
    </button>
  `
})
class TestApp {
  clickCount: number = 0;
  isDisabled: boolean = false;

  increment() {
    this.clickCount++;
  }
}
