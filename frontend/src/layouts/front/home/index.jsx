import Header from "components/front/header/Header";
import Hero from "components/front/hero/Hero";
import Categories from "components/front/categories/Categories";
import Best from "components/front/best/Best";
import Footer from "components/front/footer/Footer";
import GrocerySuggest from "components/front/grocerySuggest/GrocerySuggest";

const Home = () => {
    return (
        <div className="min-h-full">
            <Header />
            <Hero />
            <Categories />
            <Best />
            <GrocerySuggest />
            <Footer />
        </div>
    )
}

export default Home;
