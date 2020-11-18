import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
    searchPhrase
    links = [
        { url: '/adminhome', name: 'Home' },
        { url: '/adminquestions', name: 'Questions' },
        { url: '/adminusersquestions', name: `User's Questions` },
        { url: '/adminlogs', name: 'Logs' },
        { url: '/adminabout', name: 'About Us' },
    ]
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
            this.router.navigate(['/adminsearch', this.searchPhrase])
        }
    }
    onSearchCancel() {
        this.searchPhrase = ''
    }
}
