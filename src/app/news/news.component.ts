import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  results = '';
  private resultCount;
  newsArray = [];
  public htmlContent = '';
  public htmlSubContent = '';
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    // Reset FAQ Array
    /* Get the JSON Response object from Search G2 and pass it in to the data object
    */
    this.http.get(
      // At present, we only publish one Gallery Asset but I left as an array so we can easily extend.
      // Type is currently hardcoded to Gallery
      'https://searchg2.crownpeak.net/sales.surety.financial/select/?q=*:*&fq=custom_s_type:SPA-News&wt=json&indent=true')
      .subscribe((data: any) => {
        // Show json response in console
        console.log(data);
        // console.log(data.response.docs[0].id);
        this.resultCount = data.response.numFound;
        console.log('Number of found Articles: ' + this.resultCount);
        /* Build array of FAQs */
        for ( let i = 0; i < this.resultCount; i++ ) {
        console.log('Article Response ID: ' + data.response.docs[i].id);
        /* Add item values to faqArray at the same index */
        this.newsArray[i] = {
        id:  data.response.docs[i].id,
        main_title: data.response.docs[i].custom_s_main_title,
        main_heading: data.response.docs[i].custom_s_main_headline,
        main_content: data.response.docs[i].custom_s_main_content,
        top_label: data.response.docs[i].custom_s_top_label,
        lower_label: data.response.docs[i].custom_s_lower_label,
        sub_content: data.response.docs[i].custom_s_sub_title
        };
      }
        // Test
        console.log('Gallery size: ' + this.newsArray.length);
        this.htmlContent = this.newsArray[0].main_content;
        this.htmlSubContent = this.newsArray[0].sub_content;
    },
    error => {console.log('Error reading JSON: ' + error);
    });
  }
}
