@php
    $isActiveProdandCat = request()->is('admin/cat**') || request()->is('admin/pro**') || request()->is('admin/var**') || request()->is('admin/sug**') || request()->is('admin/lan**') || request()->is('admin/add-tag') || request()->is('admin/cre**');
    $isActiveSale = request()->is('admin/ord**') || request()->is('admin/top**');
    $isActiveDesign = request()->is('admin/men**') || request()->is('admin/pag**') || request()->is('admin/ban**');
    $isActiveNews = request()->is('admin/new**');
    $isActiveSet = request()->is('admin/add-user') || request()->is('admin/users-list') || request()->is('admin/cargo');
@endphp
<aside id="sidebar-left" class="sidebar-left">
    <div class="sidebar-header">
        <div class="sidebar-title">
            Navigation
        </div>
        <div class="sidebar-toggle d-none d-md-block" data-toggle-class="sidebar-left-collapsed" data-target="html"
            data-fire-event="sidebar-left-toggle">
            <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
        </div>
    </div>
    <div class="nano">
        <div class="nano-content">
            <nav id="menu" class="nav-main" role="navigation">
                <ul class="nav nav-main">
                    @php 
                    $user = Auth::user();
                    @endphp
                    @if($user->role == 'admin')
                    <li>
                        <a class="nav-link" href="{{ route('admin.dashboard.index') }}">
                            <i class="bx bx-home-alt" aria-hidden="true"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="{{ route('admin.authors') }}">   
                                                        <i class="bx bx-layout" aria-hidden="true"></i>
                            <span>Authors List</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="{{ route('admin.book.index') }}">   
                                                        <i class="bx bx-layout" aria-hidden="true"></i>
                            <span>Book List</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="{{ route('admin.add.book.form') }}">   
                                                        <i class="bx bx-layout" aria-hidden="true"></i>
                            <span>Add New Book</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="{{ route('admin.add.author') }}">   
                                                        <i class="bx bx-layout" aria-hidden="true"></i>
                            <span>Add New Author</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('logout') }}"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                         Log Out
                     </a>
                     <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                         @csrf
                     </form>
                    </li>
                    @else
                    <li>
                        <a class="nav-link" href="{{ route('user.dashboard') }}">
                            <i class="bx bx-home-alt" aria-hidden="true"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="{{ route('user.authors') }}">   
                                                        <i class="bx bx-layout" aria-hidden="true"></i>
                            <span>Authors List</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="{{ route('user.books.index') }}">   
                                                        <i class="bx bx-layout" aria-hidden="true"></i>
                            <span>Books List</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="{{ route('change.password') }}">   
                                                        <i class="bx bx-layout" aria-hidden="true"></i>
                            <span>Change Password</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('logout') }}"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                         Log Out
                     </a>
                     <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                         @csrf
                     </form>
                    </li>
                    @endif  
                </ul>
            </nav>
        </div>
    </div>
</aside>

