import {
    AfterContentChecked,
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
import {
    MaterialInstance,
    MaterialService,
} from '../../services/Material.service'

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent
    implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
    @ViewChild('select') selectRef: ElementRef

    @Input() label: string
    @Input() optionList: Array<string>

    @Output('onChangeSelect') onChange = new EventEmitter<string>()

    select: MaterialInstance
    modelSelect

    initialValue: string = '44'

    constructor() {
        this.modelSelect = this.initialValue
    }

    ngOnInit() {}

    ngAfterContentChecked() {
        this.modelSelect = this.initialValue
    }
    ngAfterViewInit() {
        this.select = MaterialService.initSelect(this.selectRef)
    }

    ngOnDestroy() {
        this.select.destroy()
    }
    onChangeSelect() {
        this.onChange.emit(this.modelSelect)
    }
}
