import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddress } from 'src/app/shared/address/address.model';
import { ICompany } from 'src/app/shared/company/company.model';
import { IGeo } from 'src/app/shared/geo/geo.model';
import { IKasutaja } from 'src/app/shared/kasutaja/kasutaja.model';
import { KasutajaService } from './kasutaja.service';

@Component({
  selector: 'task-detail-kasutaja',
  templateUrl: './kasutaja-detail.component.html',
  styleUrls: ['../../app.component.css'],
})
export class KasutajaDetailComponent implements OnInit {
  kasutaja: IKasutaja = {};
  address: IAddress = {};
  geo: IGeo = {};
  company: ICompany = {};
  id?: number;

  constructor(
    protected kasutajaService: KasutajaService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id != null && Number(this.id)) {
      let result = this.kasutajaService.findById(this.id);
      if(result && result.address && result.address.geo && result.company) {
        this.kasutaja = result;
        this.address = result.address;
        this.company = result.company;
        this.geo = result.address.geo ;
      } else {
        this.previousState('User not found');
      }
    }
  }

  previousState(message: string): void {
    if(message) {
      alert(message);
    }
    window.history.back();
  }

  edit() {
    this.router.navigate(['/',this.id, 'update']);
  }

  delete() {
    if(confirm('You sure you want to delete this user?')) {
      this.kasutajaService.deleteById(this.kasutaja.id!);
      this.router.navigate(['/']);
    }
  }
}
