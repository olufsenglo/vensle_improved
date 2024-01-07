<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;


class StripeController extends Controller
{
    public function payment(Request $request)
    {
        try {
            $productIds = $request->product_ids;
            if (!is_array($productIds) || empty($productIds)) {
                return response()->json(['error' => 'Invalid or empty product_ids'], 400);
            }

            $products = Product::whereIn('id', $productIds)->get();

            // Ensure products are not empty
            if ($products->isEmpty()) {
                return response()->json(['error' => 'No valid products found'], 400);
            }

            $lineItems = [];

            foreach ($products as $product) {
                // Ensure price is a valid numeric value
                $priceInCents = is_numeric($product->price) ? $product->price * 100 : 0;

                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'usd',
                        'unit_amount' => $priceInCents,
                        'product_data' => [
                            'name' => $product->name,
                            'description' => $product->description,
                        ],
                    ],
                    'quantity' => 1,
                ];
            }

            Stripe::setApiKey(config('stripe.secret_key'));

            $session = Session::create([
                'payment_method_types' => ['card', 'cashapp', 'us_bank_account'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => 'http://localhost:3000/payment/success',
                'cancel_url' => 'http://localhost:3000/payment/cancel',
            ]);

            return response()->json(['url' => $session->url]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

/**
class StripeController extends Controller
{
	public function payment(Request $request)
	{
		$products = Product::whereIn('id', $request->product_ids)->get();
		dd($products);
		$lineItems = [];

		foreach ($products as $product) {
		    $priceInCents = $product->price * 100; // Convert price to cents
		    $lineItems[] = [
			'price_data' => [
			    'currency' => 'usd',
			    'unit_amount' => $priceInCents,
			    'product_data' => [
				'name' => $product->name,
				'description' => $product->description,
			    ],
			],
			'quantity' => 1,
		    ];
		}

		Stripe::setApiKey(config('stripe.secret_key'));

		$session = Session::create([
		    'payment_method_types' => ['card', 'cashapp', 'us_bank_account'],
		    'line_items' => $lineItems,
		    'mode' => 'payment',
		    'success_url' => 'http://localhost:3000/payment/success',
		    'cancel_url' => 'http://localhost:3000/payment/cancel',
		]);

		return response()->json(['url' => $session->url]);
	}
}*/
