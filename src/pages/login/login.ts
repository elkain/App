import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginProvider:LoginProvider,
              private alertController:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  kakaoLogin(){
    this.loginProvider.loginSocialLogin("kakaotalk").then((res: any) => {
      this.navCtrl.push(SignupPage, { type: "kakaotalk", id: res.id });
    }, err => {
      let alert = this.alertController.create({
        title: '카카오톡 로그인에 실패했습니다.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  facebookLogin(){
    this.loginProvider.loginSocialLogin("facebook").then((res:any)=>{
      this.navCtrl.push(SignupPage,{type:"facebook",id:res.id});
    }, err=>{
      let alert = this.alertController.create({
        title:'페이스북 로그인에 실패했습니다.',
        buttons : ['OK']
      });
      alert.present();
    });
  }
}
