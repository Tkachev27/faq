import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component'

import { SiteLayoutComponent } from './shared/components/site-layout/site-layout.component'
import { AuthGuard } from './shared/services/authGuard.service'

//import { VendorListComponent } from './vendor-list/vendor-list.component'

// Define routes
const routes: Routes = [
    {
        path: '',
        component: SiteLayoutComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            //{ path: 'login', component: LoginPageComponent },
            { path: 'home', component: HomePageComponent },
        ],
    },
    // {
    //     path: '',
    //     component: SiteLayoutComponent,
    //     canActivate: [AuthGuard],
    //     children: [
    //         // { path: 'orders', component: OrderListComponent },
    //         // { path: 'orders/new', component: OrderAddComponent },
    //         // // { path: "orders/import", component: OrderImportComponent },
    //         // { path: 'orders/:id', component: OrderAddComponent },
    //     ],
    // },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
