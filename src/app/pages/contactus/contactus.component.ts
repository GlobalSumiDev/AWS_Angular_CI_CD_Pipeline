import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InnerbannerComponent } from '../../components/innerbanner/innerbanner.component';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InnerbannerComponent],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent  implements OnInit {
  contactForm: FormGroup | any;
  submitted = false;
  fragment: any
  router: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {


    //Contact Form
    // this.contactForm = this.fb.group({
    //   fullName: ['', [Validators.required, Validators.maxLength(30)]],
    //   phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    //   email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    //   subject: ['', [Validators.required, Validators.maxLength(30)]],
    //   message: ['', [Validators.required]],
    // });

  }
  // get contForm() {
  //   return this.contactForm.controls;
  // }
  // onSubmit() {
  //   this.submitted = true;
  //   if (this.contactForm.valid) {
  //     this.submitted = false;
  //     console.log('====================================');
  //     console.log("contactForm:", this.contactForm.value);
  //     console.log('====================================');
  //     this.contactForm.reset();
  //     console.log('====================================');
  //     console.log("Success");
  //     console.log('====================================');
  //   } else {
  //     console.log("contact Form: Error");
  //   }
  // }

  // @ViewChild('letstalk') letstalk!: ElementRef;


  // ngAfterViewInit() {
  //   this.route.fragment.subscribe(fragment => {
  //     this.scrollToSection(fragment);
  //   });
  // }
  // scrollToSection(fragment: string | null): void {
  //   if (fragment) {
  //     const element = document.getElementById(fragment);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // }
}
