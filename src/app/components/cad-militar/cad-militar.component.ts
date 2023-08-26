import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Militar } from 'src/app/interfaces/Militar';
import { ListService } from 'src/app/services/militar/list.service';

@Component({
  selector: 'app-cad-militar',
  templateUrl: './cad-militar.component.html',
  styleUrls: ['./cad-militar.component.css']
})
export class CadMilitarComponent implements OnInit {

  constructor(private service: ListService) {}

  militares!: Militar[];

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
      }
    };
    this.getMilitares();
  }

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  getMilitares() {
    this.service.
      getMilitares()
      .subscribe((militar: any) => {
        this.militares = militar.content
        this.dtTrigger.next(null);
      });
  }
}
