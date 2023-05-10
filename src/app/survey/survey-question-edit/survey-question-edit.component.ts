import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, startWith, Subscription } from 'rxjs';
import { Question } from 'src/app/question/question';
import { Survey } from '../survey';
import { SurveyQuestionCategory } from '../survey-question-category/surveyquestioncategory';
import { SurveyService } from '../survey.service';
import { SurveyQuestion } from '../surveyquestion';
import { AnswerTypeService } from 'src/app/answerType/answer-type.service';
import { AnswerType } from 'src/app/answerType/answertype';
import { QuestionService } from 'src/app/question.service';
import { SurveyQuestionService } from '../survey-question.service';
import { SurveyQuestionCategoryService } from '../survey-question-category.service';

@Component({
  selector: 'app-survey-question-edit',
  templateUrl: './survey-question-edit.component.html',
  styleUrls: ['./survey-question-edit.component.css']
})
export class SurveyQuestionEditComponent implements OnInit, OnDestroy {

  constructor(private sService: SurveyService, private route: ActivatedRoute, private router: Router
    , private location: Location, private atService: AnswerTypeService, private questionService: QuestionService
    , private sqService: SurveyQuestionService, private sqcService: SurveyQuestionCategoryService) { }


  survey: Survey ;
  surveyQuestion: SurveyQuestion = new SurveyQuestion() ;
  editMode = false ;
  answerTypes: AnswerType[] = [] ;

  categories: SurveyQuestionCategory[] = []
  categoryControl = new FormControl<string | SurveyQuestionCategory>('');
  filteredOptions: Observable<SurveyQuestionCategory[]>;
  nextQuestionNumber: number ;
  surveyCategoryChangedSubscription: Subscription  ;
  questionSavedSubscription: Subscription


  ngOnInit(): void {


    // Find the Survey
    const surveyId = Number(this.route.snapshot.paramMap.get("surveyid")) ;
    this.sService.findById(surveyId).subscribe(x=> this.survey  = x) ;

    // Find the AnwerTypes
    this.atService.findAll().subscribe(x=> this.answerTypes = x) ;

     // Category Options
     this.filteredOptions = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.categories.slice();
      }),
    );

    // Find the number of survey questions.
    this.sqService.findSurveyQuestionBySurvey(surveyId).subscribe(questions => {
      this.nextQuestionNumber = questions.length+1;
    });

    // Get the Answer Types
    this.atService.findAll().subscribe(
      x=> this.answerTypes = x
    );

    this.sqcService.findBySurveyId(surveyId).subscribe(x=> {
      this.categories = x ;
    });


    // See if the user has selected a SurveyQuesetion to edit:
    const surveyquestionId = Number(this.route.snapshot.paramMap.get("surveyquestionid")) ;
    if(surveyquestionId && surveyquestionId > 0) {
      // Set the selected Survey Question
      this.sqService.findSurveyQuestion(surveyquestionId).subscribe( x=> {
        this.surveyQuestion = x ;
        //console.log("editing: " + JSON.stringify(this.surveyQuestion));
        this.editMode = true ;
      })
    }

    // Listen for changes to the categories.
    this.surveyCategoryChangedSubscription = this.sqcService.surveyQuestionCategoryChanged.subscribe(x =>
      this.sqcService.findBySurveyId(surveyId).subscribe(x=> {
        this.categories = x ;
      })
    ) ;

    // Listen for updated Questions so that we can then update the Question and the AnswerValues.
    this.questionSavedSubscription = this.questionService.questionCreatedSubscription.subscribe(q => {

      console.log('getQuestion() returned: ' + JSON.stringify(q)) ;

      this.surveyQuestion.question = q;

        if(this.editMode) {

          console.log("Updating survey Question:" + JSON.stringify(this.surveyQuestion));
          this.sqService.updateSurveyQuestion(this.surveyQuestion.surveyQuestionId, this.surveyQuestion).subscribe() ;

        }else {

          this.surveyQuestion.questionNumber = this.nextQuestionNumber++ ;

          console.log("Adding survey Question:" + JSON.stringify(this.surveyQuestion));

          this.sqService.createSurveyQuestion(this.surveyQuestion).subscribe() ;

        }

    });

  }


  onAddQuestion(f: NgForm){

    // Setup the Values
    const value = f.value ;

    // Set the Survey Id.
    this.surveyQuestion.survey = this.survey ;

    // Setup the Category.
    this.getSurveyQuestionCategory().subscribe(sqc => {

      this.surveyQuestion.category = sqc ;

      //Edit or create the question.
      this.processQuestion() ;

    });

    this.onClear(f) ;

  }


  processQuestion() {


    //console.log("Form Value:" + JSON.stringify(value));

    if(this.editMode) {

      console.log('updating question: ' + JSON.stringify(this.surveyQuestion.question)) ;

      this.questionService.updateQuestion(this.surveyQuestion.question.questionId, this.surveyQuestion.question).subscribe() ;
    }else {
      // Return the new Question.
      console.log("Adding question:"+JSON.stringify(this.surveyQuestion.question)) ;
      this.questionService.addQuestion(this.surveyQuestion.question).subscribe() ;
    }

}

  getSurveyQuestionCategory(): Observable<SurveyQuestionCategory> {

      // Check the category.
      const formValue = this.categoryControl.value ;
      const aCategory: SurveyQuestionCategory = new SurveyQuestionCategory() ;

      console.log("formValue: "+ formValue) ;
        // See if a team has been provided.
        if(typeof formValue === 'string') {
          // Create new team

          aCategory.survey = this.survey ;
          aCategory.name = formValue ;

          console.log("Adding new SurveyQuestionCategory: " + JSON.stringify(aCategory)) ;

          // Create the Team
          return this.sqcService.createSurveyQuesetionCategory(aCategory)

        } else {

          console.log("survey question exists: " + JSON.stringify(aCategory)) ;

           return of(formValue as SurveyQuestionCategory) ;
        }

  }


  onBack() {
    this.location.back() ;
  }

  onDelete() {

  }

  displayFn(superior: SurveyQuestionCategory): string {
    return superior && superior.name ? superior.name : '';
  }

  private _filter(name: string): SurveyQuestionCategory[] {
    const filterValue = name.toLowerCase();

    return this.categories.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onClear(f: NgForm) {

    f.resetForm() ;
    this.editMode = false ;

  }

  ngOnDestroy(): void {
    this.surveyCategoryChangedSubscription.unsubscribe() ;
  }

}
