<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Interfaces\AuthRequestInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    /**
     * Get a JWT and User data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'UnJWTAuthorized'], 401);
        }

        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'  => JWTAuth::user()
        ])->withCookie(
            'jwt_token',
            $token,
            '/'
        );
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'user_type_id' => 'required|max:1',
        ]);

        try {
            User::create([
                'name'          => $request->name,
                'email'         => $request->email,
                'user_type_id'  => $request->user_type_id,
                'password'      => Hash::make($request->password),
            ]);
            return $this->login($request);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e
            ]);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::parseToken($request->token));
            $response = [
                'success' => true,
                'message' => "Logout success"
            ];
        } catch (\Exception $e) {
            $response = [
                'success' => false,
                'message' => $e
            ];
        };
        Cookie::queue(Cookie::forget('jwt_token'));

        return response()->json($response);
    }

    /**
     * Get the JWTAuthenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        $user = JWTAuth::user();
        $userData = $user->toArray();
        $userData['user_type'] = $user->userType();

        return response()->json(['user' => $userData]);
    }

    /**
     * Update current user
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100',
            'user_type_id' => 'required|max:1',
        ]);


        try {
            $user = JWTAuth::user();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->user_type_id = $request->user_type_id;
            $user->save();

            $response = [
                'success' => true,
            ];
        } catch (\Exception $e) {
            $response = [
                'success' => false,
                'message' => $e
            ];
        }
        return response()->json($response);
    }
}
