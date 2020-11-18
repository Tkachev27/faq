import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { HomePageComponent } from './home-page/home-page.component'
import { SelectManagerComponent } from './shared/components/select-manager/select-manager.component'
import { LoaderComponent } from './shared/components/loader/loader.component'
import { CreateModalComponent } from './shared/components/create-modal/create-modal.component'
import { TokenInterceptor } from './shared/services/token.interceptor'

import { GuestLayoutComponent } from './shared/components/guest-layout/guest-layout.component'
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component'
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component'
import { AuthModalComponent } from './shared/components/auth-modal/auth-modal.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LogsPageComponent } from './logs-page/logs-page.component';
import { UsersQuestionsPageComponent } from './users-questions-page/users-questions-page.component';
import { QuestionComponent } from './question-page/question/question.component';
import { SearchPageComponent } from './search-page/search-page.component'

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        SelectManagerComponent,
        LoaderComponent,
        CreateModalComponent,
        GuestLayoutComponent,
        UserLayoutComponent,
        AdminLayoutComponent,
        AuthModalComponent,
        QuestionPageComponent,
        AboutPageComponent,
        LogsPageComponent,
        UsersQuestionsPageComponent,
        QuestionComponent,
        SearchPageComponent,
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
