<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
	    $table->string('name');
	    $table->foreignId('user_id');
	    $table->unsignedBigInteger('category_id');
	    $table->enum('condition', ['New', 'Fairly Used', 'N/A']);
	    $table->decimal('price', 8, 2);
	    $table->string('address');
	    $table->string('phone_number');
	    $table->text('description');
	    $table->string('type');
	    $table->decimal('ratings', 3, 2)->nullable();
	    $table->integer('quantity')->default(0);
	    $table->integer('sold')->default(0);
	    $table->integer('views')->default(0);
	    $table->enum('status', ['Active', 'Inactive'])->default('Active');
            //$table->unsignedBigInteger('image_id')->nullable();
	    //$table->unsignedBigInteger('display_image_id')->nullable();
	    $table->timestamps();

	    // Create foreign key relationships
	    $table->foreign('category_id')->references('id')->on('categories');
            //$table->foreign('image_id')->references('id')->on('images')->onDelete('set null');
            //$table->foreign('display_image_id')->references('id')->on('images')->onDelete('set null');	    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
