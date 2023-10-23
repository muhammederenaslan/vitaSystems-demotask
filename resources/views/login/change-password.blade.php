@extends('admin.layouts.default')

@section('page-css')
  <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">

  <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap/css/bootstrap.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/animate/animate.compat.css') }}">
  <link rel="stylesheet" href="{{ asset('admin/vendor/font-awesome/css/all.min.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/boxicons/css/boxicons.min.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/magnific-popup/magnific-popup.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/jquery-ui/jquery-ui.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/jquery-ui/jquery-ui.theme.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/select2/css/select2.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/select2-bootstrap-theme/select2-bootstrap.min.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap-multiselect/css/bootstrap-multiselect.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap-tagsinput/bootstrap-tagsinput.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap-colorpicker/css/bootstrap-colorpicker.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap-timepicker/css/bootstrap-timepicker.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/dropzone/basic.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/dropzone/dropzone.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap-markdown/css/bootstrap-markdown.min.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/summernote/summernote-bs4.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/codemirror/lib/codemirror.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/vendor/codemirror/theme/monokai.css') }}" />


  <link rel="stylesheet" href="{{ asset('admin/css/theme.css') }}" />


  <link rel="stylesheet" href="{{ asset('admin/css/custom.css') }}">

  <script src="{{ asset('admin/vendor/modernizr/modernizr.js') }}"></script>
@endsection

@section('content')
<header class="page-header">
    <h2>Change Password</h2>
    <div class="right-wrapper text-right">
        <ol class="breadcrumbs">
            <li>
            </li>
            <li><span>Change</span></li>
            <li><span>Password</span></li>
        </ol>
        <a class="sidebar-right-toggle" data-open="sidebar-right"><i class="fas fa-chevron-left"></i></a>
    </div>
</header>
<div class="row">
    <div class="col-lg-12">
        <section class="card">
            <header class="card-header">
                <div class="card-actions">
                    <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
                    <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
                </div>
                <h2 class="card-title">Change Password</h2>
            </header>
            <div class="card-body">
                <form class="form-horizontal form-bordered" action="{{ route('change.post-password') }}" method="post" enctype="multipart/form-data">
                    @csrf

                    <div class="form-group row">
                        <label class="col-lg-3 control-label text-lg-right pt-2" for="currentPassword">Current Password</label>
                        <div class="col-lg-6">
                            <input type="password" name="currentPassword" class="form-control" id="currentPassword" required>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-lg-3 control-label text-lg-right pt-2" for="newPassword">New Password</label>
                        <div class="col-lg-6">
                            <input type="password" name="newPassword" class="form-control" id="newPassword" required>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-6">
                            <input type="submit" class="mb-1 mt-1 mr-1 btn btn-default" value="Save">
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
</div>


@endsection

@section('page-js')
  <script src="{{ asset('admin/vendor/jquery/jquery.js') }}"></script>
  <script src="{{ asset('admin/vendor/jquery-browser-mobile/jquery.browser.mobile.js') }}"></script>
  <script src="{{ asset('admin/vendor/jquery-cookie/jquery.cookie.js') }}"></script>
  <script src="{{ asset('admin/master/style-switcher/style.switcher.js') }}"></script>
  <script src="{{ asset('admin/vendor/popper/umd/popper.min.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap/js/bootstrap.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
  <script src="{{ asset('admin/vendor/common/common.js') }}"></script>
  <script src="{{ asset('admin/vendor/nanoscroller/nanoscroller.js') }}"></script>
  <script src="{{ asset('admin/vendor/magnific-popup/jquery.magnific-popup.js') }}"></script>
  <script src="{{ asset('admin/vendor/jquery-placeholder/jquery.placeholder.js') }}"></script>
  <script src="{{ asset('admin/vendor/jquery-ui/jquery-ui.js') }}"></script>
  <script src="{{ asset('admin/vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js') }}"></script>
  <script src="{{ asset('admin/vendor/select2/js/select2.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-multiselect/js/bootstrap-multiselect.js') }}"></script>
  <script src="{{ asset('admin/vendor/jquery-maskedinput/jquery.maskedinput.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-tagsinput/bootstrap-tagsinput.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-colorpicker/js/bootstrap-colorpicker.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-timepicker/js/bootstrap-timepicker.js') }}"></script>
  <script src="{{ asset('admin/vendor/fuelux/js/spinner.js') }}"></script>
  <script src="{{ asset('admin/vendor/dropzone/dropzone.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-markdown/js/markdown.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-markdown/js/to-markdown.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-markdown/js/bootstrap-markdown.js') }}"></script>
  <script src="{{ asset('admin/vendor/codemirror/lib/codemirror.js') }}"></script>
  <script src="{{ asset('admin/vendor/codemirror/addon/selection/active-line.js') }}"></script>
  <script src="{{ asset('admin/vendor/codemirror/addon/edit/matchbrackets.js') }}"></script>
  <script src="{{ asset('admin/vendor/codemirror/mode/javascript/javascript.js') }}"></script>
  <script src="{{ asset('admin/vendor/codemirror/mode/xml/xml.js') }}"></script>
  <script src="{{ asset('admin/vendor/codemirror/mode/htmlmixed/htmlmixed.js') }}"></script>
  <script src="{{ asset('admin/vendor/codemirror/mode/css/css.js') }}"></script>
  <script src="{{ asset('admin/vendor/summernote/summernote-bs4.js') }}"></script>
  <script src="{{ asset('admin/vendor/bootstrap-maxlength/bootstrap-maxlength.js') }}"></script>
  <script src="{{ asset('admin/vendor/ios7-switch/ios7-switch.js') }}"></script>


  <script src="{{ asset('admin/js/theme.js') }}"></script>

  <script src="{{ asset('admin/js/custom.js') }}"></script>

  <script src="{{ asset('admin/js/theme.init.js') }}"></script>

  <script src="{{ asset('admin/js/examples/examples.advanced.form.js') }}"></script>
@endsection
