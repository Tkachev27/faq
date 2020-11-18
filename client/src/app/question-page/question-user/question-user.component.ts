import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Answer, Question } from 'src/app/shared/interfaces'
import { AnswerService } from 'src/app/shared/services/answer.service'
import { LogService } from 'src/app/shared/services/log.service'
import { MaterialService } from 'src/app/shared/services/Material.service'
import { QuestionService } from 'src/app/shared/services/question.service'

@Component({
    selector: 'app-question-user',
    templateUrl: './question-user.component.html',
    styleUrls: ['./question-user.component.scss'],
})
export class QuestionUserComponent implements OnInit {
    loading = false
    question: Question
    admin = false
    page = 'answer'
    answers: Array<any> = []
    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService,
        private answerService: AnswerService,
        private logService: LogService
    ) {}

    ngOnInit(): void {
        this.loading = true

        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    if (params['id']) {
                        return this.questionService.getByIdUser(params['id'])
                    }

                    return of(null)
                })
            )
            .subscribe((question) => {
                this.answerService
                    .fetchUser(question.question._id)
                    .subscribe((answers) => {
                        this.answers = answers
                        this.question = question.question
                        this.admin = question.admin

                        this.loading = false
                    })
            })
    }
    newAnswerCreated(answer: Answer) {
        this.answers.push(answer)
        this.logService.create({ action: `answer created` }).subscribe(() => {})
    }
    onDeleteAnswer(answer: Answer) {
        const decision = window.confirm(`Delete answer?`)
        if (decision) {
            this.answerService.delete(answer).subscribe(
                (response) => {
                    MaterialService.toast(response.message)
                    this.logService
                        .create({ action: `answer deleted` })
                        .subscribe(() => {})
                    this.answers.splice(
                        this.answers.findIndex((p) => p._id == answer._id),
                        1
                    )
                },
                (error) => MaterialService.toast(error.error.message)
            )
        }
    }
}
