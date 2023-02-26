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
        if (title.trim().length == 0) {
            this.toastService.showAlert("Por favor agrega un título", 2000, ToastTypeMessage.danger);
            throw new Error("No title");
        }
        if (title.trim().length > 21 ) {
            this.toastService.showAlert("Título demasiado largo", 2000, ToastTypeMessage.danger);
            throw new Error("Title too long");
        }
    }

    validateDescription(description: string) {
        if (description.trim().length == 0) {
            this.toastService.showAlert("Por favor agrega una descripción", 2000, ToastTypeMessage.danger);
            throw new Error("No Description");
        }
    }
}