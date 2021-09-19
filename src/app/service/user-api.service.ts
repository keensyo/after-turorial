import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { firstValueFrom } from "rxjs";
import { User } from "../user";

const apiHost = 'https://reqres.in/api';

interface ApiResponse<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return firstValueFrom(
      this.http
        .get<ApiResponse<User[]>>(`${apiHost}/users`)
        .pipe(map(resp => resp.data))
    );
  }

  getUserById(id: string) {
    return firstValueFrom(
      this.http
        .get<ApiResponse<User>>(`${apiHost}/users/${id}`)
        .pipe(map(resp => resp.data))
    );
  }
}