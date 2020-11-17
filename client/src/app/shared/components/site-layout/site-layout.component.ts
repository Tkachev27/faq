import { Component, AfterViewInit, OnInit } from '@angular/core'

import { Router } from '@angular/router'

@Component({
    selector: 'app-site-layout',
    templateUrl: './site-layout.component.html',
    styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {
    links = [
        { url: '/home', name: 'Home' },

        // { url: '/warehouse', name: 'Products' },
        // { url: '/shopOrders', name: 'Orders' },
        // { url: '/about', name: 'About' },
        // { url: '/login', name: 'Log In' },
        // { url: '/login', name: 'Registeration' },
    ]

    constructor(private router: Router) {}
    ngAfterViewInit(): void {}

    ngOnInit(): void {}

    onPageChange(url: string) {}
}
