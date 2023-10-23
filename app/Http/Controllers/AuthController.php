<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function index()
    {
        return view('login.index');
    }

    public function login(Request $request)
    {

        $eMail      = $request->input('email');

        $password   = $request->input('password');

        $remember   = $request->input('remember', 0);


        if (Auth::attempt(['email' => $eMail, 'password' => $password, 'role' => 'admin'], $remember)) {

            $request->session()->regenerate();

            return redirect()->route('admin.dashboard.index');
        } elseif (Auth::attempt(['email' => $eMail, 'password' => $password, 'role' => 'user'], $remember)) {

            $request->session()->regenerate();

            return redirect()->route('user.dashboard');
        } else {

            return view('login.index')->with('error', 'Invalid credentials');
        }
    }
    public function changePasswordForm()
    {

        return view('login.change-password');
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();
        $currentPassword = $request->input('currentPassword');
        $newPassword = $request->input('newPassword');

        if (Hash::check($currentPassword, $user->password)) {

            $user->password = Hash::make($newPassword);

            $user->save();

            return redirect()->back()->with('success', 'Password changed successfully.');
        } else {
            return redirect()->back()->with('error', 'Current password is incorrect.');
        }
    }

    public function unauthorizedAccess() {

        return view('error.index');
    }
    public function logout()
    {
        Auth::logout();

        return redirect()->route('login');
    }
}
