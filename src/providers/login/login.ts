import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
declare var KakaoTalk: any;
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  browserRef;
  restAPIKey = '55003b3ae6bd0a45629c3b680347c98c';
  kakaoOuathUrl = 'http://218.145.181.49:8080/oauth'

  constructor(public http: HttpClient, private fb:Facebook, private platform:Platform, private appAvailability:AppAvailability, private iab:InAppBrowser) {
    console.log('Hello LoginProvider Provider');
  }

  loginSocialLogin(type){

    if (type=="facebook"){
      return new Promise((resolve, reject)=>{
        console.log("facebook login");

        this.fb.getLoginStatus().then((status_response) => {
          console.log(JSON.stringify(status_response));
          if (status_response.status == 'connected') {
            console.log(("connected status:" + JSON.stringify(status_response)));
            console.log((status_response.authResponse.userID));
            this.fb.api("me/?fields=id, email, last_name, first_name", ["public_profile", "email"]).then((api_response) => {
              console.log(JSON.stringify(api_response));
            }, (api_err) => {
              console.log("facebook.api error:" + JSON.stringify(api_err));
              let reason = { stage: "api_err", msg: api_err };
              reject(reason);
            });
          } else {  // try login
            console.log("Not connected status");
            this.fb.login(["public_profile", "email"]).then((login_response: any) => {
              console.log(JSON.stringify(login_response));
              console.log((login_response.authResponse.userID));

              this.fb.api("me/?fields=id, email, last_name, first_name", ["public_profile", "email"]).then((api_response) => {
                console.log(JSON.stringify(api_response));
              }, (api_err) => {
                console.log("facebook.api error:" + JSON.stringify(api_err));
                let reason = { stage: "api_err", msg: api_err };
                reject(reason);
              });
            }, (login_err) => {
              console.log(JSON.stringify(login_err));
              let reason = { stage: "login_err", msg: login_err };
              reject(reason);
            });
          }
        }, (status_err) => {
          console.log(JSON.stringify(status_err));
          let reason = { stage: "status_err", msg: status_err };
          reject(reason);
        });
        resolve();
      });
    } else if(type=="kakaotalk"){
      return new Promise((resolve, reject)=>{
        var scheme;
        if (this.platform.is('android')) {
          scheme = 'com.kakao.talk';
        } else if (this.platform.is('ios')) {
          scheme = 'kakaotalk://';
        } else {
          console.log("unknwon platform");
        }
        console.log("ionic-scheme:" + scheme);

        this.appAvailability.check(scheme).then(() => {
          // Success callback
          console.log(scheme + ' is avaliable. call KaKaoTalk.login');
          KakaoTalk.login((userProfile) => {
            console.log("userProfile:" + JSON.stringify(userProfile));
            console.log("Successful kakako login");
            /* !!!! Add app server login here !!!*/
            resolve(userProfile);
          }, (err) => {
            console.log('Error logging in');
            console.log(JSON.stringify(err));
            let reason = { stage: "login_err", msg: err };
            reject(reason);
          });
        }, (error) => {
          // Error callback
          let SuccessComes: boolean = false;
          this.browserRef = this.iab.create("https://kauth.kakao.com/oauth/authorize?client_id=" + this.restAPIKey +
            "&redirect_uri=" + this.kakaoOuathUrl + "&response_type=code", "_blank");
          this.browserRef.on("exit").subscribe((event: InAppBrowserEvent) => {
            let successsComes: boolean = false;
            console.log("exit comes:" + JSON.stringify(event));
            setTimeout(() => {
              if (!successsComes) {
                let reason = { stage: "login_error", msg: "no input" };
                reject(reason);
              }
            }, 1000); // 1second. Is it enough?
          });
        });
      });
    }
  }
}
