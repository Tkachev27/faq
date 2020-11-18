import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component'

import { AuthGuard } from './shared/services/authGuard.service'
import { AdminGuard } from './shared/services/adminGuard.service'
import { GuestLayoutComponent } from './shared/components/guest-layout/guest-layout.component'
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component'
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component'
import { QuestionPageComponent } from './question-page/question-page.component'
import { QuestionComponent } from './question-page/question/question.component'
import { AboutPageComponent } from './about-page/about-page.component'
import { UsersQuestionsPageComponent } from './users-questions-page/users-questions-page.component'
import { LogsPageComponent } from './logs-page/logs-page.component'
import { SearchPageComponent } from './search-page/search-page.component'

//import { VendorListComponent } from './vendor-list/vendor-list.component'

// Define routes
const routes: Routes = [
    {
        path: '',
        component: GuestLayoutComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HomePageComponent },
            { path: 'questions', component: QuestionPageComponent },
            { path: 'questions/:id', component: QuestionComponent },
            { path: 'about', component: AboutPageComponent },
            { path: 'search/:req', component: SearchPageComponent },
        ],
    },
    {
        path: '',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/userhome', pathMatch: 'full' },
            { path: 'userhome', component: HomePageComponent },
            { path: 'userquestions', component: QuestionPageComponent },
            { path: 'userquestions/:id', component: QuestionComponent },
            { path: 'usermyquestions', component: UsersQuestionsPageComponent },
            { path: 'usermyquestions/:id', component: QuestionComponent },
            { path: 'userabout', component: AboutPageComponent },
            { path: 'usersearch/:req', component: SearchPageComponent },
        ],
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: '/adminhome', pathMatch: 'full' },
            { path: 'adminhome', component: HomePageComponent },
            { path: 'adminquestions', component: QuestionPageComponent },
            { path: 'adminquestions/:id', component: QuestionComponent },
            {
                path: 'adminusersquestions',
                component: UsersQuestionsPageComponent,
            },
            { path: 'adminusersquestions/:id', component: QuestionComponent },
            { path: 'adminlogs', component: LogsPageComponent },
            { path: 'adminabout', component: AboutPageComponent },
            { path: 'adminsearch/:req', component: SearchPageComponent },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
