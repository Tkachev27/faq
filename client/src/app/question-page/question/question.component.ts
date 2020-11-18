import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Answer, Question } from 'src/app/shared/interfaces'
import { AnswerService } from 'src/app/shared/services/answer.service'
import { QuestionService } from 'src/app/shared/services/question.service'

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
    loading = false
    question: Question
    answers: Array<Answer> = []

    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService,
        private answerService: AnswerService
    ) {}

    ngOnInit(): void {
        this.loading = true

        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    if (params['id']) {
                        return this.questionService.getById(params['id'])
                    }

                    return of(null)
                })
            )
            .subscribe((question) => {
                this.answerService.fetch(question._id).subscribe((answers) => {
                    this.answers = answers
                    this.question = question

                    this.loading = false
                })
            })
    }
}
