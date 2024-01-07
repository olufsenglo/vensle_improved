import { Fragment, useState, useEffect } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "actions/auth";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  fetchCartItems,
} from 'actions/actions';

import Top from "./Top";
import NavLinks from "./NavLinks";

import logo from "assets/img/front/logo.PNG";
import person from "assets/img/front/person.PNG";
import cart from "assets/img/front/cart.PNG";
import Search from './Search';

const products = [
    {
      id: 1,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: '$90.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Medium Stuff Satchel',
      href: '#',
      color: 'Blue',
      price: '$32.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]



const Header = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const [open, setOpen] = useState(false)
    const [loginRegisterOpen, setLoginRegisterOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)

    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);
  
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });        

    const handleRemoveFromCart = (itemId) => {
      dispatch(removeFromCart(itemId));
    };
  
    const handleDecreaseQuantity = (itemId) => {
      dispatch(decreaseQuantity(itemId));
    };
  
    const handleIncreaseQuantity = (itemId) => {
      dispatch(increaseQuantity(itemId));
    };
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };    

    const handleLogin = (e) => {
        e.preventDefault();
    
        setLoading(true);

    if (loginError == '')
	      dispatch(login(formData.email, formData.password))
        .then(() => {
	        console.log("LoggedIn");
          navigate('/admin/products');
          //window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    };
console.log(message)
    // if (isLoggedIn) {
    //   navigate('/admin/products');
    // }

    useEffect(() => {
      dispatch(fetchCartItems());
    }, [dispatch]);     

    return (
        <div>
            <Top />
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <div style={{ "height": "3rem", "display": "flex", "justify-content": "space-between", "align-items": "center" }} >
                        <img style={{ "width": "14rem" }} src={logo} alt="vensle" />
                          <Search />

                        <div style={{ "display": "flex", "align-items": "center", "font-size": "0.9rem" }}>
                            <div className="flex" style={{ "align-items": "center" }}>
                                <img src={person} />
                                <div style={{ "display": "flex", "justify-content": "space-between", "flex-direction": "column", "height": "100%" }}>
                                    <p>Hello Guest</p>
                                    <h2 style={{"cursor":"pointer"}}>
                                      <span onClick={() => setLoginOpen(true)}>Sign In </span>/
                                      <span onClick={() => setLoginRegisterOpen(true)}>Register</span>
                                    </h2>
                                </div>
                            </div>
                            <div className="flex" style={{ "align-items": "center" }}>
                                <img src={cart} />
                                <div style={{ "display": "flex", "justify-content": "space-between", "flex-direction": "column", "height": "100%" }}>
                                    <p onClick={() => setOpen(true)}>Your cart</p>
                                    <h2 style={{ "color": "red" }}>$0.00</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <NavLinks />


            <Transition.Root show={loginOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setLoginOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-xl md:px-4 lg:max-w-2xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setLoginOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="w-full">

                                        <section class="bg-white dark:bg-gray-900">
                                            <div class="container flex items-center justify-center px-6 mx-auto">
                                                <form onSubmit={handleLogin} class="w-full max-w-md">          
                                                    <div class="flex items-center justify-center mt-6">
                                                        <a href="#" class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                                                            sign in
                                                        </a>

                                                        <a href="#" class="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                                                            sign up
                                                        </a>
                                                    </div>
	    {console.log("zzzxxx", message)}
{loading && <span>Loading</span>}
{message?.message?.dispatchError && <p style={{"color":"red", marginTop: "16px"}}>{message.message.dispatchError}</p>}
                                                    <div class="relative flex items-center mt-6">
                                                        <span class="absolute">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                        </span>

                                                        <input
                                                          type="text"
                                                          name="email"
                                                          value={formData.email} 
                                                          onChange={handleInputChange}
                                                          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
		message && message?.message?.email ? "border-red-400":""
    	    }`}
                                                          placeholder="Email address"
                                                        />
                                                    </div>
	{message && message?.message?.email && 
		message.message.email.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}

                                                    <div class="relative flex items-center mt-4">
                                                        <span class="absolute">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        </span>

                                                        <input
                                                          type="password"
                                                          name='password'
                                                          value={formData.password} 
                                                          onChange={handleInputChange}
                                                          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
		message && message?.message?.password ? "border-red-400":""
    	    }`}
                                                          placeholder="Password" />
                                                    </div>

	{message && message?.message?.password && 
		message.message.password.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}
                                                    <div class="flex items-center mt-6 -mx-2">
                                                      <button type="submit" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                                                          Login
                                                        </button>
                                                    </div>

                                                    <div class="flex items-center justify-between mt-4">
                                                        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                                                        <a href="#" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                                                            or login with Social Media
                                                        </a>

                                                        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                                                    </div>

                                                    <div class="flex items-center mt-6 -mx-2">
                                                        <button type="button" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                                                            <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                                                                </path>
                                                            </svg>

                                                            <span class="hidden mx-2 sm:inline">Sign in with Google</span>
                                                        </button>

                                                        <a href="#" class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200">
                                                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </div>

                                                </form>
                                            </div>
                                        </section>

                                    </div>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>




            <Transition.Root show={loginRegisterOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setLoginRegisterOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-xl md:px-4 lg:max-w-2xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setLoginRegisterOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="w-full">

                                        <section class="bg-white dark:bg-gray-900">
                                            <div class="container flex items-center justify-center px-6 mx-auto">
                                                <form class="w-full max-w-md">          
                                                    <div class="flex items-center justify-center mt-6">
                                                        <a href="#" class="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                                                            sign in
                                                        </a>

                                                        <a href="#" class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                                                            sign up
                                                        </a>
                                                    </div>

                                                    <div class="relative flex items-center mt-8">
                                                        <span class="absolute">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </span>

                                                        <input type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                                                    </div>

                                                    <div class="relative flex items-center mt-6">
                                                        <span class="absolute">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                        </span>

                                                        <input type="email" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                                                    </div>

                                                    <div class="relative flex items-center mt-4">
                                                        <span class="absolute">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        </span>

                                                        <input type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                                                    </div>

                                                    <div class="relative flex items-center mt-4">
                                                        <span class="absolute">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        </span>

                                                        <input type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" />
                                                    </div>

                                                    <div class="flex items-center mt-6 -mx-2">
                                                      <button type="submit" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                                                          Login
                                                        </button>
                                                    </div>                                                    

                                                    <div class="flex items-center justify-between mt-4">
                                                        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                                                        <a href="#" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                                                            or login with Social Media
                                                        </a>

                                                        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                                                    </div>

                                                    <div class="flex items-center mt-6 -mx-2">
                                                        <button type="button" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                                                            <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                                                                </path>
                                                            </svg>

                                                            <span class="hidden mx-2 sm:inline">Sign in with Google</span>
                                                        </button>

                                                        <a href="#" class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200">
                                                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </div>

                                                </form>
                                            </div>
                                        </section>

                                    </div>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={item.href}>{item.name}</a>
                                      </h3>
                                      <p className="ml-4">{item.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">red</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {item.quantity}</p>

                                    <div class="sm:order-1">
                                      <div class="mx-auto flex h-8 items-stretch text-gray-600">
                                        <button onClick={() => handleDecreaseQuantity(item.id)} class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-gray-800 hover:text-white">-</button>
                                        <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">1</div>
                                        <button onClick={() => handleIncreaseQuantity(item.id)} class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-gray-800 hover:text-white">+</button>
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
      )}
                        
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>


        </div>
    )
}

export default Header;


