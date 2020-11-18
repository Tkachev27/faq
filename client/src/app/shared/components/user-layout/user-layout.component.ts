import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-user-layout',
    templateUrl: './user-layout.component.html',
    styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit, AfterViewInit {
    links = [
        { url: '/userhome', name: 'Home' },
        { url: '/userquestions', name: 'Questions' },
        { url: '/usermyquestions', name: 'My Questions' },
        { url: '/userabout', name: 'About Us' },
    ]
    searchPhrase: string
    constructor(private router: Router, private auth: AuthService) {}

    ngAfterViewInit(): void {}

    ngOnInit(): void {}

    onPageChange(url: string) {}
    logout() {
        this.auth.logout()
        this.router.navigate(['/home'])
    }
    onSearchStart() {
        if (this.searchPhrase) {
            this.router.navigate(['/usersearch', this.searchPhrase])
        }
    }
    onSearchCancel() {
        this.searchPhrase = ''
    }
}
