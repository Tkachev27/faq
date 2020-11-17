import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { SiteLayoutComponent } from './shared/components/site-layout/site-layout.component'

import { HomePageComponent } from './home-page/home-page.component'
import { SelectManagerComponent } from './shared/components/select-manager/select-manager.component'
import { LoaderComponent } from './shared/components/loader/loader.component'
import { CreateModalComponent } from './shared/components/create-modal/create-modal.component'
import { TokenInterceptor } from './shared/services/token.interceptor'
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component'
import { LoginPageComponent } from './shared/components/login-page/login-page.component'
import { RegisterPageComponent } from './shared/components/register-page/register-page.component'

@NgModule({
    declarations: [
        AppComponent,
        AuthLayoutComponent,
        LoginPageComponent,
        RegisterPageComponent,
        SiteLayoutComponent,
        HomePageComponent,
        SelectManagerComponent,
        LoaderComponent,
        CreateModalComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
