import Products from "./Products";
import ProductTop from "./ProductTop";

const Best = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-6 gap-x-4 xl:gap-x-6">
                    <div className="col-span-2">
                        <ProductTop />
                    </div>
                    <div className="col-span-4 p-4">
                        <div class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                            <button class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-red-600 bg-transparent border-b-2 border-red-500 sm:text-base dark:border-red-400 dark:text-red-300 whitespace-nowrap focus:outline-none">
                                All Products
                            </button>

                            <button class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
                                For Sale
                            </button>

                            <button class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
                                Requests
                            </button>

                            <button class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
                                Groceries
                            </button>
                        </div>
                        <Products />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Best;