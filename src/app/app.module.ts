import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeBackEndInterceptor } from './fake-backend';
import { JwtInterceptor } from './jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[ReactiveFormsModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: FakeBackEndInterceptor, multi: true } ,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
