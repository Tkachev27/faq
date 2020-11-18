import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
    links = [
        { url: '/adminhome', name: 'Home' },
        { url: '/adminquestions', name: 'Questions' },
        { url: '/adminusersquestions', name: 'Users Questions' },
        { url: '/adminlogs', name: 'Logs' },
        { url: '/adminabout', name: 'About Us' },
    ]
    constructor(private router: Router) {}

    ngAfterViewInit(): void {}

    ngOnInit(): void {}

    onPageChange(url: string) {}
    logOut() {}
}
