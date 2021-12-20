import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(private services: ProductService, private route: ActivatedRoute, private router: Router) {
    this.product = ({ id: 0, name: '', price: 0 })
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.services.readById(id).subscribe(products => this.product = products)
  }

  deleteProduct(): void {
    this.services.delete(this.product.id).subscribe(() => {
      this.services.showMessage('Produto deletado com sucesso!')
      this.router.navigate(['/products'])
    })

  }

  cancel(): void {
    this.services.showMessage('Opareção cancelada')
    this.router.navigate(['/products'])
  }

}
