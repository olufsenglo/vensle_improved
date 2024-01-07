<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserAuthController extends Controller
{
	/**
	* Register user
	*
	* @param  \Illuminate\Http\Request  $request
	* @return \Illuminate\Http\JsonResponse
	*/
	public function register(Request $request)
	{
		try {
		    $validated_data = $request->validate([
			'name' => 'required|max:255',
			'email' => 'required|email|unique:users',
			'password' => 'required|confirmed'
		    ]);

		    $validated_data['password'] = bcrypt($request->password);

		    $user = User::create($validated_data);

		    $token = $user->createToken('API Auth Token')->accessToken;

		    return response()->json(['user' => $user, 'token' => $token], 200);
		} catch (\Illuminate\Validation\ValidationException $e) {
		    return response()->json(['errors' => $e->errors()], 422);
		} catch (\Exception $e) {
		    return response()->json(['error' => $e->getMessage()], 500);
		}
	}

        /**
        * Login user
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */
	public function login(Request $request)
	{
		try {
		    $validated_data = $request->validate([
			'email' => 'email|required',
			'password' => 'required'
		    ]);

		    if (!auth()->attempt($validated_data)) {
			return response()->json(['message' => 'Incorrect Details. Please try again'], 401);
		    }

		    $token = auth()->user()->createToken('API Auth Token')->accessToken;

		    return response()->json(['user' => auth()->user(), 'token' => $token], 200);
		} catch (\Illuminate\Validation\ValidationException $e) {
		    return response()->json(['errors' => $e->errors()], 422);
		} catch (\Exception $e) {
		    return response()->json(['error' => $e->getMessage()], 500);
		}
	}

	//TODO try catch
        /**
        * Update user details
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */
	public function updateProfile(Request $request)
	{
		$request->validate([
		    'name' => 'sometimes|string',
		    'email' => 'sometimes|email|unique:users,email,' . auth()->id(),
		]);

		$user = auth()->user();

		$user->update($request->only(['name', 'email']));

		// Return a success response
		return response(['user' => $user, 'message' => 'Profile updated successfully'], 200);
	}

        //TODO try catch
        /**
        * Change user password
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */
	public function updatePassword(Request $request)
	{
		$request->validate([
		    'old_password' => 'required',
		    'new_password' => 'required',
		    'new_password_confirmation' => 'required|same:new_password',
		]);

		$user = auth()->user();

		if (!Hash::check($request->old_password, $user->password)) {
		    return response(['error' => 'Old password is incorrect'], 401);
		}

		$user->update(['password' => bcrypt($request->new_password)]);

		return response(['message' => 'Password updated successfully'], 200);
	}	

        //TODO try catch
        /**
        * Change user password
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */	
	public function updateProfilePicture(Request $request)
	{
	    $request->validate([
		'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
	    ]);

	    $user = auth()->user();

	    // Check if the user already has a profile picture
	    if ($user->profile_picture) {
		// If a profile picture exists, delete the old image
		if (file_exists(public_path('uploads/' . $user->profile_picture))) {
		    unlink(public_path('uploads/' . $user->profile_picture));
		}
	    }

	    // Handle file upload
	    $extension = $request->file('profile_picture')->getClientOriginalExtension();
	    $imageName = Str::random(32) . "." . $extension;
	    $request->file('profile_picture')->move('uploads/', $imageName);

	    // Update user's profile picture
	    $user->update(['profile_picture' => $imageName]);

	    return response(['user' => $user, 'message' => 'Profile picture updated successfully'], 200);
	}
	
}
