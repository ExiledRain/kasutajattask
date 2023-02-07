import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKasutaja } from 'src/app/shared/kasutaja/kasutaja.model';

type EntityResponseType = HttpResponse<IKasutaja>;
type ArrayResponseType = HttpResponse<IKasutaja[]>;

@Injectable({ providedIn: 'root' })
export class KasutajaService {
  private _kusatajad: IKasutaja[] = [];

  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public get kasutaja(): IKasutaja[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  public set kasutaja(value: IKasutaja[]) {
    localStorage.setItem('users', JSON.stringify(value));
  }

  init(): void {
    this.setId();
    this.fetchAll().subscribe(
      (res) => {
        if (res.body != null) {
          this.kasutaja = res.body;
          localStorage.setItem('isFresh', 'false');
        }
      },
      (err) => {
        this.kasutaja = [];
      }
    );
  }

  setId() {
    localStorage.setItem(
      'id',
      JSON.stringify({
        number: Number(11),
      })
    );
  }

  getById(id: number): Observable<EntityResponseType> {
    return this.http.get(`${this.baseUrl}/users/${id}`, {
      observe: 'response',
    });
  }

  findById(id: number): IKasutaja {
    let index = this.getIndex(id);
    if (index > 0) {
      let res = this.kasutaja[index];
      return res;
    } else {
      return {};
    }
  }

  fetchAll(): Observable<ArrayResponseType> {
    return this.http.get<IKasutaja[]>(`${this.baseUrl}/users`, {
      observe: 'response',
    });
  }

  delete(id: number): any {
    if (id) {
      this.http.delete(`${this.baseUrl}/${id}`);
    }
  }

  deleteById(id: number) {
    let index = this.getIndex(id);
    if (index > 0) {
      let res = this.kasutaja;
      res.splice(index, 1);
      this.kasutaja = res;
    }
  }

  create(kasutaja: IKasutaja): Observable<EntityResponseType> {
    return this.http.post<IKasutaja>(`${this.baseUrl}/users`, kasutaja, {
      observe: 'response',
    });
  }

  createMock(kasutaja: IKasutaja) {
    let kasutajad = this.kasutaja;
    kasutaja.id = this.generateId();
    kasutajad.push(kasutaja);
    this.kasutaja = kasutajad;
  }

  update(kasutaja: IKasutaja): Observable<EntityResponseType> {
    return this.http.put<IKasutaja>(
      `${this.baseUrl}/users/${kasutaja.id}`,
      kasutaja,
      { observe: 'response' }
    );
  }

  updateMock(kasutaja: IKasutaja): void {
    if (kasutaja.id != null) {
      let index = this.getIndex(kasutaja.id);
      if (index > 0) {
        let res = this.kasutaja;
        res.splice(index, 1, kasutaja);
        this.kasutaja = res;
      }
    }
  }

  private getIndex(id: number) {
    let kasutajad = this.kasutaja;
    for (let i = 0; i < kasutajad.length; i++) {
      console.log(kasutajad[i].id);
      if (kasutajad[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  public generateId(): number {
    let last = localStorage.getItem('id');
    if (last != null) {
      let newId = JSON.parse(last).number + 1;
      localStorage.setItem(
        'id',
        JSON.stringify({
          number: Number(newId),
        })
      );
      return newId;
    }
    return 0;
  }
}
