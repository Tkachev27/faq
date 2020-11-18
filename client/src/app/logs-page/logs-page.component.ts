import { Component, OnInit } from '@angular/core'
import { Log } from '../shared/interfaces'
import { LogService } from '../shared/services/log.service'

@Component({
    selector: 'app-logs-page',
    templateUrl: './logs-page.component.html',
    styleUrls: ['./logs-page.component.scss'],
})
export class LogsPageComponent implements OnInit {
    loading = false
    logs: Array<Log> = []
    logsShow: Array<Log> = []
    label = 'Select User Id'
    optionList: Array<string> = []
    constructor(private logService: LogService) {}

    ngOnInit(): void {
        this.loading = true
        this.optionList.push('All')
        this.logService.fetch().subscribe((logs) => {
            this.logs = logs

            this.logsShow = logs
            for (let log of logs) {
                if (!this.optionList.includes(log.userId))
                    this.optionList.push(log.userId)
            }
            this.loading = false
        })
    }
    updateSelectedUser(userId: string) {
        this.logsShow = []

        if (userId == 'All') this.logsShow = this.logs
        else {
            for (let log of this.logs) {
                if (log.userId === userId) this.logsShow.push(log)
            }
        }
    }
    deleteAllLogs() {
        this.logService.delete().subscribe(() => {
            this.logsShow = []
            this.logs = []
        })
    }
}
