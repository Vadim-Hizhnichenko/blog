import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { PostService } from '../shared/services/post.service';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<IPost>

  constructor(private route: ActivatedRoute, private postService:PostService) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getPostById(params['id']);
      })
    )

  }

}
