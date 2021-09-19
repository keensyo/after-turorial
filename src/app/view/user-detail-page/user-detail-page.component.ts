import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { UserDetailUsecase } from '../../usecase/user-detail.usecase';

@Component({
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css']
})
export class UserDetailPageComponent implements OnInit, OnDestroy {
  user$ = this.userDetailUsecase.user$;

  private onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute, 
    private userDetailUsecase: UserDetailUsecase
    ) {}

    ngOnInit(){
      this.route.params
        .pipe(
          // コンポーネントの破棄と同時に停止する
          takeUntil(this.onDestroy$),
          // paramsからuserIdを取り出す
          map(params => params['userId']),
          // userIdが変わったときだけ値を流す
          distinctUntilChanged()
      )
      .subscribe(userId => this.userDetailUsecase.fetchUser(userId));
    }
    
    ngOnDestroy() {
      this.onDestroy$.next();
    }
  }