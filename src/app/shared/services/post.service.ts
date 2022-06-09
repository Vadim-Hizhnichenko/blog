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

    getAllPosts(): Observable<IPost[]>{
        return this.http.get(`${environment.fireBaseDbUrl}/posts.json`)
        .pipe(map( (respons: {[key:string]: any}) => { 
            return Object.keys(respons).map(key => ({
                ...respons[key],
                id: key,
                date: new Date(respons[key].date)
            }))
            } 
            ))
    }

    removePost(id: string):Observable<void>{
        return this.http.delete<void>(`${environment.fireBaseDbUrl}/posts/${id}.json`)
    }


    getPostById(id: string): Observable<IPost>{
        return this.http.get<IPost>(`${environment.fireBaseDbUrl}/posts/${id}.json`)
        .pipe(
            map( (post: IPost) => {
                return {
                    ...post, id, date: new Date(post.date)
                } 
            })
        )   
    }

    update(post: IPost): Observable<IPost>{
        return this.http.patch<IPost>(`${environment.fireBaseDbUrl}/posts/${post.id}.json`, post)
    }
}