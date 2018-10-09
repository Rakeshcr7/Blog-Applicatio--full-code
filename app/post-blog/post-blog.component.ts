import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BlogHttpService } from "../blog-http.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css'],
})
export class PostBlogComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private router: Router,private blogHttpService: BlogHttpService, private toastr: ToastrService) {
    this.toastr.info('Welcome!!!', 'Please Post your Blog');
  }

  public blogTitle: string;
  public blogBodyHtml: string;
  public blogDescription: string;
  public blogCategory: string;
  public possibleCategories = ["Comedy", "Drama", "Action", "Technology"];

  ngOnInit() {
  }

  createBlog(): any {
    let blogData = {
      title: this.blogTitle,
      description: this.blogDescription,
      blogBody: this.blogBodyHtml,
      category: this.blogCategory
    }// end blog data
    this.blogHttpService.createBlog(blogData).subscribe(
      data => {
        this.toastr.success('Successfully!', 'Post created');
        setTimeout(() => {
          this.router.navigate(['/blog', data.data.blogId]);
        }, 1000)
      },
      error => {
        console.log(error.errorMessage);
        this.toastr.error('Error Occured!', 'Some');
      }
    )
  }// end create blog function
}
