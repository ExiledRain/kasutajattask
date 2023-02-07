import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Address, IAddress } from "src/app/shared/address/address.model";
import { Company, ICompany } from "src/app/shared/company/company.model";
import { Geo, IGeo } from "src/app/shared/geo/geo.model";
import { IKasutaja, Kasutaja } from "src/app/shared/kasutaja/kasutaja.model";
import { KasutajaService } from "./kasutaja.service";

@Component({
  selector: 'task-update-kasutaja',
  templateUrl: './kasutaja-update.component.html',
  styleUrls: ['../../app.component.css']
})
export class KasutajaUpdateComponent implements OnInit {
  public kasutaja?: IKasutaja;
  isNew = false;
  id?: number;

  constructor(
    protected kasutajaService: KasutajaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder
    ) {};

  editForm = this.fb.group({
    id: [],
    name: [],
    username: [],
    email: [],
    street: [],
    suite: [],
    city: [],
    zipcode: [],
    lat: [],
    lng: [],
    phone: [],
    website: [],
    companyName: [],
    catchPhrase: [],
    bs: []
  });

  ngOnInit(): void {
    this.isNew = this.activatedRoute.snapshot.url.toString().startsWith('new');

    if(!this.isNew) {
      this.id = this.activatedRoute.snapshot.params['id']
      if (Number(this.id)) {
        this.kasutajaService.getById(this.id!).subscribe((res) => {
          if (res.body != null && res.ok) {
            this.kasutaja = res.body;
            this.updateForm(res.body);
          }
        },err => {
          this.previousState('User with such id not found!');
        });
      } else {
        this.previousState('User ID is incorrect!');
      }
    }
  }

  updateForm(kasutaja: IKasutaja): void {
    this.editForm.patchValue({
      id: kasutaja.id,
      name: kasutaja.name,
      username: kasutaja.username,
      email: kasutaja.email,
      street: kasutaja.address?.street,
      suite: kasutaja.address?.suite,
      city: kasutaja.address?.city,
      zipcode: kasutaja.address?.zipcode,
      lat: kasutaja.address?.geo?.lat,
      lng: kasutaja.address?.geo?.lng,
      phone: kasutaja.phone,
      website: kasutaja.website,
      companyName: kasutaja.company?.name,
      catchPhrase: kasutaja.company?.catchPhrase,
      bs: kasutaja.company?.bs
    });
  }

  previousState(message: string): void {
    if(message) {
      alert(message);
    }
    window.history.back();
  }

  save(): void {
    const kasutaja = this.createFromForm();

    if (kasutaja.id !== undefined && kasutaja.id > 0) {
      this.kasutajaService.updateMock(kasutaja);
    } else {
      this.kasutajaService.createMock(kasutaja);
    }
    this.previousState('');
  }

  protected onSaveSuccess(kasutaja: IKasutaja): void {
    if(kasutaja != null) {
      this.kasutaja = kasutaja
    }
    this.previousState('');
  }

  protected onSaveError(): void {
      this.previousState('Saving failed');
  }

  private createCompany(): ICompany {
    return {
      ...new Company(),
      name: this.editForm.get(['name'])!.value || '',
      catchPhrase: this.editForm.get(['catchPhrase'])!.value || '',
      bs: this.editForm.get(['bs'])!.value || '',
    };
  }

  private createGeo(): IGeo {
    return {
      ...new Geo(),
      lat: this.editForm.get(['lat'])!.value || '',
      lng: this.editForm.get(['lng'])!.value || '',
    }
  }

  private createAddress(): IAddress {
    return {
      ...new Address(),
      street: this.editForm.get(['street'])!.value || '',
      suite: this.editForm.get(['suite'])!.value || '',
      city: this.editForm.get(['city'])!.value || '',
      zipcode: this.editForm.get(['zipcode'])!.value || '',
      geo: this.createGeo()
    }
  }

  private createFromForm(): IKasutaja {
    return {
      ...new Kasutaja(),
      id: this.editForm.get(['id'])!.value || 0,
      name: this.editForm.get(['name'])!.value || '',
      username: this.editForm.get(['username'])!.value || '',
      email: this.editForm.get(['email'])!.value || '',
      address:  this.createAddress(),
      phone: this.editForm.get(['phone'])!.value || '',
      website: this.editForm.get(['website'])!.value || '',
      company: this.createCompany()
    };
  }

}
