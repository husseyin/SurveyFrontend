import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Answer } from 'src/app/models/answer';
import { Company } from 'src/app/models/company';
import { Question } from 'src/app/models/question';
import { UserAnswer } from 'src/app/models/user-answer';
import { AnswerService } from 'src/app/services/answer.service';
import { CompanyService } from 'src/app/services/company.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserAnswerService } from 'src/app/services/user-answer.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  questions: Question[];
  answers: Answer[];
  companies: Company[];
  userAnswers: UserAnswer[];

  selectQuestion: Question;
  selectCompany: Company;
  selectUserAnswer: UserAnswer;

  counts: any[];

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private companyService: CompanyService,
    private userAnswerService: UserAnswerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAnswers();
    this.getCompanies();
  }

  getQuestionsByCompanyId(companyId: number) {
    this.questionService.getQuestionsByCompanyId(companyId).subscribe(
      (question) => {
        this.questions = question;
      },
      (questionError) => {
        this.toastrService.error('Soru Bulunamadı!');
      }
    );
  }

  getAnswers() {
    this.answerService.getAnswers().subscribe(
      (answer) => {
        this.answers = answer;
      },
      (answerError) => {
        this.toastrService.error('Yanıt Bulunamadı!');
      }
    );
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      (company) => {
        this.companies = company;
      },
      (companyError) => {
        this.toastrService.error('Şirket Bulunamadı!');
      }
    );
  }

  getReport(selectQuestion: Question) {
    if (selectQuestion) {
      this.userAnswerService
        .getCountAnswerByQuestionId(selectQuestion.Id)
        .subscribe(
          (data) => {
            this.counts = data;
          },
          (dataError) => {
            this.toastrService.error('İşlem Başarısız!');
          }
        );
    } else {
      this.toastrService.error('Soru Seçin!');
    }
  }
}
