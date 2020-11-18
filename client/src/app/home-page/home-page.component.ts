import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../shared/services/auth.service'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    isAdmin = false
    isUser = false
    isGuest = false
    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        this.isAdmin = this.auth.isAdmin()
        this.isUser = this.auth.isAuthenticated() && !this.isAdmin
        this.isGuest = !(this.isAdmin || this.isUser)
    }
    onAction() {
        if (this.isAdmin) this.router.navigate(['/adminquestions'])
        if (this.isUser) this.router.navigate(['/userquestions'])
        if (this.isGuest) this.router.navigate(['/questions'])
    }
}
