import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutencaoProdutos } from './manutencao-produtos';

describe('ManutencaoProdutos', () => {
  let component: ManutencaoProdutos;
  let fixture: ComponentFixture<ManutencaoProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoProdutos],
    }).compileComponents();

    fixture = TestBed.createComponent(ManutencaoProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
