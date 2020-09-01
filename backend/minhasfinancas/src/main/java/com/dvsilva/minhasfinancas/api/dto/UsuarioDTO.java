package com.dvsilva.minhasfinancas.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UsuarioDTO {
	
	private String nome;
	private String email;
	private String senha;
	
}