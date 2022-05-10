import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

// services
// import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewApiService {

  userToken: any;
  protected apiEndpoint: string = environment.apiEndpoint;

  constructor(
    protected http: HttpClient,
    // public storageSvc: StorageService,
  ) { }

  getToken(data: any) {
    // const uri = environment.apiEndpoint + '/Account/GetToken';
    // return this.http.post('https://syscore-skc-strapi-dev-r6i2tunvta-an.a.run.app/api/Account/GetToken', body, this.httpOptions);
    // this.http.post<any>('https://syscore-skc-strapi-dev-r6i2tunvta-an.a.run.app/api/Account/GetToken', body)
    //   .subscribe({
    //     next: data => {
    //       console.log(data)
    //     },
    //     error: error => {
    //       console.error('There was an error------------------!', error);
    //     }
    //   });
    console.log('API calling')
    const queryUri = 'http://inuposapi-uat.ap-southeast-1.elasticbeanstalk.com/api/Account/GetToken';
    const options = this.generateOption(false);
    const body = {
      "userName": "Admin",
      "Password": "InposAdmin2022$$"
    };
    return this.apiConnecter('POST', queryUri, body, options);
  }



  protected generateOption(withHeader: boolean = true, forceToken = null): any {
    let token = '';
    if (withHeader) {
      this.loadUserToken();
      if (forceToken === null) {
        token = this.userToken;
      } else {
        token = forceToken;
      }
    }

    const Headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('x-access-token', token);

    const options = { headers: Headers };
    return options;
  }

  loadUserToken() {
    // this.userToken = this.storageSvc.getValue('access_token');
  }

  protected getQueryFilter(queryObject: any) {
    let query = '';
    const keyArray = Object.keys(queryObject);
    const length = keyArray.length;
    keyArray.forEach((key, i) => {
      // 空文字列の場合とnullの場合は、クエリに含めない。
      if (queryObject[key] === '' || queryObject[key] === null) {
        return;
      }
      if (queryObject[key] instanceof Array) {
        const ObjectArray = queryObject[key];
        for (const eachObj of ObjectArray) {
          query += key + '=' + encodeURI(eachObj);
          query += '&';
        }
      } else {
        query += key + '=' + encodeURI(queryObject[key]);
        query += '&';
      }
    });
    if (query !== '') {
      // 最後の&を削除
      query = query.slice(0, -1);
      query = '?' + query;
    }
    return query;
  }

  protected convertEmptyValueToNull(queryObject: any) {
    // tslint:disable-next-line:curly
    if (queryObject === null || queryObject === '') return null;
    if (typeof queryObject === 'number' || typeof queryObject === 'boolean' || typeof queryObject === 'string') {
      return queryObject;
    }
    const keyArray = Object.keys(queryObject);
    keyArray.forEach((key, i) => {
      if (typeof queryObject[key] === 'object' && queryObject[key] !== null) {
        if (Array.isArray(queryObject[key])) {
          // 配列の場合は、処理しない
        } else {
          // オブジェクトであれば再帰的に自分を呼び出す
          queryObject[key] = this.convertEmptyValueToNull(queryObject[key]);
        }
        return;
      }
      if (queryObject[key] === '') {
        queryObject[key] = null;
      }
    });
    return queryObject;
  }

  protected apiConnecter(method: string = 'GET', queryUri: string, body: object, options: object, file = false): Observable<any> {
    switch (method) {
      case 'GET':
        queryUri += this.getQueryFilter(body);
        return this.http.get(queryUri, options).pipe(
          map(data => data),
          catchError(this.handleError));

      case 'POST':
        body = this.convertEmptyValueToNull(body);
        let postOptions = {};
        if (file === true) {
          const postHeader = new HttpHeaders({ Accept: 'text/csv' });
          postOptions = { responseType: 'text', headers: postHeader };
        } else {
          postOptions = options;
        }
        return this.http.post(queryUri, body, postOptions).pipe(
          map(data => data),
          catchError(this.handleError));

      case 'PUT':
        body = this.convertEmptyValueToNull(body);
        return this.http.put(queryUri, body, options).pipe(
          map(data => data),
          catchError(this.handleError));

      case 'PATCH':
        body = this.convertEmptyValueToNull(body);
        return this.http.patch(queryUri, body).pipe(
          map(data => data),
          catchError(this.handleError));

      case 'DELETE':
        queryUri += this.getQueryFilter(body);
        return this.http.delete(queryUri, options).pipe(
          map(data => data),
          catchError(this.handleError));

      default:
        break;
    }
    return this.http.post(queryUri, body, options).pipe(
      map(data => data),
      catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse | any) {
    return throwError(error);
  }

  protected handleErrorType(error: any) { }
}
