<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Author;
use App\Models\Book;



class AdminController extends Controller
{


    public function dashboard()
    {
        $user=Auth::user();
        $counts = [
            'booksCount' => Book::count(),
            'authorsCount' => Author::count(),
            'usersCount' => User::count(),
        ];
        
        return view('admin.dashboard.index', compact('counts','user'));
    }

    public function authorsList()
    {

        $authors = Author::all();


        return view('admin.authors.index', compact('authors'));
    }

    public function authorDetail($id)
    {

        $author = Author::where('id', $id)->first();

        $bookIds = explode(',', $author->books);

        $books = Book::whereIn('id', $bookIds)->get();

        return view('admin.authors.detail', compact('author', 'books'));
    }

    public function newAuthor()
    {
        $books = Book::all();
        return view('admin.authors.authorForm',compact('books'));
    }

    public function newAuthorPost(Request $request)
    {
        $name = $request->input('name');
        $surname = $request->input('surname');
        $books = $request->input('books');
        $commaSeparatedBooks = implode(',', $books);
    
        $author = new Author();
        $author->name = $name;
        $author->books = $commaSeparatedBooks;
        $author->surname = $surname;
        $author->save();

        return redirect()->back();
    }

    public function deleteAuthor($id){

         $author = Author::where('id',$id)->first();

         $author->delete();

         return redirect()->back();
        }

    public function allBooks(Request $request)
    {
        $searchText = $request->input('searchText');

        $books = Book::where('name', 'like', '%' . $searchText . '%')->get();

        return response()->json(['books' => $books]);
    }

    public function booksList(){

        $books = Book::all();

        return view('admin.books.index', compact('books'));

        
    }

    public function booksDetail($id){

        $book = Book::where('id',$id)->first();

        $authors = Author::all();

        $authorID = $book->author;

        $author = Author::where('id',$authorID)->first();

        return view('admin.books.detail',compact('book','author','authors'));

    }

    public function newBookForm(){
        $authors = Author::all();
        return view('admin.books.add',compact('authors'));
    }

    public function newBookAdd(Request $request){

        $bookName = $request->input('bookName');

        $bookIsbn = $request->input('bookIsbn');

        $bookPrice = $request->input('bookPrice');

        $bookDetail = $request->input('bookDetail');

        $bookQuantity = $request->input('bookQuantity');

        $authorID =$request->input('authorID');

        $book = new Book();

        $book->isbn = $bookIsbn;

        $book->name = $bookName;

        $book->price = $bookPrice;

        $book->quantity = $bookQuantity;

        $book->detail = $bookDetail;

        $book->author = $authorID;

        $book->save();

        return redirect()->back();

    }

    public function deleteBook($id){

        $book = Book::where('id',$id)->first();

         $book->delete();

         return redirect()->back();
    }

    public function editBook(Request $request) {

        $bookName = $request->input('bookName');

        $bookIsbn = $request->input('bookISBN');

        $bookPrice = $request->input('bookPrice');

        $bookDetail = $request->input('bookDetail');

        $bookQuantity = $request->input('bookQuantity');

        $authorID =$request->input('authorID');

        $id = $request->input('bookID');

        $book = Book::where('id',$id)->first();

        $book->name = $bookName;

        $book->isbn = $bookIsbn;

        $book->detail = $bookDetail;

        $book->price = $bookPrice;

        $book->quantity = $bookQuantity;

        $book->author = $authorID;

        $book->save();

        return redirect()->back();
    }
}
