<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Class ProductController
 * @package App\Http\Controllers
 */
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            //$products = Product::paginate(config('constants.PAGINATION_LIMIT'));
	    $products = Product::with(['images', 'displayImage', 'category'])
    		->orderBy('created_at', 'desc')
    		->paginate(config('constants.PAGINATION_LIMIT'));

            return response()->json($products);
        } catch (\Exception $e) {
            Log::error('Error fetching products: ' . $e->getMessage());
	    return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function create()
    {
        // Not needed for API
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
	$response = [];
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'condition' => 'required|in:New,Fairly Used,N/A',
                'price' => 'required|numeric',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'description' => 'required|string',
                'type' => 'required|string',
                'status' => 'required|in:Active,Inactive',
		'ratings' => 'nullable|numeric|min:0|max:5',
                'quantity' => 'nullable|integer|min:0',
                'sold' => 'nullable|integer|min:0',
                'views' => 'nullable|integer|min:0',
                'category_id' => 'required|exists:categories,id',
		//'specification_ids' => 'required|array',
		'images' => 'required',
		'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
	    ]);


	$user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }	 
//dd($user);
        $product = $user->products()->create($validatedData);

$foundProfileImage = false;
foreach ($request->images as $imageFile) {
	$extension = $imageFile->getClientOriginalExtension();
	$imageName =  Str::random(32).".".$extension;

	$image = new Image([
	    'name' => $imageName,
	    'extension' => $extension,
	]);

	// Upload the image to the "uploads" folder
	$imageFile->move('uploads/', $imageName);

	// Set the product_id for the image
	$image->product_id = $product->id;

	$product->images()->save($image);

	if (!$foundProfileImage)
	{
	    $product->update(['display_image_id' => $image->id]);
	    $foundProfileImage = true;
	}
}

/**
foreach ($request->images as $imageFile) {
    $extension = $imageFile->getClientOriginalExtension();
    $imageName = Str::random(32) . "." . $extension;

    $image = new Image([
        'name' => $imageName,
        'extension' => $extension,
    ]);

    // Upload the image to the "public/uploads" directory
    $imagePath = $imageFile->storeAs('uploads', $imageName, 'public');

    // Set the product_id for the image
    $image->product_id = $product->id;

    $product->images()->save($image);

    if (!$foundProfileImage) {
        $product->update(['display_image_id' => $imagePath]);
        $foundProfileImage = true;
    }
}*/

