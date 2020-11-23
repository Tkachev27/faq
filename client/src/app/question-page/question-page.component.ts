import { Component, OnInit } from '@angular/core'
import { Category, Question } from '../shared/interfaces'
import { AuthService } from '../shared/services/auth.service'
import { CategoryService } from '../shared/services/category.service'
import { LogService } from '../shared/services/log.service'
import { MaterialService } from '../shared/services/Material.service'
import { QuestionService } from '../shared/services/question.service'

@Component({
    selector: 'app-question-page',
    templateUrl: './question-page.component.html',
    styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent implements OnInit {
    loading = false
    categories: Array<Category> = []
    selectedCategory: Category = {}
    questions: Array<Question> = []
    page = 'question'
    newCategoryName = ''

    user = ''

    constructor(
        private categoryService: CategoryService,
        public questionService: QuestionService,
        private auth: AuthService,
        private logService: LogService
    ) {}

    async ngOnInit() {
        this.loading = true

        this.user = localStorage.userType ? localStorage.userType : ''

        let categoriesPromise = new Promise<Array<Category>>(
            (resolve, reject) => {
                this.categoryService.fetch().subscribe(
                    (categories) => {
                        resolve(categories)
                    },
                    (error) =>
                        reject(MaterialService.toast(error.error.message))
                )
            }
        )

        this.categories = await categoriesPromise
        const num = Math.floor(0 + Math.random() * this.categories.length)

        if (this.categories.length > 0) {
            this.selectedCategory = this.categories[num]
            let questionsPromise = new Promise<Array<Category>>(
                (resolve, reject) => {
                    this.questionService
                        .fetch(this.selectedCategory._id)
                        .subscribe(
                            (questions) => {
                                resolve(questions)
                            },
                            (error) =>
                                reject(
                                    MaterialService.toast(error.error.message)
                                )
                        )
                }
            )

            this.questions = await questionsPromise
        }

        this.loading = false
    }

    saveNewCategory() {
        this.categoryService.create({ name: this.newCategoryName }).subscribe(
            (category) => {
                this.categories.push(category)
                this.newCategoryName = ''
            },
            (error) => MaterialService.toast(error.error.message)
        )
    }
    onDeleteCategory(category: Category) {
        const decision = window.confirm(`Delete ${category.name}?`)
        if (decision) {
            this.categoryService.delete(category).subscribe(
                (response) => {
                    MaterialService.toast(response.message)
                    this.categories.splice(
                        this.categories.findIndex((p) => p._id == category._id),
                        1
                    )
                },
                (error) => MaterialService.toast(error.error.message)
            )
        }
    }
    async onChangeSelectedCategory(category: Category) {
        this.loading = true
        this.selectedCategory = category
        this.logService
            .create({ action: `category selected: ${category.name}` })
            .subscribe(() => {})
        let questionsPromise = new Promise<Array<Category>>(
            (resolve, reject) => {
                this.questionService.fetch(this.selectedCategory._id).subscribe(
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
    newQuestionCreated(question: Question) {
        this.questions.push(question)
        this.logService
            .create({ action: `question created` })
            .subscribe(() => {})
    }
}
