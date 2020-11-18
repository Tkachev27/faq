import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { Question } from '../../interfaces'

@Component({
    selector: 'app-select-manager',
    templateUrl: './select-manager.component.html',
    styleUrls: ['./select-manager.component.scss'],
})
export class SelectManagerComponent implements OnInit {
    @Input() items: Array<Question>
    @Input() user: string
    admin = false

    @Output('onDeleteEvent') onDel = new EventEmitter<Question>()
    loading = false

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.admin = this.user == 'admin' ? true : false
    }

    onDelete(item: Question) {
        this.onDel.emit(item)
    }
    onQuestionSelect(item: Question) {
        this.router.navigate([`/${this.user}questions/${item._id}`])
    }
}
