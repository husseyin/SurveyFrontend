import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-question-manager',
  templateUrl: './question-manager.component.html',
  styleUrls: ['./question-manager.component.css'],
})
export class QuestionManagerComponent implements OnInit {
  questions: Question[];

  question: Question;

  questionDialog: boolean;

  selectedQuestions: Question[];

  submitted: boolean;

  companies: any[];

  first = 0;
  rows = 10;

  constructor(
    private questionService: QuestionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getQuestions();

    this.companies = [
      { label: 'EFATUR', value: 'EFATUR' },
      { label: 'PEGASUS', value: 'PEGASUS' },
    ];
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe((question) => {
      this.questions = question;
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
          this.question.Company = question.Company;

          this.questionService.questionDelete(this.question).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Başarılı',
                detail: 'Soru Silindi.',
                life: 3000,
              });

              this.questions = this.questions.filter(
                (value) => value.Id !== question.Id
              );
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
    console.log('hideDialog');
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
    this.question.Company = this.question.Company;

    if (this.question.Company && this.question.Name) {
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
            window.location.reload();
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
