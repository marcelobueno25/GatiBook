import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map, switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((novoUsuario) =>
          this.novoUsuarioService.verificaUsuarioExistente(novoUsuario)
        ),
        map((usuarioExiste) =>
          usuarioExiste ? { usuarioExistente: true } : null
        ),
        first()
      );
    };
  }
}
