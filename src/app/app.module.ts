import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { ShopPageModule } from '../pages/shop/shop.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { PaymentPageModule } from '../pages/payment/payment.module';
import { PasswordPageModule } from '../pages/password/password.module';
import { StorageProvider } from '../providers/storage/storage';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    SignupPageModule,
    ShopPageModule,
    MenuPageModule,
    PaymentPageModule,
    PasswordPageModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp,{mode:"ios"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider
  ]
})
export class AppModule {}
