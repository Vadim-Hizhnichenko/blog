import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/interfaces/IPost';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{

  posts: IPost[] = []
  postSubscription!: Subscription



  constructor(private postService: PostService) { }
  
  removePost(id: any){

  }


  ngOnInit(): void {
    this.postSubscription = this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts
    })
  }

  //Dispose()
  ngOnDestroy(): void {
    if(this.postSubscription){
      this.postSubscription.unsubscribe()
    }
  }

}
