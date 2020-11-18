import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-guest-layout',
    templateUrl: './guest-layout.component.html',
    styleUrls: ['./guest-layout.component.scss'],
})
export class GuestLayoutComponent implements OnInit, AfterViewInit {
    links = [
        { url: '/home', name: 'Home' },
        { url: '/questions', name: 'Questions' },
        { url: '/about', name: 'About Us' },
    ]
    searchPhrase: string
    constructor(private router: Router) {}

    ngAfterViewInit(): void {}

    ngOnInit(): void {}

    onPageChange(url: string) {}
    logIn() {}
    onSearchStart() {
        if (this.searchPhrase) {
            this.router.navigate(['/search', this.searchPhrase])
        }
    }
    onSearchCancel() {
        this.searchPhrase = ''
    }
}
