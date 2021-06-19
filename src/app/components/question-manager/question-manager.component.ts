import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-question-manager',
  templateUrl: './question-manager.component.html',
  styleUrls: ['./question-manager.component.css'],
})
export class QuestionManagerComponent implements OnInit {
  questions: Question[];
  companies: Company[];

  question: Question;

  questionDialog: boolean;

  selectedQuestions: Question[];
  selectCompany: Company;

  submitted: boolean;

  first = 0;
  rows = 10;

  constructor(
    private questionService: QuestionService,
    private companyService: CompanyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getQuestions();
    this.getCompanies();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe((question) => {
      this.questions = question;
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe((company) => {
      this.companies = company;
      this.selectCompany = company[0];
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.questions
      ? this.first === this.questions.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.questions ? this.first === 0 : true;
  }

  deleteQuestion(question: Question) {
    this.question = <Question>{};

    this.confirmationService.confirm({
      message: 'Soruyu Silmek İstediğinize Emin Misiniz? ',
      header: 'Onay',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (question) {
          this.question.Id = question.Id;
          this.question.Name = question.Name;
          this.question.CompanyId = question.CompanyId;

          this.questionService.questionDelete(this.question).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Başarılı',
                detail: 'Soru Silindi.',
                life: 3000,
              });

              this.getQuestions();
            },
            (responseError) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Hata',
                detail: 'İşlem Başarısız! ',
                life: 3000,
              });
            }
          );

          this.question = <Question>{};
        }
      },
    });
  }

  hideDialog() {
    this.questionDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.question = <Question>{};
    this.submitted = false;
    this.questionDialog = true;
  }

  saveQuestion() {
    this.submitted = true;

    this.question.Name = this.question.Name;
    this.question.CompanyId = this.selectCompany.Id;

    if (this.question.CompanyId && this.question.Name) {
      if (this.questions.find((find) => this.question.Name == find.Name)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Soru Eklenmiş! ',
          life: 3000,
        });
      } else {
        this.questionService.questionAdd(this.question).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: 'Soru Eklendi.',
              life: 3000,
            });
            this.getQuestions();
          },
          (responseError) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Hata',
              detail: 'İşlem Başarısız! ',
              life: 3000,
            });
          }
        );

        this.questionDialog = false;
      }
    }
  }
}
