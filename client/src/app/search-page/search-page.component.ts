import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Question } from '../shared/interfaces'
import { AuthService } from '../shared/services/auth.service'
import { MaterialService } from '../shared/services/Material.service'
import { QuestionService } from '../shared/services/question.service'

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
    loading = false
    questions: Array<Question> = []
    user = ''
    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.loading = true
        this.user = this.auth.isAuthenticated() ? 'user' : ''
        this.user =
            this.auth.isAuthenticated() && this.auth.isAdmin() ? 'admin' : ''
        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    if (params['req']) {
                        return this.questionService.find(params['req'])
                    }

                    return of(null)
                })
            )
            .subscribe((questions) => {
                this.questions = questions

                this.loading = false
            })
    }
    onDeleteQuestion(question: Question) {
        const decision = window.confirm(`Delete question?`)
        if (decision) {
            this.questionService.delete(question).subscribe(
                (response) => {
                    MaterialService.toast(response.message)

                    this.questions.splice(
                        this.questions.findIndex((p) => p._id == question._id),
                        1
                    )
                },
                (error) => MaterialService.toast(error.error.message)
            )
        }
    }
}
