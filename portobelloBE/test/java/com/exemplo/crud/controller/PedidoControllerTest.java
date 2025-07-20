package com.exemplo.crud.controller;

import com.exemplo.crud.exception.PedidoException;
import com.exemplo.crud.model.Pedido;
import com.exemplo.crud.service.PedidoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PedidoControllerTest {

    @Mock
    private PedidoService service;

    @InjectMocks
    private PedidoController controller;

    private Pedido pedido;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        pedido = new Pedido();
        pedido.setId("1");
        pedido.setNome("Produto Teste"); // Usando campo existente
        pedido.setPreco(150.0); // Usando campo existente
        pedido.setTipoProduto("Eletrônico");
        pedido.setCriadoPor("João Silva");
    }

    @Test
    void listarTodos() {
        // Arrange
        List<Pedido> pedidos = Arrays.asList(pedido);
        when(service.listarTodos()).thenReturn(pedidos);

        // Act
        ResponseEntity<List<Pedido>> response = controller.listarTodos();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals(pedido, response.getBody().get(0));
        verify(service, times(1)).listarTodos();
    }

    @Test
    void buscarPorId() {
        // Arrange
        when(service.buscarPorId("1")).thenReturn(Optional.of(pedido));

        // Act
        ResponseEntity<Pedido> response = controller.buscarPorId("1");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(pedido, response.getBody());
        verify(service, times(1)).buscarPorId("1");
    }

    @Test
    void buscarPorId_NotFound() {
        // Arrange
        when(service.buscarPorId("2")).thenReturn(Optional.empty());

        // Act
        ResponseEntity<Pedido> response = controller.buscarPorId("2");

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(service, times(1)).buscarPorId("2");
    }

    @Test
    void criarPedido() throws PedidoException {
        // Arrange
        when(service.criar(pedido)).thenReturn(pedido);

        // Act
        ResponseEntity<?> response = controller.criar(pedido);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(pedido, response.getBody());
        verify(service, times(1)).criar(pedido);
    }

    @Test
    void criarPedido_ComErro() throws PedidoException {
        // Arrange
        String mensagemErro = "Erro ao criar pedido";
        when(service.criar(pedido)).thenThrow(new PedidoException(mensagemErro));

        // Act
        ResponseEntity<?> response = controller.criar(pedido);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(mensagemErro, response.getBody());
        verify(service, times(1)).criar(pedido);
    }

    @Test
    void atualizarPedido() throws PedidoException {
        // Arrange
        when(service.atualizar("1", pedido)).thenReturn(pedido);

        // Act
        ResponseEntity<?> response = controller.atualizar("1", pedido);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(pedido, response.getBody());
        verify(service, times(1)).atualizar("1", pedido);
    }

    @Test
    void atualizarPedido_ComErro() throws PedidoException {
        // Arrange
        String mensagemErro = "Pedido não encontrado";
        when(service.atualizar("2", pedido)).thenThrow(new PedidoException(mensagemErro));

        // Act
        ResponseEntity<?> response = controller.atualizar("2", pedido);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(mensagemErro, response.getBody());
        verify(service, times(1)).atualizar("2", pedido);
    }

    @Test
    void deletarPedido() throws PedidoException {
        // Arrange
        doNothing().when(service).deletar("1");

        // Act
        ResponseEntity<Void> response = controller.deletar("1");

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(service, times(1)).deletar("1");
    }

    @Test
    void deletarPedido_ComErro() throws PedidoException {
        // Arrange
        doThrow(new PedidoException("Pedido não encontrado")).when(service).deletar("2");

        // Act
        ResponseEntity<Void> response = controller.deletar("2");

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(service, times(1)).deletar("2");
    }
}