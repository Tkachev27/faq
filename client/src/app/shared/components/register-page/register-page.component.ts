import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { MaterialService } from '../../services/Material.service'

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
    form: FormGroup
    @Output('onChangeEvent') onChange = new EventEmitter<any>()
    constructor(private auth: AuthService, private router: Router) {}
    admin = localStorage.user == 'kdiadmin' ? true : false
    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
            ]),
        })
    }

    onSubmit() {
        this.form.disable()
        this.auth.register(this.form.value).subscribe(
            (user) => {
                MaterialService.toast('User created')
                this.onChange.emit(user)
                this.form.reset()
                this.form.enable()
            },
            (error) => {
                MaterialService.toast(error.error.message)
                this.form.enable()
            }
        )
    }
}
