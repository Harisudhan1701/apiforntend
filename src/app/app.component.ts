import { Component } from '@angular/core';

import { HttpClient } from "@angular/common/http";

import { FormBuilder, FormGroup } from "@angular/forms";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from "jquery";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apiforntend';
  todo = null;
  closeResult = '';
  form:FormGroup;
  constructor(private http:HttpClient,public fb:FormBuilder,private modalService: NgbModal)
  {
    this.getdata();
    this.form = this.fb.group({
      Name : [''],
      Age : [''],
      City : ['']
    });
  }
  open(content,data) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.form.patchValue(data);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  deletedata(data:any)
  {
     this.http.delete("http://localhost:3000/delete/"+data).subscribe(
    x=>{
      alert(x);
      this.getdata();
    }



   );

  }

  getdata()
  {
    this.http.get("http://localhost:3000/data").subscribe(x => this.todo =  x);
  }
  submit()
  {
    this.http.post("http://localhost:3000/create",(this.form.value)).subscribe(
      x=>
      {
        alert(x);
        this.form.reset();
        this.getdata();
      }
    )
  }
  update()
  {

  }

  ngOnInit(): void {
    $('.nav-tabs  a').click(function(e) {
      //get selected href
      var href = $(this).attr('href');

      //set all nav tabs to inactive
      $('.nav-tabs a').removeClass('active');

      //get all nav tabs matching the href and set to active
      $('.nav-tabs  a[href="' + href + '"]').closest('a').addClass('active');

      //active tab
      $('.tab-pane').removeClass('active');
      $('.tab-pane' + href).addClass('active');
  });


  }

}
