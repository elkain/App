import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient, private fb:Facebook) {
    console.log('Hello LoginProvider Provider');
  }

  loginSocialLogin = (_params)=>{
    return new Promise((resolve, reject)=>{
      console.log("facebook login");

      this.fb.getLoginStatus().then((status_response) => {
        console.log(JSON.stringify(status_response));
        if (status_response.status == 'connected') {
          console.log(("connected status:" + JSON.stringify(status_response)));
          console.log((status_response.authResponse.userID));
          this.fb.api("me/?fields=id, email, last_name, first_name", ["public_profile", "email"]).then((api_response) => {
            console.log(JSON.stringify(api_response));
            if (api_response.hasOwnProperty("email")) {
              let email = api_response.email;
            }
            if (api_response.hasOwnProperty("last_name") && api_response.hasOwnProperty("first_name")) {
              let name = api_response.last_name + api_response.first_name
            }
          }, (api_err) => {
            console.log("facebook.api error:" + JSON.stringify(api_err));
            let reason = { stage: "api_err", msg: api_err };
          });
        } else {  // try login
          console.log("Not connected status");
          this.fb.login(["public_profile", "email"]).then((login_response: any) => {
            console.log(JSON.stringify(login_response));
            console.log((login_response.authResponse.userID));

            this.fb.api("me/?fields=id, email, last_name, first_name", ["public_profile", "email"]).then((api_response) => {
              console.log(JSON.stringify(api_response));
              if (api_response.hasOwnProperty("email")) {
                let email = api_response.email;
              }
              if (api_response.hasOwnProperty("last_name") && api_response.hasOwnProperty("first_name")) {
                let name = api_response.last_name + api_response.first_name
              }
            }, (api_err) => {
              console.log("facebook.api error:" + JSON.stringify(api_err));
              let reason = { stage: "api_err", msg: api_err };
            });
          }, (login_err) => {
            console.log(JSON.stringify(login_err));
            let reason = { stage: "login_err", msg: login_err };
          });
        }
      }, (status_err) => {
        console.log(JSON.stringify(status_err));
        let reason = { stage: "status_err", msg: status_err };
      });
      resolve();
    });
  }
}
