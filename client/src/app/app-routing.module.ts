import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component'

import { AuthGuard } from './shared/services/authGuard.service'
import { AdminGuard } from './shared/services/adminGuard.service'
import { GuestLayoutComponent } from './shared/components/guest-layout/guest-layout.component'
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component'
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component'

//import { VendorListComponent } from './vendor-list/vendor-list.component'

// Define routes
const routes: Routes = [
    {
        path: '',
        component: GuestLayoutComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HomePageComponent },
            { path: 'questions', component: HomePageComponent },
            { path: 'questions/:id', component: HomePageComponent },
            { path: 'about', component: HomePageComponent },
        ],
    },
    {
        path: '',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/userhome', pathMatch: 'full' },
            { path: 'userhome', component: HomePageComponent },
            { path: 'userquestions', component: HomePageComponent },
            { path: 'userquestions/:id', component: HomePageComponent },
            { path: 'usermyquestions', component: HomePageComponent },
            { path: 'usermyquestions/:id', component: HomePageComponent },
            { path: 'userabout', component: HomePageComponent },
        ],
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: '/adminhome', pathMatch: 'full' },
            { path: 'adminhome', component: HomePageComponent },
            { path: 'adminquestions', component: HomePageComponent },
            { path: 'adminquestions/:id', component: HomePageComponent },
            { path: 'adminusersquestions', component: HomePageComponent },
            { path: 'adminusersquestions/:id', component: HomePageComponent },
            { path: 'adminlogs', component: HomePageComponent },
            { path: 'adminabout', component: HomePageComponent },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
