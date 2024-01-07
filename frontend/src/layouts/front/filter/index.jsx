import Header from "components/front/header/Header";
import ProductsFilter from "views/filter/ProductsFilter";

const Filter = () => {
    return (
        <div className="min-h-full">
            <Header />
            <ProductsFilter />
        </div>
    )
}

export default Filter;