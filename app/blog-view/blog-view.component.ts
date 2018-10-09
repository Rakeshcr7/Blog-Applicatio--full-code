import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BlogHttpService } from "../blog-http.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
})
export class BlogViewComponent implements OnInit {

  public currentBlog;
  constructor(private _route: ActivatedRoute, private router: Router,private blogHttpService: BlogHttpService, private location: Location) {
  }

  ngOnInit() {
    let myBlogId = this._route.snapshot.paramMap.get('blogId');

    //this.currentBlog = this.blogService.getSingleBlog(myBlogId);
    this.blogHttpService.getSingleBlog(myBlogId).subscribe(

      data => {
        this.currentBlog = data["data"];
      },
      error => {
        console.log(error.errorMessage)
      }
    )
  }

  deleteThisBlog(): any {

    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data => {
        alert("sucess");
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000)
      },
      error => {
        console.log(error.errorMessage);
        alert("error");
      }
    )
  }// end delete this blog 

  goBackToPreviousPage(): any {
    this.location.back();
  }





}


