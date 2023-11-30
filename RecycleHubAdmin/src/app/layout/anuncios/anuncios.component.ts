import { Component } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent {

  produtos: Produto[] = [];
  empresaLogadaString = this.cookieService.get('cookieEmpresa');
  empresaLogada: any = JSON.parse(this.empresaLogadaString || '{}');

  constructor(private produtoService: ProdutoService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.carregarProdutos();
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
  }

  carregarProdutos(): void {
    console.log(this.produtos)
    this.produtoService.getProdutosByCnpj(this.empresaLogada.cnpj)
      .subscribe(
        produtos => {
          this.produtos = produtos;
        },
        error => {
          console.error('Erro ao buscar produtos:', error);
        }
      );
  }
}
