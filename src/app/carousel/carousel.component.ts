import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  results = '';
  private resultCount;
  public category = 'Company';
  galleryArray = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getGallery();
  }
  getGallery() {
    // Reset FAQ Array
    /* Get the JSON Response object from Search G2 and pass it in to the data object
    */
    this.http.get(
      // At present, we only publish one Gallery Asset but I left as an array so we can easily extend.
      // Type is currently hardcoded to Gallery
      'https://searchg2.crownpeak.net/sales.surety.financial/select/?q=*:*&fq=custom_s_type:Gallery&wt=json&indent=true')
      .subscribe((data: any) => {
        // Show json response in console
        console.log(data);
        // console.log(data.response.docs[0].id);
        this.resultCount = data.response.numFound;
        console.log('Number of found Galleries: ' + this.resultCount);
        /* Build array of FAQs */
        for ( let i = 0; i < this.resultCount; i++ ) {
        console.log('Gallery Response ID: ' + data.response.docs[i].id);
        /* Add item values to faqArray at the same index */
        this.galleryArray[i] = {
        id:  data.response.docs[i].id,
        img1_title: data.response.docs[i].custom_s_imgtitle_1,
        img1_url: data.response.docs[i].custom_s_imgurl_1,
        img1_alt: data.response.docs[i].custom_s_imgalt_1,
        img2_title: data.response.docs[i].custom_s_imgtitle_2,
        img2_url: data.response.docs[i].custom_s_imgurl_2,
        img2_alt: data.response.docs[i].custom_s_imgalt_2,
        img3_title: data.response.docs[i].custom_s_imgtitle_3,
        img3_url: data.response.docs[i].custom_s_imgurl_3,
        img3_alt: data.response.docs[i].custom_s_imgalt_3
        };
      }

        // Test
        console.log('Gallery size: ' + this.galleryArray.length);
    },
    error => {console.log('Error reading JSON: ' + error);
    });
  }
}
