import { Component, OnInit } from '@angular/core';
import PptxGenJS from 'pptxgenjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name = '';
  email = '';

  fields =[
    {label:"Name", model: this.name},
    {label:"Email Address", model: this.email}
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
      this.readFileContent(event.target.files[0]).then(content => {
       console.log(content);
      }).catch(error => console.log(error));
    }

    readFileContent(file: any) {
      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
      })
    }

}
