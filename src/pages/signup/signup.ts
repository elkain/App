import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopPage } from '../shop/shop';
import { PasswordPage } from '../password/password';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email:string;
  password: string;
  passwordConform: string;
  agreement: boolean=false;
  buttonColor: any={'color':'#6441a5'};
  userAgreementShown:boolean = false; // 1

  currentShown; // undefined
  paswwordConfirmString:string="";
  passwordString:string="";
  passwordMask:boolean=false;
  passwordConfirmMask:boolean=false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone:NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  checked(){
    console.log("checked comes");
    if(!this.agreement){
      this.agreement=true;
      this.buttonColor={'color':'white', 'background-color':'#6441a5'};
    }else{
      this.navCtrl.push(ShopPage);
    }
  }

  show(title){
    console.log(title + " comes");
    this.userAgreementShown = !this.userAgreementShown;
  }

  back(){
    this.navCtrl.pop();
  }

  myCallbackPasswordFunction=(_params) => {
    return new Promise((resolve, reject)=>{
      console.log("password confirm params:"+_params);
      this.password = _params;
      this.ngZone.run(()=>{
        this.passwordString="******";
        this.passwordMask = true;
        console.log("this.passwordConfirmString:"+this.passwordString);
      });
      resolve();
    });
  }

  myCallbackPasswordConfirmFunction = (_params) => {
    return new Promise((resolve, reject) => {
      console.log("password confirm params:" + _params);
      this.password = _params;
      this.ngZone.run(() => {
        this.passwordString = "******";
        this.passwordMask = true;
        console.log("this.passwordConfirmString:" + this.passwordString);
      });
      resolve();
    });
  }

  passwordInput(){
    this.navCtrl.push(PasswordPage, { callback: this.myCallbackPasswordFunction })
  }

  passwordConfirmInput() {
    this.navCtrl.push(PasswordPage, { callback: this.myCallbackPasswordConfirmFunction })
  }
}
