import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  deliveryFee:number = 3000;
  payInfo:any = [{info:{name:"BC카드", mask_no:"xxxxxxxx****xxxxxxxxxxx", customer_uid:"12345"}}];

  type;
  id;
  email;
  phone="01012345678"

  constructor(private nativeStorage:NativeStorage, private platform:Platform) {
    console.log('Hello StorageProvider Provider');
    platform.ready().then(()=>{
      this.readPayInfo().then(()=>{
        this.determinCardColor();
        console.log("StorageProvider-payInfo:"+JSON.stringify(this.payInfo));
      });
    });
    
  }

  cardColorlist=[
    { name: "bc", color: "#ec4855" },
    { name: "shinhan", color: "#134596" },
    { name: "samsung", color: "#0d62a8" },
    { name: "kb", color: "#756d62" },
    { name: "hyundai", color: "#000000" },
    { name: "woori", color: "#1a9fda" },
    { name: "lotte", color: "#e02431" },
    { name: "hana", color: "#108375" },
    { name: "kakao", color: "#ebe315" },
    { name: "master", color: "#fc601f" },
    { name: "union", color: "#fb0f1c" },
    { name: "visa", color: "#1a215d" },
    { name: "비씨", color: "#ec4855" },
    { name: "신한", color: "#134569" },
    { name: "삼성", color: "#0da628" },
    { name: "국민", color: "#756d62" },
    { name: "현대", color: "#000000" },
    { name: "우리", color: "#1a9fda" },
    { name: "롯데", color: "#e02431" },
    { name: "하나", color: "#108375" },
    { name: "카카오", color: "#ebe315" },
    { name: "마스터", color: "#fc601f" },
    { name: "유니온페이", color: "#fb0f1c" },
    { name: "비자", color: "#1a215d" },
  ];

  defaultCardColor = "#33b9c6";

  determinCardColor(){
    console.log("determinCardColor");
    this.payInfo.forEach((payment:any) => {
      payment.background=this.defaultCardColor;
      for(var i=0; i<this.cardColorlist.length; i++){
        let name:string=payment.info.name;
        if(name!=undefined && name.toLocaleLowerCase().startsWith(this.cardColorlist[i].name)){
          payment.background=this.cardColorlist[i].color;
        }
      }
    })
    console.log("payments:"+JSON.stringify(this.payInfo));
  }

  saveId(type, id, email){
    let string=JSON.stringify({type:type, id:id, email:email})
    console.log("saveId:"+string);
    var encrypted:string=this.encryptionValue(string);
    this.nativeStorage.setItem('id', encodeURI(encrypted));
    
    this.type = type;
    this.id = id;
    this.email = email;
  }

  readId(){
    return new Promise((resolve, reject)=>{
      console.log("readId getItem");
      
      this.nativeStorage.getItem("id").then((value:string)=>{
        console.log("...value:"+value);
        if(value==null){
          reject();
        }else{
          console.log("...id:"+this.decryptionValue(value));
          let obj=JSON.parse(this.decryptionValue(value));
          this.email=obj.email;
          this.type=obj.type;
          this.id=obj.id;
          resolve(JSON.parse(this.decryptionValue(value)));
        }
      },(err)=>{
        reject();
      });
    });
  }

  savePassword(password){
    console.log("savePassword:" + password);
    var encrypted: string = this.encryptionValue(password);
    this.nativeStorage.setItem('password', encodeURI(encrypted));
  }

  readPassword(){
    return new Promise((resolve, reject) => {
      console.log("readPassword getItem");

      this.nativeStorage.getItem("password").then((value: string) => {
        console.log("...value:" + value);
        if (value == null) {
          reject();
        } else {
          console.log("...password:" + this.decryptionValue(value));
          resolve(this.decryptionValue(value));
        }
      }, (err) => {
        reject();
      });
    });
  }

  /*  암호화 방법 수정 필요 
      키 전송 방법이 조잡함, AES 가 아닌 sha1 등의 암호화 방식으로 변형 필요 */
  encryptionValue(value){
    var buffer = "";

    for(var i = 0; i < 16; i++){
      buffer+=Math.floor((Math.random()*10));
    }

    console.log("buffer"+buffer);
    var encrypted = CryptoJS.AES.encrypt(value,buffer);
    console.log("value:"+buffer+encrypted);
    
    return (buffer+encrypted);
  }

  decryptionValue(value){
    var key = value.substring(0, 16);
    var encrypt = value.substring(16, value.length);
    console.log("value:" + value + " key:" + key + " encrypt: " + encrypt);
    var decrypted = CryptoJS.AES.decrypt(encrypt, key);

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  savePayInfo(){
    var encrypted:string = this.encryptionValue(JSON.stringify(this.payInfo));
    this.nativeStorage.setItem('payInfo', encodeURI(encrypted));
  }

  readPayInfo(){
    return new Promise((resolve, reject)=>{
      this.nativeStorage.getItem("payInfo").then((value:string)=>{
        console.log("value:"+value);
        if(value==null){
          reject();
        }else{
          console.log(this.decryptionValue(value));
          this.payInfo=JSON.parse(this.decryptionValue(value));
          resolve();
        }
      }, (err)=>{
        reject();
      });
    });
  }
}
