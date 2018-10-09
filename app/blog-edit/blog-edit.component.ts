import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BlogHttpService } from "../blog-http.service";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],

})

export class BlogEditComponent implements OnInit {

  public currentBlog;
  public possibleCategories = ["Comedy", "Drama", "Action", "Technology"];

  constructor(private _route: ActivatedRoute, private router: Router,private blogHttpService: BlogHttpService, private location: Location, private toastr: ToastrService) {
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

  editThisBlog(): any {

    this.blogHttpService.editBlog(this.currentBlog.blogId, this.currentBlog).subscribe(
      data => {
        this.toastr.success('Successfully!', 'Edited');
        setTimeout(() => {
          this.router.navigate(['/blog', this.currentBlog.blogId]);
        }, 1000)
      },
      error => {
        console.log(error.errorMessage);
        this.toastr.error('Error Occured!', 'Some');
      }
    )
  }// end delete this blog 

  goBackToPreviousPage(): any {
    this.location.back();
  }
}
