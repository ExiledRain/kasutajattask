import { Component, OnDestroy, OnInit } from "@angular/core";
import { IKasutaja } from "src/app/shared/kasutaja/kasutaja.model";
import { KasutajaService } from "./kasutaja.service";

@Component({
  selector: 'task-kasutaja',
  templateUrl: './kasutaja.component.html',
  styleUrls: ['./kasutaja.component.css']
})
export class KasutajaComponent implements OnInit {
  kasutajad: IKasutaja[] = [];
  isFresh = true;
  public filterText: string = '';

  constructor(private service: KasutajaService) {}

  ngOnInit(): void {
    if(localStorage.getItem('isFresh') != null) {
      let val = localStorage.getItem('isFresh') || '';
      this.isFresh = JSON.parse(val) === true;
    }
    this.loadPage();
  }

  loadPage() {
    if(this.isFresh) {
      this.service.init();
      this.isFresh = false;
      this.loadPage();
    } else {
      this.kasutajad = this.service.kasutaja;
    }
  }
}