return response()->json($product, 201);

	    return response()->json($product, 201);
	} catch (ValidationException $e) {
		return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error storing product: ' . $e->getMessage());
	    
	    /**
	     * return response()->json(['error' => 'Internal Server Error'], 500);
	     * TODO: create error handling middleware
	     * ($e instanceof \Illuminate\Database\QueryException) {
	     * return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
	     * }
	     */

	    return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function upload(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        try {
	    $product = Product::with('images')->findOrFail($id);
        } catch (\Exception $e) {
            Log::error('Error fetching product: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
	}
        //} catch (ModelNotFoundException $e) {
            //return response()->json(['error' => 'Product not found.'], 404);
	//}
	
	$similarProducts = $this->getSimilarProducts($product);	
	return response()->json([
		'product' => $product,
		'similarProducts' => $similarProducts
	]);
    }

    private function getSimilarProducts($product)
    {
        $similarProducts = Product::where('category_id', $product->category_id)
            ->where('name', 'like', '%' . $product->name . '%')
            ->where('id', '<>', $product->id)
            ->take(4)
            ->get();

        return $similarProducts;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Not needed for API
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $productId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $productId)
    {
	    try {
		$validatedData = $request->validate([
		    'name' => 'sometimes|required|string',
		    'condition' => 'sometimes|required|in:New,Fairly Used,N/A',
		    'price' => 'sometimes|required|numeric',
		    'address' => 'sometimes|required|string',
		    'phone_number' => 'sometimes|required|string',
		    'description' => 'sometimes|required|string',
		    'type' => 'sometimes|required|string',
		    'status' => 'sometimes|required|in:Active,Inactive',
		    'ratings' => 'sometimes|nullable|numeric|min:0|max:5',
		    'quantity' => 'sometimes|nullable|integer|min:0',
		    'sold' => 'sometimes|nullable|integer|min:0',
		    'views' => 'sometimes|nullable|integer|min:0',
		    'category_id' => 'sometimes|required|exists:categories,id',
		    'specification_ids' => 'sometimes|required|array',
		    //'images' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',	
		]);


		$product = Product::findOrFail($productId);

		// Check if a new image is provided
		/*
		if ($request->hasFile('images')) {
		    // Handle file upload for the new image
		    $extension = $request->file('images')->getClientOriginalExtension();
		    $imageName = Str::random(32) . "." . $extension;
		    $request->file('image')->move('uploads/', $imageName);

		    // Delete the existing image if it exists
		    if ($product->images()->exists()) {
			$existingImage = $product->images->first();
			Storage::delete('uploads/' . $existingImage->name);
			$existingImage->delete();
		    }

		    // Create a new image record in the database
		    $image = new Image([
			'name' => $imageName,
			'extension' => $extension,
		    ]);

		    $product->images()->save($image);
		}
		*/

		// Update other product details
		$product->update($validatedData);

		// Update category for product
		$product->category()->associate($request->category_id)->save();

		return response()->json($product);
	    } catch (\Exception $e) {
		Log::error('Error updating product: ' . $e->getMessage());

		return response()->json(['error' => $e->getMessage()], 500);
	    }	    
    }

    /** For Test only, move to its controller */
/*public function filter(Request $request)
{
    $searchInput = $request->input('searchTerm');
    $categoryId = $request->input('category_id');

    $products = Product::when($searchInput, function ($query) use ($searchInput) {
        $query->where('name', 'like', "%$searchInput%");
    })->when($categoryId, function ($query) use ($categoryId) {
        $query->where('category_id', $categoryId);
    })->get();

    return response()->json(['data' => $products]);
}


    public function filter(Request $request)
    {
        $query = Product::query();

        // Apply filters based on request parameters
        if ($request->has('searchTerm')) {
            $query->where('name', 'like', '%' . $request->input('searchTerm') . '%');
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        if ($request->filled('minPrice')) {
            $query->where('price', '>=', $request->input('minPrice'));
        }

        if ($request->filled('maxPrice')) {
            $query->where('price', '<=', $request->input('maxPrice'));
        }

        //if ($request->has('sizes')) {
            //$sizes = explode(',', $request->input('sizes'));
            //$query->whereIn('size', $sizes);
        //}

        // Add more filters as needed

        $filteredProducts = $query->get();

        return response()->json(['data' => $filteredProducts]);
    }
 */

    public function filter(Request $request)
    {
        $query = Product::query();

        // Apply filters based on request parameters
        if ($request->has('searchTerm')) {
            $query->where('name', 'like', '%' . $request->input('searchTerm') . '%');
        }

        // Only add category_id filter if it is not empty
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        if ($request->filled('minPrice')) {
            $query->where('price', '>=', $request->input('minPrice'));
        }

        if ($request->filled('maxPrice')) {
            $query->where('price', '<=', $request->input('maxPrice'));
        }

        //if ($request->has('sizes')) {
            //$sizes = explode(',', $request->input('sizes'));
            //$query->whereIn('size', $sizes);
        //}

        // Add more filters as needed

        $filteredProducts = $query->get();

        return response()->json(['data' => $filteredProducts]);
    }

    /**
     * Get the top products based on a specific column.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $column
     * @return \Illuminate\Http\JsonResponse
     */
    private function getTopProducts(Request $request, $column)
    {
        try {
            $request->validate([
                'per_page' => 'required|integer',
            ]);

            $perPage = $request->input('per_page');

            $products = Product::orderByDesc($column)->paginate($perPage);

            return response()->json($products);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Log the exception and return an error response
            Log::error("Error fetching top products by $column: " . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

public function getProductsByUser()
{
    try {
        $user = Auth::user();
        $products = $user->products()->get();

        return response()->json($products, 200);
    } catch (\Exception $e) {
        // Handle exceptions
        return response()->json(['error' => $e->getMessage()], 500);
    }
}    

    /**
     * Get the top products sorted by quantity.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsByQuantity(Request $request)
    {
        return $this->getTopProducts($request, 'quantity');
    }

    /**
     * Get the top products sorted by sold quantity.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsBySold(Request $request)
    {
        return $this->getTopProducts($request, 'sold');
    }

    /**
     * Get the top products sorted by ratings.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsByRatings(Request $request)
    {
        return $this->getTopProducts($request, 'ratings');
    }

    /**
     * Get the top products sorted by views.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsByViews(Request $request)
    {
        return $this->getTopProducts($request, 'views');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Product $product)
    {
	try {
            $product->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
