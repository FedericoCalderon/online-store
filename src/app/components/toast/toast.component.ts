import { Component, OnInit } from '@angular/core';
import { ToastTypeMessage } from 'src/app/constants/toast-type.enum';
import { _Toast } from 'src/app/models/Toast.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  public message: string;
  public show: boolean;
  public styleToast: string;

  constructor(private toastService: ToastService) {
    this.message = "";
    this.show = false;
    this.styleToast = ToastTypeMessage.informative;
  }

  ngOnInit(): void {
    this.toastService.value$.subscribe((toast: _Toast) => {
      if (toast.message.trim() != "") {
        this.showVisual(toast.time);
        this.message = toast.message;
        this.styleToast = toast.type;
      }
    })
  }

  showVisual(time: number) {
    setTimeout(() => {
      this.show = false;
    }, time);
    this.show = true;
  }
  
}
