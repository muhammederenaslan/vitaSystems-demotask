<!doctype html>
<html class="fixed">


<head>

    <meta charset="UTF-8">
    <meta name="keywords" content="HTML5 Admin Template" />
    <meta name="description" content="Porto Admin - Responsive HTML5 Template">
    <meta name="author" content="okler.net">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="{{asset('admin/vendor/bootstrap/css/bootstrap.css')}}" />
    <link rel="stylesheet" href="{{asset('admin/vendor/animate/animate.compat.css')}}">
    <link rel="stylesheet" href="{{asset('admin/vendor/font-awesome/css/all.min.css')}}" />
    <link rel="stylesheet" href="{{asset('admin/vendor/boxicons/css/boxicons.min.css')}}" />
    <link rel="stylesheet" href="{{asset('admin/vendor/magnific-popup/magnific-popup.css')}}" />
    <link rel="stylesheet" href="{{asset('admin/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css')}}" />
    <link rel="stylesheet" href="{{asset('admin/css/theme.css')}}" />
    <link rel="stylesheet" href="{{asset('admin/css/custom.css')}}">

    <script src="{{asset('admin/vendor/modernizr/modernizr.js')}}"></script>

    <script src="{{asset('admin/master/style-switcher/style.switcher.localstorage.js')}}"></script>

</head>

<body>

    <section class="body-sign">                    
        <div class="form-group mb-3">
        </div>
        <div class="center-sign">
            <div class="panel card-sign">
                <div class="card-body">
                    @if(session('error'))
    <div class="alert alert-danger">
        {{ session('error') }}
    </div>
@endif
                    <form action="{{route('login-post')}}" method="post">
                        @csrf
                        <div class="form-group mb-3">
                            <label class="float-left">Email</label>
                            <div class="input-group">
                                <input name="email" type="email" class="form-control form-control-lg" />
                                <span class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="bx bx-user text-4"></i>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <div class="clearfix">
                                <label class="float-left">Password</label>
                                <a href="pages-recover-password.html" class="float-right"></a>
                            </div>
                            <div class="input-group">
                                <input name="password" type="password" class="form-control form-control-lg" />
                                <span class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="bx bx-lock text-4"></i>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="checkbox-custom checkbox-default">
                                    <input id="RememberMe" name="remember" type="checkbox" />
                                    <label for="RememberMe">Remember Me</label>
                                </div>
                            </div>
                            <div class="col-sm-4 text-right">
                                <button type="submit" class="btn btn-primary mt-2">Sign In</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <p class="text-center text-muted mt-3 mb-3">&copy; Copyright 2022. All Rights Reserved.</p>
        </div>
    </section>

    <script src="{{asset('admin/vendor/jquery/jquery.js')}}"></script>
    <script src="{{asset('admin/vendor/jquery-browser-mobile/jquery.browser.mobile.js')}}"></script>
    <script src="{{asset('admin/vendor/jquery-cookie/jquery.cookie.js')}}"></script>
    <script src="{{asset('admin/master/style-switcher/style.switcher.js')}}"></script>
    <script src="{{asset('admin/vendor/popper/umd/popper.min.js')}}"></script>
    <script src="{{asset('admin/vendor/bootstrap/js/bootstrap.js')}}"></script>
    <script src="{{asset('admin/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js')}}"></script>
    <script src="{{asset('admin/vendor/common/common.js')}}"></script>
    <script src="{{asset('admin/vendor/nanoscroller/nanoscroller.js')}}"></script>
    <script src="{{asset('admin/vendor/magnific-popup/jquery.magnific-popup.js')}}"></script>
    <script src="{{asset('admin/vendor/jquery-placeholder/jquery.placeholder.js')}}"></script>
    <script src="{{asset('admin/js/theme.js')}}"></script>
    <script src="{{asset('admin/js/custom.js')}}"></script>
    <script src="{{asset('admin/js/theme.init.js')}}"></script>

</body>


</html>
