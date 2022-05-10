import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': '*/*',
      }
    )
  };

  constructor(private http: HttpClient) { }

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
    const body = { data };
    return this.apiConnecter('POST', queryUri, body);
  }

  getRentalItems(query?: any): Observable<any> {
    const uri = 'https://pr-syscore-skc-strapi-dev-413-r6i2tunvta-an.a.run.app/api/rental-items';
    return this.http.get(uri, query);
  }


  protected apiConnecter(method: string = 'GET', queryUri: string, body: object): Observable<any> {
    const user = false;
    // const user: LoggedInUser = this.storageSvc.getData('user');
    const headerOptions = user ? new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      // .set('Authorization', user.apiKey)
      // .set('Role', user.userDivision)
      // .set('User-Id', user.userId.toString())
      :
      new HttpHeaders()
        .set('Content-Type', 'application/json;charset=utf-8;')
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Access-Control-Allow-Origin', 'http://inuposapi-uat.ap-southeast-1.elasticbeanstalk.com')
        .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
        .set('access-control-allow-credentials', 'true');
    return this.handleConnecter(method, queryUri, headerOptions, body, true);
  }

  protected handleConnecter(method: string = 'GET', queryUri: string, headerOptions: HttpHeaders, body: object,
    isCredentialRequired = true) {
    const options = {
      headers: headerOptions,
      withCredentials: isCredentialRequired
    };

    switch (method) {
      // case 'GET':
      //   queryUri += this.getQueryFilter(body);
      //   return this.http.get(queryUri, options).pipe(
      //     map(data => data),
      //     catchError(this.handleError));

      case 'POST':
        body = this.convertEmptyValueToNull(body);
        return this.http.post(queryUri, body, options).pipe(map(data => data), catchError(this.handleError));

      // case 'PUT':
      //   body = this.convertEmptyValueToNull(body);
      //   return this.http.put(queryUri, body, options).pipe(
      //     map(data => data),
      //     catchError(this.handleError));

      // case 'PATCH':
      //   body = this.convertEmptyValueToNull(body);
      //   return this.http.patch(queryUri, body).pipe(
      //     map(data => data),
      //     catchError(this.handleError));

      // case 'DELETE':
      //   queryUri += this.getQueryFilter(body);
      //   return this.http.delete(queryUri, options).pipe(
      //     map(data => data),
      //     catchError(this.handleError));

      default:
        break;
    }
    return this.http.post(queryUri, body, options).pipe(
      map(data => data),
      catchError(this.handleError));
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

  protected handleError(error: HttpErrorResponse | any) {
    return throwError(error);
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
}
