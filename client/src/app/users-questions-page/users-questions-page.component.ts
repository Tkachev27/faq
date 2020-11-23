import { Component, OnInit } from '@angular/core'
import { Category, Question } from '../shared/interfaces'
import { AuthService } from '../shared/services/auth.service'
import { CategoryService } from '../shared/services/category.service'
import { LogService } from '../shared/services/log.service'
import { MaterialService } from '../shared/services/Material.service'
import { QuestionService } from '../shared/services/question.service'

@Component({
    selector: 'app-users-questions-page',
    templateUrl: './users-questions-page.component.html',
    styleUrls: ['./users-questions-page.component.scss'],
})
export class UsersQuestionsPageComponent implements OnInit {
    loading = false

    questions: Array<Question> = []
    page = 'question'
    newCategoryName = ''

    isAdmin = false
    user = ''

    constructor(
        public questionService: QuestionService,
        private auth: AuthService,
        private logService: LogService
    ) {}

    async ngOnInit() {
        this.loading = true

        this.user = this.auth.isAuthenticated() ? 'user' : ''
        this.user =
            this.auth.isAuthenticated() && this.auth.isAdmin() ? 'admin' : ''
        this.isAdmin = this.auth.isAdmin()

        let questionsPromise = new Promise<Array<Category>>(
            (resolve, reject) => {
                this.questionService.fetchList().subscribe(
                    (questions) => {
                        resolve(questions)
                    },
                    (error) =>
                        reject(MaterialService.toast(error.error.message))
                )
            }
        )

        this.questions = await questionsPromise

        this.loading = false
    }

    onDeleteQuestion(question: Question) {
        const decision = window.confirm(`Delete question?`)
        if (decision) {
            this.questionService.delete(question).subscribe(
                (response) => {
                    MaterialService.toast(response.message)
                    this.logService
                        .create({ action: `question delated` })
                        .subscribe(() => {})
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
