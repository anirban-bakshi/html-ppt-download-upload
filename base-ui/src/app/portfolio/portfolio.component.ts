import { Component, OnInit } from '@angular/core';
import PptxGenJS from 'pptxgenjs';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private service:PortfolioService
  ) { }

  ngOnInit(): void {
  }

  name = '';
  email = '';

  fields =[
    {label:"Name", model: "", name:"name"},
    {label:"Email Address", model: "", name:"email"}
  ]

  generatePpt(): void {
    console.log("I am inside generatePpt");
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();
    let margin_left = 0;
    this.fields.forEach(field=>{
      margin_left += 1.5;
      slide.addText(field.label, {x: 1.5, y: margin_left, w: 6, h: 2, margin: 0.1})
      slide.addText("____________________________________________", {x: 3.2, y: margin_left, w: 6, h: 2, margin: 0.1})
    });
   
    
    pptx.writeFile({ fileName: "portfolio-ppt" })
      .catch((err) => {
        throw new Error(err);
      })
      .then((fileName) => {
        console.log(`EX1 exported: ${fileName}`);
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
    }

    upload(event: any){
      console.log("I am inside upload");
      console.log(event);
      let file = event.target.files[0];

      if(file) {
        this.service.upload(file).subscribe(
          response =>{
            console.log(response);
            if(response.body) {
              this.fields.forEach(field=>{
                field.model = response.body[field.label].replaceAll("_","");
              })
            }
          }, error=>{
            console.log(error);
          }
        );
      } 
    }

    

}
