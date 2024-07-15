document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const productList = document.getElementById('productList');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        fetchProducts(query);
    });

    function fetchProducts(query) {
        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
            .then(res => res.json())
            .then(data => {
                displayProducts(data.results);
            })
            .catch(err => {
                console.error(err);
                productList.innerHTML = '<div class="alert alert-danger" role="alert">Error al cargar los productos.</div>';
            });
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4';
            productCard.innerHTML = `
                <div class="card product-card">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price}</p>
                        <a href="${product.permalink}" class="btn btn-primary" target="_blank">Ver Producto</a>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }
});
