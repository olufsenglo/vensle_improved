// import Dropdown from "./Dropdown";

const Top = () => {
    return (
        <div className="bg-white">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="p-4 flex justify-between">
                    <ul className="flex justify-between">
                        <li className="mr-6 hidden md:block">Welcome to our Online Store!</li>
                        <li className="text-red-500 mr-6">Upload Your Product</li>
                        <li className="text-red-500">Register as a Driver</li>
                    </ul>
                    <ul className="flex justify-between">
                        <li className="text-red-500 mr-6">For Sale</li>
                        <li className="hidden md:block">United Kingdom</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Top;