import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemansComponent } from './pokemans.component';

describe('PokemansComponent', () => {
  let component: PokemansComponent;
  let fixture: ComponentFixture<PokemansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
