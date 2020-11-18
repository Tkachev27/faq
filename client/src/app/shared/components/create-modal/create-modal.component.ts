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
    @Input() categoryId
    @Input() service
    @Output('onChangeEvent') onChange = new EventEmitter<any>()
    constructor() {}

    ngOnInit(): void {
        this.loadingModal = true
        this.form = new FormGroup({
            content: new FormControl(null, Validators.required),
        })

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
            content: this.form.value.content,
            categoryId: this.categoryId,
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
