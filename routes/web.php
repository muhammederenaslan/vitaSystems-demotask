<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/unauthorized', [AuthController::class, 'unauthorizedAccess'])->name('unauthorized');

Route::get('/get/all/books', [AdminController::class, 'allBooks'])->name('get.all.books');

Route::get('/login', [AuthController::class, 'index'])->name('login');

Route::post('/login', [AuthController::class, 'login'])->name('login-post');

Route::get('/member/dashboard',[UserController::class, 'userDashboard'])->name('user.dashboard');

Route::get('/member/author/index',[UserController::class, 'authorsList'])->name('user.authors');

Route::get('/member/author/show/{id}',[UserController::class, 'authorDetail'])->name('user.author.detail');

Route::get('/member/book/index',[UserController::class, 'booksList'])->name('user.books.index');

Route::get('/member/book/show/{id}',[UserController::class, 'bookDetail'])->name('user.book.detail');

Route::get('/member/change-password',[AuthController::class, 'changePasswordForm'])->name('change.password');

Route::post('/member/change-password',[AuthController::class, 'changePassword'])->name('change.post-password');

Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->middleware('admin')->name('admin.dashboard.index');

Route::get('/admin/member/author/index', [AdminController::class, 'authorsList'])->middleware('admin')->name('admin.authors');

Route::get('/admin/member/author/show/{id}', [AdminController::class, 'authorDetail'])->middleware('admin')->name('admin.author.detail');

Route::get('/admin/member/author/new', [AdminController::class, 'newAuthor'])->middleware('admin')->name('admin.add.author');

Route::post('/admin/member/author/new', [AdminController::class, 'newAuthorPost'])->middleware('admin')->name('admin.add.author.post');

Route::delete('/member/author/delete/{id}', [AdminController::class, 'deleteAuthor'])->middleware('admin')->name('admin.delete.author');

Route::get('/admin/book/index', [AdminController::class, 'booksList'])->middleware('admin')->name('admin.book.index');

Route::get('/admin/book/show/{id}', [AdminController::class, 'booksDetail'])->middleware('admin')->name('admin.book.detail');

Route::get('/admin/book/new', [AdminController::class, 'newBookForm'])->middleware('admin')->name('admin.add.book.form');

Route::post('/admin/book/new/add', [AdminController::class, 'newBookAdd'])->middleware('admin')->name('admin.add.book');

Route::delete('/member/book/delete/{id}', [AdminController::class, 'deleteBook'])->middleware('admin')->name('admin.book.delete');

Route::post('/admin/book/new', [AdminController::class, 'editBook'])->middleware('admin')->name('admin.edit.book');








Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

