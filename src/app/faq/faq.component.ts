import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaqModel} from './faq.model';

interface IFaq {
  response: string;
  numFound: number;
  docs: string;
  id: number;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  results = '';
  public faqs: IFaq[];
  private resultCount;
  public category = 'Internet';
  faqArray = [];
  faq = new FaqModel();
  constructor(private http: HttpClient) {}
  // Set Category
  setCategory(cat) {
      // alert('Category Set to: ' + cat);
      this.category = cat; // Set category variable to cat
      this.getFAQs();  // Re-run the HTTP Call
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.getFAQs();
  }
  getFAQs() {
    // Reset FAQ Array
    this.faqArray = []; // Reset
    /* Get the JSON Response object from Search G2 and pass it in to the data object
    */
    this.http.get(
      // tslint:disable-next-line:max-line-length
      'https://searchg2.crownpeak.net/demoexperience-salesengineering-stage-rti/select/?q=*:*&fq=custom_s_category:' + this.category + '&wt=json&indent=true')
      .subscribe((data: any) => {
        // Show json response in console
        console.log(data);
        console.log(data.response.docs[0].id);
        this.resultCount = data.response.numFound;
        console.log('Number of found FAQs: ' + this.resultCount);
        /* Build array of FAQs */
        for ( let i = 0; i < this.resultCount; i++ ) {
        console.log('Response ID: ' + data.response.docs[i].id);
        /* Add item values to faqArray at the same index */
        this.faqArray[i] = {
        id:  data.response.docs[i].id,
        category: data.response.docs[i].custom_s_category,
        question: data.response.docs[i].title,
        answer: data.response.docs[i].content
        /*
        id: this.faqs.response.docs[i]['id'],
        cat: this.faqs.response.docs[i]['custom_s_category'],
        question: this.faqs.response.docs[i]['title'],
        answer: this.faqs.response.docs[i]['content']
        */
        };
      }
    },
    error => {console.log('Error reading JSON: ' + error);
    });
  }
}
