import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {By} from '@angular/platform-browser'

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit header title name on click', () => {
    component.items = [{ title: 'Meu portifólio' },
                        { title: 'Ações' },
                        { title: 'Histórico de greços' },
                        { title: 'Projeção de ganhos'},
                        { title: 'Comparar ações'}];
    fixture.detectChanges();

    const firstName = fixture.debugElement.query(By.css('#title a'));

    component.response.subscribe((response) => {
      expect(response).toEqual({ title: 'Meu portifólio', selected: true });
    });

    firstName.triggerEventHandler('click', null);
  });
});
