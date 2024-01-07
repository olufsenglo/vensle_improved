<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;

/**
 * Class Product
 *
 * @property int $id
 * @property string $name
 * @property int $category_id
 * @property string $condition
 * @property float $price
 * @property string $address
 * @property string $phone_number
 * @property string $description
 * @property string $type
 * @property string $status
 * @property string $ratings
 * @property string $quantity
 * @property string $sold
 * @property string $views
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection|Specification[] $specifications
 */
class Product extends Model
{
	use HasFactory;

	/**
	* The attributes that are mass assignable.
	*
	* @var array
	*/
	protected $fillable = [
		'name', 'category_id', 'condition', 'price', 'address', 'phone_number', 'description', 'type', 'status', 'ratings', 'quantity', 'sold', 'views', 'display_image_id', 'user_id',
	];

	/**
	* Get the user who owns the product.
	*
	* @return BelongsTo
	*/
	public function user()
	{
		return $this->belongsTo(User::class);
	}

	/**
	* Get the categories associated with the product.
	*
	* @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	*/
	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	/**
	* Get the specifications associated with the product.
	*
	* @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	*/
	public function specifications()
	{
		return $this->belongsToMany(Specification::class, 'product_specification');
	}


    	public function images()
    	{
        	return $this->hasMany(Image::class);
    	}

    	public function displayImage()
	{
        	return $this->belongsTo(Image::class, 'display_image_id');
    	}	
}
