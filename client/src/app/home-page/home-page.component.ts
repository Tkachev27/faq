import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../shared/services/auth.service'
import { LogService } from '../shared/services/log.service'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    isAdmin = false
    isUser = false
    isGuest = false
    constructor(
        private auth: AuthService,
        private router: Router,
        private logService: LogService
    ) {}

    ngOnInit() {
        this.isAdmin = this.auth.isAdmin()
        this.isUser = this.auth.isAuthenticated() && !this.isAdmin
        this.isGuest = !(this.isAdmin || this.isUser)
    }
    onAction() {
        if (this.isAdmin) this.router.navigate(['/adminquestions'])
        if (this.isUser) {
            this.router.navigate(['/userquestions'])
            this.logService
                .create({ action: `following a link: /userquestions` })
                .subscribe(() => {})
        }
        if (this.isGuest) this.router.navigate(['/questions'])
    }
}
