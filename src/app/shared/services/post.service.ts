import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IFireBaseCreateRespons } from "src/app/interfaces/IFireBaseCreateRespons";
import { IPost } from "src/app/interfaces/IPost";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root'})

export class PostService{


    constructor(private http: HttpClient){}

    createPost(post:IPost): Observable<IPost>{
        return this.http.post(`${environment.fireBaseDbUrl}/posts.json`, post)
        .pipe(
            map( (respons: IFireBaseCreateRespons) => {
                return{
                    ...post,
                    id: respons.name,
                    date: new Date(post.date)
                } 
            })
        )
        
    }
}