package com.dvsilva.minhasfinancas.service;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.dvsilva.minhasfinancas.exception.AutenticacaoException;
import com.dvsilva.minhasfinancas.exception.RegraNegocioException;
import com.dvsilva.minhasfinancas.model.entity.Usuario;
import com.dvsilva.minhasfinancas.model.repository.UsuarioRepository;
import com.dvsilva.minhasfinancas.service.impl.UsuarioServiceImpl;

// @SpringBootTest
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
public class UsuarioServiceTest {

	@SpyBean
	private UsuarioServiceImpl service;

	@MockBean
	private UsuarioRepository repository;

	@BeforeEach
	public void setUp() {
		// repository = Mockito.mock(UsuarioRepository.class);
		// service = new UsuarioServiceImpl(repository);
		// Mockito.spy(UsuarioServiceImpl.class);
	}

	// @Test(expected = Test.None.class) // espera nao lancar nenhuma excecao
	// [antigo]
	@Test
	public void deveValidarEmail() {
		// cenario
		// repository.deleteAll();
		Mockito.when(repository.existsByEmail(Mockito.anyString())).thenReturn(false);

		// acao
		service.validarEmail("usuario@email.com");
	}

	// @Test(expected = RegraNegocioException.class) // espera nao lancar nenhuma
	// excecao [antigo]
	@Test
	public void deveLancarErroAoValidarEmailQuandoExistirEmailCadastrado() {
		// cenario
		// Usuario usuario =
		// Usuario.builder().nome("usuario").email("usuario@email.com").build();
		// repository.save(usuario);
		Mockito.when(repository.existsByEmail(Mockito.anyString())).thenReturn(true);

		// acao
		org.junit.jupiter.api.Assertions.assertThrows(RegraNegocioException.class, () -> {
			service.validarEmail("usuario@email.com");
		});
	}

	@Test
	public void deveAutenticarUmUsuarioComSucesso() {
		// cenario
		String email = "email@email.com";
		String senha = "senha";

		Usuario usuario = Usuario.builder().nome("usuario").email(email).senha(senha).build();
		Mockito.when(repository.findByEmail(email)).thenReturn(Optional.of(usuario));

		// acao
		Usuario result = service.autenticar(email, senha);

		// verificacao
		Assertions.assertThat(result).isNotNull();
	}

	@Test
	public void deveLancarErroQuandoNaoEncontrarUsuarioCadastradoComOEmailInformado() {
		// cenario
		Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());

		// acao
		Throwable exception = Assertions.catchThrowable(() -> service.autenticar("email@email.com", "senha"));

		// verificacao
		Assertions.assertThat(exception).isInstanceOf(AutenticacaoException.class)
				.hasMessage("Usuário não encontrado para o email informado.");
	}

	@Test
	public void deveLancarErroQuandoSenhaNaoBater() {
		// cenario
		String senha = "senha";

		Usuario usuario = Usuario.builder().nome("usuario").email("email@email.com").senha(senha).build();
		Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(usuario));

		Throwable exception = Assertions.catchThrowable(() -> service.autenticar("email@email.com", "123"));

		// verificacao
		Assertions.assertThat(exception).isInstanceOf(AutenticacaoException.class).hasMessage("Senha inválida.");
	}

	@Test
	public void deveSalvarUmUsuario() {
		// cenario
		Mockito.doNothing().when(service).validarEmail(Mockito.anyString());
		Usuario usuario = Usuario.builder().id(1l).nome("nome").email("email@email.com").senha("senha").build();
		Mockito.when(repository.save(Mockito.any(Usuario.class))).thenReturn(usuario);

		// acao
		Usuario usuarioSalvo = service.salvarUsuario(usuario);

		// verificacao
		Assertions.assertThat(usuarioSalvo).isNotNull();
		Assertions.assertThat(usuarioSalvo.getId()).isEqualTo(1l);
		Assertions.assertThat(usuarioSalvo.getNome()).isEqualTo("nome");
		Assertions.assertThat(usuarioSalvo.getEmail()).isEqualTo("email@email.com");
		Assertions.assertThat(usuarioSalvo.getSenha()).isEqualTo("senha");
	}

	@Test
	public void naoDeveCadastrarUsuarioComEmailJaCadastrado() {
		// cenario
		String email = "email@email.com";
		Usuario usuario = Usuario.builder().email("email@email.com").build();
		Mockito.doThrow(RegraNegocioException.class).when(service).validarEmail(email);

		// acao
		org.junit.jupiter.api.Assertions.assertThrows(RegraNegocioException.class, () -> {
			service.salvarUsuario(usuario);
		});

		// verificacao
		Mockito.verify(repository, Mockito.never()).save(usuario);
	}

}
