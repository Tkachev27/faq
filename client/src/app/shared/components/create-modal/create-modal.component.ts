import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { SubsoilUser } from '../../interfaces'
import {
    MaterialInstance,
    MaterialService,
} from '../../services/Material.service'

@Component({
    selector: 'app-create-modal',
    templateUrl: './create-modal.component.html',
    styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('modal') modalRef: ElementRef
    modal: MaterialInstance
    form: FormGroup
    loadingModal = false
    @Input() id

    @Input() template
    @Input() service
    @Output('onChangeEvent') onChange = new EventEmitter<SubsoilUser>()
    constructor() {}

    ngOnInit(): void {
        this.loadingModal = true
        this.form = new FormGroup({
            fields: new FormArray([]),
        })
        for (let item of this.template.options) {
            const control = new FormControl(null, Validators.required)
            ;(this.form.get('fields') as FormArray).push(control)
        }

        this.loadingModal = false
    }
    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef)
    }
    onAddItem() {
        this.modal.open()
        this.form.reset()
        MaterialService.updateTextInputs()
    }
    onModalSubmit() {
        let data: any = {
            id: this.id,
        }
        for (let i = 0; i < this.template.options.length; i++) {
            data[this.template.options[i].name] = this.form.value.fields[i]
        }

        this.service.create(data).subscribe(
            (data) => {
                MaterialService.toast('Created')
                this.onChange.emit(data)
            },
            (error) => MaterialService.toast(error.error.message)
        )
        this.modal.close()
    }
    onModalCancel() {
        this.modal.close()
    }
    ngOnDestroy() {
        this.modal.destroy()
    }
    onChangeField() {}
}
