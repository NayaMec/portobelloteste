package com.exemplo.crud.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Document(collection = "pedidos")
public class Pedido {
    @Id
    private String id;

    @NotBlank(message = "O nome do produto é obrigatório")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
    private String nome;

    @Positive(message = "O preço deve ser maior que zero")
    @DecimalMin(value = "0.01", message = "O preço mínimo é 0.01")
    private double preco;

    @NotBlank(message = "O tipo de produto é obrigatório")
    private String tipoProduto;

    private String ambiente;

    @Pattern(regexp = "[A-Z0-9-]+", message = "Deve conter apenas letras maiúsculas, números e hífens")
    private String codigo;

    private LocalDateTime dataCriacao = LocalDateTime.now();
    private LocalDateTime dataAtualizacao;

    @NotBlank(message = "O campo criadoPor é obrigatório")
    private String criadoPor;

    @NotNull
    private StatusPedido status = StatusPedido.PROCESSANDO;

    public enum StatusPedido {
        PROCESSANDO, ENVIADO, ENTREGUE, CANCELADO
    }
}