import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorListener = new Subject<string>();

  getErrorListener(): any {
    return this.errorListener.asObservable();
  }

  throwError(message: string): any {
    this.errorListener.next(message);
  }

  handleError(): any {
    this.errorListener.next(null);
  }

}
