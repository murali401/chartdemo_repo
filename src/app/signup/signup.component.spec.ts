import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

describe('GroceryListComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  // create stub for firestore
  // https://github.com/angular/angularfire2/issues/1706
  const firestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
    }),
  };

  // create mock for auth object
  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'onAuthStateChanged': Promise.resolve(true)
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO add unit tests to cover rest of code for component
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
