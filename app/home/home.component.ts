import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from "../blog-http.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allBlogs: any;
  errorMessage: any;
  constructor(private blogHttpService: BlogHttpService, private toastr: ToastrService) {
    this.toastr.info('Blog App', 'Welcome !!!');
  }

  ngOnInit() {
    // this.blogs = this._blogService.getBlogs();
    this.blogHttpService.getAllBlogs().subscribe(
      data => {
        this.allBlogs = data["data"];
        return this.allBlogs;
      },
      error => {
        console.log(error.errorMessage)
      }
    );
  }
}
