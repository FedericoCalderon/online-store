import { Injectable } from "@angular/core";
import { ToastTypeMessage } from "../constants/toast-type.enum";
import { ToastService } from "./toast.service";


@Injectable({
    providedIn: "root"
})
export class ValidationsService {

    constructor(private toastService: ToastService) {}

    validatePrice(price: number) {
        if (price >= 100000 || price <= 0) {
            this.toastService.showAlert("Precio incorrecto", 2000, ToastTypeMessage.danger);
            throw new Error("Incorrect price");
        }
    }
    validateTitle(title: string) {
        if (title.length == 0 || title.length > 50 || title.trim() == '') {
            this.toastService.showAlert("Título incorrecto", 2000, ToastTypeMessage.danger);
            throw new Error("Incorrect title");
        }
    }
}