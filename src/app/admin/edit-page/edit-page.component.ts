import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params} from '@angular/router';

import { Subscription, switchMap } from 'rxjs';
import { IPost } from 'src/app/interfaces/IPost';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post!: IPost
  isSubmited = false
  updateSubscription!: Subscription

  constructor(private postService: PostService, private route: ActivatedRoute) { }
  


  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( (params: Params) =>{
        return this.postService.getPostById(params['id'])
      })
    ).subscribe( (post: IPost) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    this.isSubmited = true

    this.updateSubscription = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(() => {this.isSubmited = false})

  }

  ngOnDestroy(): void {
    if(this.updateSubscription){
      this.updateSubscription.unsubscribe()
    } 
  }

}
