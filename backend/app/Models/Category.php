<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 *
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection|Product[] $products
 */
class Category extends Model
{
	use HasFactory;

	/**
	* The attributes that are mass assignable.
	*
	* @var array
	*/
	protected $fillable = ['name'];

	/**
	* Get the products associated with the category.
	*
	* @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	*/
	public function products()
	{
		return $this->hasMany(Product::class);
	}
}
