<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Author;
use App\Models\Book;



class UserController extends Controller
{

    public function userDashboard() {
        $counts = [
            'booksCount' => Book::count(),
            'authorsCount' => Author::count(),
            'usersCount' => User::count(),
        ];
        $user = Auth::user();

        return view('user.dashboard.index',compact('user','counts'));
    }

    public function authorsList() {

        $authors = Author::all();

        return view('user.author.index',compact('authors'));
    }

    public function authorDetail($id) {
        $author = Author::where('id',$id)->first();

        $books = Book::where('author',$author->id)->get();

        return view('user.author.detail',compact('author','books'));
    }

    public function booksList(){

        $books = Book::all();

        foreach($books as $book){
            $bookAuthor = $book->author;

            $author = Author::where('id',$bookAuthor)->first();

            $book->author = $author;
        }


        return view('user.books.index',compact('books'));
        
    }

    public function bookDetail($id){

        $book = Book::where('id',$id)->first();

        $authorID  = $book->author;

        $author = Author::where('id',$authorID)->first();

        return view('user.books.detail',compact('author','book'));
    }
    
}
