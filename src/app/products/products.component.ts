import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import {TranslateModule, TranslatePipe, TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product',
  standalone: true,

  imports: [CommonModule, MatTableModule, MatButtonModule, HttpClientModule, TranslatePipe, TranslateModule],

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    { name: 'Product A', category: 'Category 1', price: 100, stock: 50, id: 1 },
    { name: 'Product B', category: 'Category 2', price: 200, stock: 30, id: 2 },
    { name: 'Product C', category: 'Category 3', price: 150, stock: 20, id: 3 },
  ];

  product = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    id: null
  };
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService

  ) {}

  isDialogOpen = false;

  openProductDialog() {
    this.product = { name: '', category: '', price: 0, stock: 0, id: null };
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  saveProduct() {
    if (this.product.id === null) {
      const newProduct = { ...this.product, id: this.products.length + 1 };
      this.products.push(newProduct);
    } else {
      const index = this.products.findIndex(p => p.id === this.product.id);
      if (index !== -1) {
      }
    }
    this.closeDialog();
  }

  editProduct(product:any) {
    this.product = { ...product };
    this.isDialogOpen = true;
  }

  deleteProduct(product:any) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  formatCurrency(value: number): string {
    return '$' + value.toFixed(2);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

    this.snackBar.open(this.translate.instant('logout-success.success'), 'Close', {
      duration: 3000,
    });
  }
}
