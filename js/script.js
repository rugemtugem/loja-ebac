$(document).ready(function() {
    const produtos = [
        { id: 1, nome: 'Produto 1', preco: 10.00, image: 'produtos/produto1.webp', description: 'Descrição do Produto 1' },
        { id: 2, nome: 'Produto 2', preco: 20.00, image: 'produtos/produto2.webp', description: 'Descrição do Produto 2' },
        { id: 3, nome: 'Produto 3', preco: 15.00, image: 'produtos/produto3.webp', description: 'Descrição do Produto 3' },
        { id: 4, nome: 'Produto 4', preco: 12.00, image: 'produtos/produto4.webp', description: 'Descrição do Produto 4' },
        { id: 5, nome: 'Produto 5', preco: 25.00, image: 'produtos/produto5.webp', description: 'Descrição do Produto 5' },
        { id: 6, nome: 'Produto 6', preco: 30.00, image: 'produtos/produto6.webp', description: 'Descrição do Produto 6' },
        { id: 7, nome: 'Produto 7', preco: 22.00, image: 'produtos/produto7.webp', description: 'Descrição do Produto 7' },
        { id: 8, nome: 'Produto 8', preco: 18.00, image: 'produtos/produto8.webp', description: 'Descrição do Produto 8' },
    ];

    const carrinho = [];

    function updatecarrinho() {
        let carrinhoItems = '';
        let total = 0;

        carrinho.forEach(item => {
            carrinhoItems += `
                <div class="carrinho-item">
                    <span>${item.nome} x ${item.quantity}</span>
                    <span>R$${(item.preco * item.quantity).toFixed(2).replace('.', ',')}</span>
                    <button class="btn btn-sm btn-danger remove-from-carrinho" data-id="${item.id}"><i class="bi bi-trash"></i></button>
                </div>
            `;
            total += item.preco * item.quantity;
        });

        $('#carrinho-items').html(carrinhoItems);
        $('#carrinho-total').text(total.toFixed(2).replace('.', ','));
    }

    function addTocarrinho(id, quantity) {
        const produto = produtos.find(p => p.id === id);
        const carrinhoItem = carrinho.find(item => item.id === id);

        if (carrinhoItem) {
            carrinhoItem.quantity += quantity;
        } else {
            carrinho.push({ ...produto, quantity });
        }

        updatecarrinho();
    }

    let produtoListHTML = '<div class="row">';

    produtos.forEach((produto, index) => {
        if (index % 4 === 0 && index !== 0) {
            produtoListHTML += '</div><div class="row">';
        }

        produtoListHTML += `
            <div class="col-md-3">
                <div class="card mb-4">
                    <img src="${produto.image}" class="card-img-top produto-image" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="carrinho-title">${produto.nome}</h5>
                        <p class="carrinho-text">${produto.description}</p>
                        <p class="carrinho-text text-end text-success"><strong>R$${produto.preco.toFixed(2).replace('.', ',')}</strong></p>
                        <input type="number" value="1" min="1" class="form-control quantity-input mb-2" data-id="${produto.id}">
                        <button class="btn btn-success add-to-carrinho" data-id="${produto.id}">
                            <i class="bi bi-bag"></i> Adicionar ao carrinho
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    produtoListHTML += '</div>';
    $('#produto-list').html(produtoListHTML);

    $('#produto-list').on('click', '.add-to-carrinho', function() {
        const id = $(this).data('id');
        const quantity = parseInt($(`.quantity-input[data-id="${id}"]`).val());
        addTocarrinho(id, quantity);

        $(this).find('i').removeClass('bi-bag').addClass('bi-bag-check');
    });

    $('#clear-carrinho').click(function() {
        carrinho.length = 0;
        updatecarrinho();

        $('.add-to-carrinho i').removeClass('bi-bag-check').addClass('bi-bag');
    });

    $('#checkout-btn').click(function() {
        if (carrinho.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Carrinho vazio!',
                text: 'Adicione produtos antes de finalizar a compra.',
            });
            return;
        }

        let listaProdutos = '';
        let total = 0;

        carrinho.forEach(item => {
            listaProdutos += `<b>${item.nome}</b> - R$${(item.preco * item.quantity).toFixed(2).replace('.', ',')} (x${item.quantity})<br>`;
            total += item.preco * item.quantity;
        });

        Swal.fire({
            icon: 'success',
            title: 'Pedido realizado com sucesso!',
            html: `
                <p>Seu pedido será entregue em breve.</p>
                <h4>Resumo da Compra:</h4>
                <p>${listaProdutos}</p>
                <h3>Total: R$${total.toFixed(2).replace('.', ',')}</h3>
            `,
            confirmButtonText: 'OK'
        });

        carrinho.length = 0;
        updatecarrinho();

        $('.add-to-carrinho i').removeClass('bi-bag-check').addClass('bi-bag');
    });
});

$(document).ready(function() {
    // Verifica se o formulário existe antes de adicionar o evento
    if ($('#formulario-contato').length) {
        $('#formulario-contato').on('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Captura os valores dos campos
            const nome = $('#nome').val();
            const email = $('#email').val();
            const mensagem = $('#mensagem').val();

            // Simula o envio do formulário (substitua por sua lógica de envio real)
            setTimeout(() => {
                // Exibe uma mensagem de sucesso usando SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Mensagem enviada!',
                    html: `Obrigado, ${nome}!<br><br>Sua mensagem foi enviada com sucesso.`,
                    confirmButtonText: 'Fechar'
                });

                // Limpa o formulário após o envio
                $('#formulario-contato')[0].reset();
            }, 1000);
        });
    }
});
