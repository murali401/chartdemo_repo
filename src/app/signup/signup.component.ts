import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProfile } from 'src/models/user-profile';


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  fName = '';
  lName = '';
  gender = '';

  showLoginUserInputForm = false;
  showCreateUserInputForm = false;
  email = '';
  password = '';
  // create doc of type Item that represents the individual GroceryItems nested collection
  //groceryItemsDoc: AngularFirestoreDocument<Item>;
  userProfiles: Observable<UserProfile[]>;
  userscollection: AngularFirestoreCollection;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // show email in welcome message
        this.email = user.email;
        // call method that selects all items when user is authenticated
        this.selectItems(user.uid);
      }
    });
  }

  // async is not necessary here, but using it to control event loop
  async addItem() {
    //const id = this.afs.createId();
    const userProfile: UserProfile = {
      fName: this.fName,
      lName: this.lName,
      gender: this.gender,
    };
    
    //await this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').doc(this.email).set(groceryItem)
    await this.afs.collection('user').doc(this.email).set(userProfile)
      .then(() => {
          // when successful clear input field value here
          this.fName = '';
          this.lName = '';
          this.gender = '';
      })
      .catch((error) => {
        alert(error);
      });
  }

  showLoginUserForm() {
    this.showLoginUserInputForm = true;
  }

  showCreateUserForm() {
    this.showCreateUserInputForm = true;
  }

  createUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.addItem();
          // on success hide create user input form and store variables in login
          // and then call the login method
          this.showCreateUserInputForm = false;
          this.loginUser(email, password);
          
          
      })
      .catch((error) => {
        alert(error);
      });
  }

  loginUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // on success populate user variables and then select user data
        this.selectItems(this.afAuth.auth.currentUser.uid);
      })
      .catch((error) => {
        alert(error);
      });
  }

  selectItems(uid: string) {
    this.userProfiles = this.afs.collection<UserProfile>('user').valueChanges();
    // // turn on logging if you want to see how the requests are sent
     this.userProfiles.subscribe(console.log);
  }

  // async is not necessary here, just controlling the event loop
  async logoutUser() {
    await this.afAuth.auth.signOut()
      .catch(function(error) { alert(error); });

    this.email = '';
    this.password = '';
    this.showLoginUserInputForm = false;
    this.showCreateUserInputForm = false;
  }

  cancelButton() {
    this.showLoginUserInputForm = false;
    this.showCreateUserInputForm = false;
  }

}
