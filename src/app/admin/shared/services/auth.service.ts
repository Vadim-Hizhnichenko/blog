import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core"
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { IFireBaseRespons } from "src/app/interfaces/IFireBaseRespons";
import { IUser } from "src/app/interfaces/IUser";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class AuthService{

    public error$: Subject<string> = new Subject<string>()

    constructor(private http: HttpClient){}

    get token(): string | Date | null | any {
        const expDate = localStorage.getItem('fireBase-token-expires') as unknown as Date
        if(new Date() > expDate){
            this.logout()
            return null
        }
        return localStorage.getItem('fireBase-token')
    }

    login(user: IUser): Observable<any>{
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError)
        )
    }
 
    logout(){
        this.setToken(null)
    }

    isAuthenticated(): boolean{
        return !!this.token
    }
    
    private handleError(error: HttpErrorResponse){
        const {message} = error.error.error
        console.log(message)
        switch(message){
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email not found')
                //this.error$.error('Email Email .dadadasd')
                break
            case 'INVALID_PASSWORD':
                this.error$.next('Invalid password')

                //this.error$.error('Email Email .dadadasd')
                break
            case 'INVALID_EMAIL':
                this.error$.next('Invalid email')
                //this.error$.error('Email Email .dadadasd')
                break
        }
        
        return throwError(() => new Error(message))

    }

    private setToken(respons: IFireBaseRespons | any | null){
        if(respons){
            const expiresDate = new Date( new Date().getTime() + +respons.expiresIn * 1000)
            localStorage.setItem('fireBase-token', respons.idToken)
            localStorage.setItem('fireBase-token-expires', expiresDate.toString())
        }else{
            localStorage.clear()
        }
        
    }

}