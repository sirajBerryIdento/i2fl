import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketsComponent } from './websockets.component';

describe('WebsocketsComponent', () => {
  let component: WebsocketsComponent;
  let fixture: ComponentFixture<WebsocketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsocketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
