package com.dvsilva.minhasfinancas.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dvsilva.minhasfinancas.model.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
