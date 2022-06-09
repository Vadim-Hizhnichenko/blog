import { Pipe, PipeTransform } from "@angular/core";
import { IPost } from "src/app/interfaces/IPost";

@Pipe({
    name: 'searchPost'
})

export class SearchPostPipe implements PipeTransform{


    transform(posts: IPost[], searchStr = ''):IPost[] {
        if(!searchStr.trim()){
            return posts
        }
        return posts.filter(post => {
            return post.title.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
        })
    }

}