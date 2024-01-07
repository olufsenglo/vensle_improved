const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
  ]
  
  export default function ProductTop() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <h2 className="sr-only">Products</h2>
  
            <h2 className="text-2xl tracking-tight text-gray-900 mt-4 mb-8">Customers also purchased</h2>
            <div className="">

            {products.map((product) => (
              <a key={product.id} href={product.href} className="group">

                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <a class="relative flex h-80 overflow-hidden rounded-xl" href="#">

                        <img class="peer absolute group-hover:opacity-75 top-0 right-0 h-full w-full object-cover" src={product.imageSrc} alt={product.name} />
                        <img class="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                    </a>
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>

              </a>
            ))}
            </div>
        </div>
      </div>
    )
  }
  