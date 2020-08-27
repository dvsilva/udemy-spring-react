package com.dvsilva.minhasfinancas.api.resource;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.dvsilva.minhasfinancas.api.dto.UsuarioDTO;
import com.dvsilva.minhasfinancas.exception.AutenticacaoException;
import com.dvsilva.minhasfinancas.exception.RegraNegocioException;
import com.dvsilva.minhasfinancas.model.entity.Usuario;
import com.dvsilva.minhasfinancas.service.LancamentoService;
import com.dvsilva.minhasfinancas.service.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;

//@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
@WebMvcTest(controllers = UsuarioResource.class) // sobe contexto rest apenas para o controller especifico
@AutoConfigureMockMvc // habilita acesso ao objeto MockMvc
public class UsuarioResourceTest {

	private static final String API = "/api/usuarios";
	private static final MediaType JSON = MediaType.APPLICATION_JSON;

	@Autowired
	MockMvc mvc;
	
	@MockBean
	UsuarioService service;

	@MockBean
	LancamentoService lancamentoService;
	
	@Test
	public void deveAutenticarUmUsuario() throws Exception {
		// cenario
		String email = "usuario@email.com";
		String senha = "senha";
		
		UsuarioDTO dto = UsuarioDTO.builder().email(email).senha(senha).build();
		Usuario usuario = Usuario.builder().email(email).senha(senha).build();
		
		Mockito.when(service.autenticar(email,senha)).thenReturn(usuario);
		String json = new ObjectMapper().writeValueAsString(dto);
		
		// acao e verificacao
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post(API.concat("/autenticar"))
			.accept(JSON)
			.contentType(JSON)
			.content(json);
		
		mvc.perform(request)
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("id").value(usuario.getId()))
			.andExpect(MockMvcResultMatchers.jsonPath("nome").value(usuario.getNome()))
			.andExpect(MockMvcResultMatchers.jsonPath("email").value(usuario.getEmail()));
	}

	@Test
	public void deveRetornarBadRequestAoObterErroDeAutenticacao() throws Exception {
		// cenario
		String email = "usuario@email.com";
		String senha = "senha";
		
		UsuarioDTO dto = UsuarioDTO.builder().email(email).senha(senha).build();
		
		Mockito.when(service.autenticar(email,senha)).thenThrow(AutenticacaoException.class);
		
		String json = new ObjectMapper().writeValueAsString(dto);
		
		// acao e verificacao
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post(API.concat("/autenticar"))
			.accept(JSON)
			.contentType(JSON)
			.content(json);
		
		mvc.perform(request)
			.andExpect(MockMvcResultMatchers.status().isBadRequest());
	}

	@Test
	public void deverCriarUmNovoUsuario() throws Exception {
		// cenario
		String email = "usuario@email.com";
		String senha = "senha";
		
		UsuarioDTO dto = UsuarioDTO.builder().email(email).senha(senha).build();
		Usuario usuario = Usuario.builder().email(email).senha(senha).build();
		
		Mockito.when(service.salvarUsuario(Mockito.any(Usuario.class))).thenReturn(usuario);
		String json = new ObjectMapper().writeValueAsString(dto);
		
		// acao e verificacao
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post(API)
			.accept(JSON)
			.contentType(JSON)
			.content(json);
		
		mvc.perform(request)
			.andExpect(MockMvcResultMatchers.status().isCreated())
			.andExpect(MockMvcResultMatchers.jsonPath("id").value(usuario.getId()))
			.andExpect(MockMvcResultMatchers.jsonPath("nome").value(usuario.getNome()))
			.andExpect(MockMvcResultMatchers.jsonPath("email").value(usuario.getEmail()));
	}

	@Test
	public void deverRetornarBadRequestAoCriarUmNovoUsuarioInvalido() throws Exception {
		// cenario
		String email = "usuario@email.com";
		String senha = "senha";
		
		UsuarioDTO dto = UsuarioDTO.builder().email(email).senha(senha).build();
		
		Mockito.when(service.salvarUsuario(Mockito.any(Usuario.class))).thenThrow(RegraNegocioException.class);
		String json = new ObjectMapper().writeValueAsString(dto);
		
		// acao e verificacao
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post(API)
			.accept(JSON)
			.contentType(JSON)
			.content(json);
		
		mvc.perform(request)
			.andExpect(MockMvcResultMatchers.status().isBadRequest());
	}

}
