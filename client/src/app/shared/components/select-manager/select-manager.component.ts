import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
    selector: 'app-select-manager',
    templateUrl: './select-manager.component.html',
    styleUrls: ['./select-manager.component.scss'],
})
export class SelectManagerComponent implements OnInit {
    @Input() items: Array<any>
    @Input() template
    @Output('onChangeEvent') onChange = new EventEmitter<any>()
    @Output('onDeleteEvent') onDel = new EventEmitter<any>()
    loading = false

    constructor() {}

    ngOnInit(): void {}
    onChangeItem(item) {
        this.onChange.emit(item)
    }
    onDelete(item) {
        this.onDel.emit(item)
    }
}
