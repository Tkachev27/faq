import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

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
    constructor(private router: Router) {}

    ngAfterViewInit(): void {}

    ngOnInit(): void {}

    onPageChange(url: string) {}
    logOut() {}
}
