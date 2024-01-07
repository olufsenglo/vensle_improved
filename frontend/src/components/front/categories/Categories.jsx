const products = [
    {
      id: 1,
      name: 'Computing',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 2,
      name: 'Appliances',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 3,
      name: 'Electronics',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 4,
      name: 'Fashion',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 5,
      name: 'Sporting goods',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 6,
      name: 'Cosmetics',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },                     
  ]
  
  export default function Categories() {
    return (
      <div className="bg-white">
        <ul class="mt-8 grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-md p-1">
          <li>
              <a href="#page1" class="flex justify-center py-4">FOR SALE</a>
          </li>
            <li>
              <a href="#page2" style={{"background": "black", "color": "white"}} class="flex justify-center rounded-md shadow text-indigo-900 py-4">REQUESTS</a>
          </li>
          <li>
              <a href="#page3" class="flex justify-center py-4">GROCERIES</a>
          </li>
          <li>
              <a href="#page4" class="flex justify-center py-4">MORE GROCERIES</a>
          </li>
          <li>
            <a href="#page5" class="flex justify-center py-4">MORE SALES</a>
          </li>
        </ul>
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-normal tracking-tight text-gray-900">SHOP BY CATEGORIES</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6 xl:gap-x-6">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }  