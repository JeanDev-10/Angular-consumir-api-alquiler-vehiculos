import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAlquiladosComponent } from './card-alquilados.component';

describe('CardAlquiladosComponent', () => {
  let component: CardAlquiladosComponent;
  let fixture: ComponentFixture<CardAlquiladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAlquiladosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAlquiladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
