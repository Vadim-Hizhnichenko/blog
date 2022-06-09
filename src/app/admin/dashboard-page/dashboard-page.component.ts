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
  deletePostSubscription!: Subscription
  searchString: string = ''



  constructor(private postService: PostService) { }


  
  removePost(id: any){
    this.deletePostSubscription = this.postService.removePost(id).subscribe( () => {
      this.posts = this.posts.filter( post => post.id !== id)
    } )
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
    if(this.deletePostSubscription){
      this.deletePostSubscription.unsubscribe()
    }
  }

}
