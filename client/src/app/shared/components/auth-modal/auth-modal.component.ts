import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import {
    MaterialInstance,
    MaterialService,
} from '../../services/Material.service'

@Component({
    selector: 'app-auth-modal',
    templateUrl: './auth-modal.component.html',
    styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('modal') modalRef: ElementRef
    modal: MaterialInstance
    form: FormGroup
    aSub: Subscription
    loadingModal = false
    login = true
    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.loadingModal = true
        this.form = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
        })

        this.loadingModal = false
    }
    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef)
    }
    onChangeUse(type: string) {
        this.login = type == 'login' ? true : false
    }

    onModalOpen() {
        this.modal.open()
        this.form.reset()
        MaterialService.updateTextInputs()
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe()
        }
        this.modal.destroy()
    }

    onSubmit() {
        this.form.disable()
        if (this.login) {
            this.aSub = this.auth.login(this.form.value).subscribe(
                () => {
                    if (localStorage.user == '12admin34@gmail.com') {
                        this.router.navigate(['/adminhome'])
                    } else if (localStorage.user) {
                        this.router.navigate(['/userhome'])
                    }

                    this.modal.close()
                },
                (error) => {
                    MaterialService.toast(error.error.message)
                    this.form.enable()
                }
            )
        } else {
            this.auth.register(this.form.value).subscribe(
                (user) => {
                    MaterialService.toast('User created')

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
}
