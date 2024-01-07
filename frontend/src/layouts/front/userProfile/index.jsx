import Footer from "components/front/footer/Footer";
import Header from "components/front/header/Header";

const UserProfile = () => {
    return (
        <div className="bg-white">
<Header />
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-6 gap-x-4 xl:gap-x-6">
                    <div className="col-span-2">
                        <p>Seller Details</p>
                    </div>
                    <div className="col-span-4 p-4">
                        <p>Products</p>
                    </div>
                </div>
            </div>
<Footer />
        </div>                        
    )
}

export default UserProfile;