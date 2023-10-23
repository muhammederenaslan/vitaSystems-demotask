@extends('admin.layouts.default')

@section('page-css')

<link rel="stylesheet" href="{{asset('admin/vendor/bootstrap/css/bootstrap.css')}}" />
<link rel="stylesheet" href="{{asset('admin/vendor/animate/animate.compat.css')}}">
<link rel="stylesheet" href="{{asset('admin/vendor/font-awesome/css/all.min.css')}}" />
<link rel="stylesheet" href="{{asset('admin/vendor/boxicons/css/boxicons.min.css')}}" />
<link rel="stylesheet" href="{{asset('admin/vendor/magnific-popup/magnific-popup.css')}}" />
<link rel="stylesheet" href="{{asset('admin/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css')}}" />
<link rel="stylesheet" href="{{asset('admin/vendor/jquery-ui/jquery-ui.css')}}" />
<link rel="stylesheet" href="{{asset('admin/vendor/jquery-ui/jquery-ui.theme.css')}}" />
<link rel="stylesheet" href="{{asset('admin/vendor/bootstrap-multiselect/css/bootstrap-multiselect.css')}}" />
<link rel="stylesheet" href="{{asset('admin/vendor/morris/morris.css')}}" />
<link rel="stylesheet" href="{{asset('admin/css/theme.css')}}" />
<link rel="stylesheet" href="{{asset('admin/css/custom.css')}}">
<script src="{{asset('admin/vendor/modernizr/modernizr.js')}}"></script>
<script src="{{asset('admin/master/style-switcher/style.switcher.localstorage.js')}}"></script>

@endsection

@section('content')
<header class="page-header page-header-left-inline-breadcrumb">
    <h2 class="font-weight-bold text-6">Dashboard</h2>
</header>


<div class="row">
    <div class="col-lg-6 mx-auto mb-3">
        <div class="card card-modern">
            <div class="card-body p-0">
                <div class="widget-user-info">
                    <div class="widget-user-info-header">
                        <h2 class="font-weight-bold text-color-dark text-5">Hello {{ $user->name ?? '' }} {{ $user->surname ?? '' }},</h2>
                    </div>
                    <div class="widget-user-info-body">
                        <div class="row">
                            <div class="col-auto">
                                <strong class="text-color-dark text-5"> </strong>
                                <h3 class="text-4-1">Total Users</h3>
                                <p>Number of Users: {{ $counts['usersCount'] }}</p>                     </div>
                            <div class="col-auto">
                                <strong class="text-color-dark text-5"></strong>
                                <h3 class="text-4-1">Total Authors</h3>
                                <p>Number of Authors: {{ $counts['authorsCount'] }}</p>
                            </div>
                            <div class="col-auto">
                                <strong class="text-color-dark text-5"> </strong>
                                <h3 class="text-4-1">Total Books</h3>
                                <p>Number of Books: {{ $counts['booksCount'] }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

@endsection
@section('page-js')

<script src="{{asset('admin/vendor/jquery/jquery.js')}}"></script>
<script src="{{asset('admin/vendor/jquery-browser-mobile/jquery.browser.mobile.js')}}"></script>
<script src="{{asset('admin/vendor/jquery-cookie/jquery.cookie.js')}}"></script>
<script src="{{asset('admin/vendor/bootstrap/js/bootstrap.js')}}"></script>
<script src="{{asset('admin/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js')}}"></script>
<script src="{{asset('admin/vendor/popper/umd/popper.min.js')}}"></script>
<script src="{{asset('admin/vendor/common/common.js')}}"></script>
<script src="{{asset('admin/vendor/nanoscroller/nanoscroller.js')}}"></script>
<script src="{{asset('admin/vendor/magnific-popup/jquery.magnific-popup.js')}}"></script>
<script src="{{asset('admin/vendor/jquery-placeholder/jquery.placeholder.js')}}"></script>
<script src="{{asset('admin/vendor/jquery-ui/jquery-ui.js')}}"></script>
<script src="{{asset('admin/vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js')}}"></script>
<script src="{{asset('admin/vendor/jquery-appear/jquery.appear.js')}}"></script>
<script src="{{asset('admin/vendor/bootstrap-multiselect/js/bootstrap-multiselect.js')}}"></script>
<script src="{{asset('admin/vendor/jquery.easy-pie-chart/jquery.easypiechart.js')}}"></script>
<script src="{{asset('admin/vendor/flot/jquery.flot.js')}}"></script>
<script src="{{asset('admin/vendor/flot.tooltip/jquery.flot.tooltip.js')}}"></script>
<script src="{{asset('admin/vendor/flot/jquery.flot.pie.js')}}"></script>
<script src="{{asset('admin/vendor/flot/jquery.flot.categories.js')}}"></script>
<script src="{{asset('admin/vendor/flot/jquery.flot.resize.js')}}"></script>
<script src="{{asset('admin/vendor/jquery-sparkline/jquery.sparkline.js')}}"></script>
<script src="{{asset('admin/vendor/raphael/raphael.js')}}"></script>
<script src="{{asset('admin/vendor/morris/morris.js')}}"></script>
<script src="{{asset('admin/vendor/snap.svg/snap.svg.js')}}"></script>
<script src="{{asset('admin/vendor/liquid-meter/liquid.meter.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/jquery.vmap.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/data/jquery.vmap.sampledata.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/maps/jquery.vmap.world.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/maps/continents/jquery.vmap.africa.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/maps/continents/jquery.vmap.asia.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/maps/continents/jquery.vmap.australia.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/maps/continents/jquery.vmap.europe.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/maps/continents/jquery.vmap.north-america.js')}}"></script>
<script src="{{asset('admin/vendor/jqvmap/maps/continents/jquery.vmap.south-america.js')}}"></script>
<script src="vendor/nanoscroller/nanoscroller.js"></script>
<script src="vendor/magnific-popup/jquery.magnific-popup.js"></script>
<script src="vendor/jquery-placeholder/jquery.placeholder.js"></script>
<script src="vendor/raphael/raphael.js"></script>
<script src="vendor/morris/morris.js"></script>
<script src="vendor/datatables/media/js/jquery.dataTables.min.js"></script>
<script src="vendor/datatables/media/js/dataTables.bootstrap4.min.js"></script>
<script src="js/examples/examples.header.menu.js"></script>
<script src="js/examples/examples.ecommerce.dashboard.js"></script>
<script src="js/examples/examples.ecommerce.datatables.list.js"></script>

<script src="{{asset('admin/js/theme.js')}}"></script>

<script src="{{asset('admin/js/custom.js')}}"></script>

<script src="{{asset('admin/js/theme.init.js')}}"></script>

<script src="{{asset('admin/js/examples/examples.dashboard.js')}}"></script>

@endsection
